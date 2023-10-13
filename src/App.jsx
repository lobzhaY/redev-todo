import React, { useMemo, useState } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import WelcomePage from './routes/welcomePage/welcomeRoute';
import NotFoundRoute from './routes/notFoundRoute/notFoundRoute';
import RegistrationRoute from './routes/registration/registrationRoute';
import AuthorizationRoute from './routes/authorization/authorizationRoute';
import TodoRoute from './routes/todo/todoRoute';
import RootRoute from './routes/rootRoute/rootRoute';
import PrivateRoute from './routes/privateRoute/privateRoute';

import AuthContext from './context/authContext';

import './App.css';

function App() {
  const [auth, setAuth] = useState(localStorage.getItem('token'));

  const providerAuth = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <div className="app">
      <AuthContext.Provider value={providerAuth}>
        <Routes>
          <Route path="/" element={<RootRoute />}>
            <Route index element={<WelcomePage />} />
            <Route path="/404" element={<NotFoundRoute />} />
            <Route path="/reg" element={<RegistrationRoute />} />
            <Route path="/auth" element={<AuthorizationRoute />} />
            <Route
              path="/todo"
              element={
                <PrivateRoute>
                  <TodoRoute />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
