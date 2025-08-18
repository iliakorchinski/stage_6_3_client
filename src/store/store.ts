import { configureStore } from '@reduxjs/toolkit';
import { boardsApi } from './boards.api';
import { listsApi } from './lists.api';
import { tasksApi } from './tasks.api';

export const store = configureStore({
  reducer: {
    [boardsApi.reducerPath]: boardsApi.reducer,
    [listsApi.reducerPath]: listsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      boardsApi.middleware,
      listsApi.middleware,
      tasksApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
