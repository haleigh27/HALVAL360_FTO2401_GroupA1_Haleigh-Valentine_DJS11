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
