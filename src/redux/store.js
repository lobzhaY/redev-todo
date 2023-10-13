import { configureStore } from '@reduxjs/toolkit';

import { tasksApi } from './tasksApi';

const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
});

export default store;
