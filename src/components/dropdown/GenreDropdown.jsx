/* eslint-disable react/prop-types */
import React from 'react';
import genres from '../../genreTypes';

export default function GenreDropdown({ selectedGenre, onGenreChange }) {
  return (
    <div>
      <select value={selectedGenre} onChange={onGenreChange}>
        <option value="All">All</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.title}
          </option>
        ))}
      </select>
    </div>
  );
}
