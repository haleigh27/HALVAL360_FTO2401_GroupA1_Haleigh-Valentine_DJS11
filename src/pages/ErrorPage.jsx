import React from 'react';
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/navigation/MainNavigation';

export default function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  // we set status to 500 for incorrect path
  if (error.status === 500) {
    message = error.data.message;
  }

  // 404 is default for page not found
  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <MainNavigation />
      <main>
        <h1>{title}</h1>
        <p>{message}</p>
      </main>
    </>
  );
}
