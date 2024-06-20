/* eslint-disable react/prop-types */
// Creates an individual preview for podcast show.
import React from 'react';
import { Link } from 'react-router-dom';
import { getGenresByIds, convertDate } from '../../utils/utils';

import classes from './PreviewItem.module.css';

export default function PreviewItem({ previewData }) {
  // Get genre Titles
  const genreIds = previewData.genres.map((id) => id.toString());
  const genreTitles = getGenresByIds(genreIds);

  // Preview display
  return (
    <li className={classes.item}>
      <Link to={`show/${previewData.id}`}>
        <div className={classes.imageContainer}>
          <img src={previewData.image} alt="Show preview" />
        </div>
        <div className={classes.details}>
          <h2>{previewData.title}</h2>
          <p className={classes.description}>{previewData.description}</p>
          <p>{`Seasons: ${previewData.seasons}`}</p>
          <p>
            Genre:{' '}
            <span className={classes.genre}>{genreTitles.join(', ')}</span>
          </p>
          <p>Last updated: {convertDate(previewData.updated)}</p>
        </div>
      </Link>
    </li>
  );
}
