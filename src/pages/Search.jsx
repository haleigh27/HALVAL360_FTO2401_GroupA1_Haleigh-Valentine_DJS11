import React from 'react';
import { Link } from 'react-router-dom';
import genres from '../utils/genreTypes';
import SearchByTitle from '../components/dropdown/SearchByTitle';

import classes from './Search.module.css';

export default function Search() {
  return (
    <>
      <div>
        <SearchByTitle />
      </div>
      <div>
        <h1>Genres</h1>
        <ul className={classes.genreList}>
          {genres.map((genre) => (
            <li key={genre.id}>
              <Link to={genre.id} className={classes.genreLink}>
                <h2>{genre.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
