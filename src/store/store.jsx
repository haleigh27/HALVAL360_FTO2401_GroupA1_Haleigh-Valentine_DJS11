import { configureStore } from '@reduxjs/toolkit';
import localStorageMiddleware from './localStorage/localStorageMiddleware';
import loadState from './localStorage/loadState';
import favouritesReducer from './favouritesSlice';
import playbackReducer from './playbackSlice';

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    playback: playbackReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
});

export default store;
