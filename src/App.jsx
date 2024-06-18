import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import RootLayout from './pages/Layout/RootLayout';
import Genre from './pages/Genre';
import Library from './pages/Library';
import Show from './pages/Show';
import fetchAllShows from './loaders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'all-shows',
    loader: fetchAllShows,
    children: [
      {
        index: true,
        element: <Home />,
      }, // path: ""
      { path: 'show/:showId', element: <Show /> },
      { path: 'search', element: <Search /> },
      { path: 'search/:genreId', element: <Genre /> },
      {
        path: 'search/:genreId/show/:showId',
        element: <Show />,
      },
      { path: 'library', element: <Library /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
