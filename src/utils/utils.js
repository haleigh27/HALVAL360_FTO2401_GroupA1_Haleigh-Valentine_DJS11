import genres from './genreTypes';

export function getGenresByIds(ids) {
  const genreTitles = ids
    .map((id) => genres.find((genre) => genre.id === id))
    .filter((genre) => genre !== undefined)
    .map((genre) => genre.title);
  return genreTitles;
}

// Date formatter
export function convertDate(isoDate) {
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };

  return date.toLocaleDateString('en-ZA', options);
}

// Get random suggestions using Fisher-Yates shuffle algorithm
export function getRandomItems(arr, numItems) {
  const shuffledArray = arr.slice();

  // Shuffle the array using Fisher-Yates shuffle algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, numItems);
}
