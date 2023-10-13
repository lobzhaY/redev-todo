import React, { Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import useLocalStorage from '../../hooks/useLocalStorage';

function PrivateRoute({ children }) {
  const { getItem } = useLocalStorage('token');
  const isAuth = getItem();
  return isAuth ? children : <Navigate to="/auth" replace />;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
