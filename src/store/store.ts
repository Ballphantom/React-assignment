import { configureStore } from '@reduxjs/toolkit';
import formSlice from './slices/formSlice';
import localStorageMiddleware from './localStorageMiddleware';
import { loadState } from './localStorage';

const persistedState = loadState() || {};

const store = configureStore({
  reducer: {
    form: formSlice,
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
