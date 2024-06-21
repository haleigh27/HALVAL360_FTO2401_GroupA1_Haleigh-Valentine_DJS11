import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import Search from './pages/Search';
import RootLayout from './pages/Layout/RootLayout';
import Genre from './pages/Genre';
import Favourites from './pages/Favourites';
import Show from './pages/Show/Show';
import Season from './pages/Show/Season';
import ErrorPage from './pages/ErrorPage';
import { fetchAllShows, showLoader, genreLoader } from './utils/loaders';
import store from './store/store';
import AudioPlayer from './components/audioPlayer/AudioPlayer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'all-shows',
    loader: fetchAllShows,
    children: [
      {
        index: true,
        element: <Home />,
      }, // path: ""
      { path: 'search', element: <Search /> },
      {
        path: 'show/:showId',
        id: 'selected-show',
        loader: showLoader,
        children: [
          { path: '', element: <Show /> },
          { path: ':seasonId', element: <Season /> },
        ],
      },
      { path: 'search/:genreId', element: <Genre />, loader: genreLoader },
      { path: 'library', element: <Favourites /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <RouterProvider router={router} />
        <AudioPlayer />
      </div>
    </Provider>
  );
}

export default App;
