import { configureStore } from '@reduxjs/toolkit';
import localStorageMiddleware from './localStorage/localStorageMiddleware';
import loadState from './localStorage/loadState';
import favouritesReducer from './favouritesSlice';

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
});

export default store;
