import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import Search from './pages/Search';
import RootLayout from './pages/Layout/RootLayout';
import Genre from './pages/Genre';
import Favourites from './pages/Favourites';
import Show from './pages/Show';
import ErrorPage from './pages/ErrorPage';
import { fetchAllShows, showLoader, genreLoader } from './loaders';
import store from './store/store';

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
      { path: 'show/:showId', element: <Show />, loader: showLoader },
      { path: 'search', element: <Search /> },
      { path: 'search/:genreId', element: <Genre />, loader: genreLoader },
      { path: 'search/show/:showId', element: <Show />, loader: showLoader },
      {
        path: 'search/:genreId/show/:showId',
        element: <Show />,
        loader: showLoader,
      },
      { path: 'library', element: <Favourites /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
