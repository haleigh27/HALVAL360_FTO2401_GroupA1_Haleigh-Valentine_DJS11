/* eslint-disable react/prop-types */

// Creates an individual preview for podcast show.
import React from 'react';
import { Link } from 'react-router-dom';

import classes from './PreviewItem.module.css';

export default function PreviewItem({ previewData }) {
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
          <p>{`Genre: ${previewData.genres}`}</p>
          <p>{`Last updated: ${previewData.updated}`}</p>
        </div>
      </Link>
    </li>
  );
}
