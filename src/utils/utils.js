import genres from './genreTypes';

export default function getGenresByIds(ids) {
  const genreTitles = ids
    .map((id) => genres.find((genre) => genre.id === id))
    .filter((genre) => genre !== undefined)
    .map((genre) => genre.title);
  return genreTitles;
}
