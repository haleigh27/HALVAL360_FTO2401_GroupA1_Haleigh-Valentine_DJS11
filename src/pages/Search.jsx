import React from 'react';
import { Link } from 'react-router-dom';
import genres from '../genreTypes';

import classes from './Search.module.css';

export default function Search() {
  return (
    <>
      <div>
        <input type="text" />
        <div>icon</div>
      </div>
      <div>
        <h1>Genres</h1>
        <ul className={classes.genreList}>
          {genres.map((genre) => (
            <li key={genre.id}>
              <Link to={genre.id} className={classes.genreLink}>
                <h2>{genre.title}</h2>
                {console.log(genre)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
