/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import genres from '../../utils/genreTypes';
import classes from './Dropdown.module.css';

export default function GenreDropdown({ selectedGenre, onGenreChange }) {
  return (
    <div>
      <p className={classes.selectTitle}>Filter by Genre:</p>
      <select
        value={selectedGenre}
        onChange={onGenreChange}
        className={classes.select}
      >
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
