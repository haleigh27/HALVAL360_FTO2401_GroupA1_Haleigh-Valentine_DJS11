import { json } from 'react-router-dom';

export async function fetchAllShows() {
  const response = await fetch('https://podcast-api.netlify.app');
  if (!response.ok) {
    throw json(
      {
        message: 'Could not fetch show previews.',
      },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

// React Router passes an object to the loader function when executing it for you.
// A request property which contains a request object.
// A params property which contains an object with all of your route parameters.
export async function showLoader({ request, params }) {
  // Get param
  const id = params.showId;

  // Use param to make a dynamic fetch path
  const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
  if (!response.ok) {
    throw json(
      {
        message: 'Could not fetch page for selected show.',
      },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}
