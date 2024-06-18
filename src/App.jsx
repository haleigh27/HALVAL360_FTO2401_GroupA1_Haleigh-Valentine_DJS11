import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import RootLayout from './pages/Layout/RootLayout';
import Genre from './pages/Genre';
import Library from './pages/Library';
import Show from './pages/Show';
import ErrorPage from './pages/ErrorPage';
import { fetchAllShows, showLoader, genreLoader } from './loaders';

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
      {
        path: 'search/:genreId/show/:showId',
        element: <Show />,
        loader: showLoader,
      },
      { path: 'library', element: <Library /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
