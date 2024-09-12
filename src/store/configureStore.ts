import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';
import localStorageMiddleware from './localStorageMiddleware';

const store = configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;