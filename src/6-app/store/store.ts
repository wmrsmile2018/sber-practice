import { configureStore } from '@reduxjs/toolkit';
import { baseApiRedux } from 'shared/api';

export const store = configureStore({
  reducer: {
    [baseApiRedux.reducerPath]: baseApiRedux.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiRedux.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
