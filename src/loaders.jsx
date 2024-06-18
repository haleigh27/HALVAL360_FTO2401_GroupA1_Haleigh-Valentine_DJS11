import { json } from 'react-router-dom';

export default async function fetchAllShows() {
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
