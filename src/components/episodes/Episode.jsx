/* eslint-disable react/prop-types */
import React from 'react';

import classes from './Episode.module.css';

export default function Episode({ episode, image }) {
  return (
    <li className={classes.episode}>
      <img src={image} alt="Episode" />
      <div className={classes.episodeDetails}>
        <h3>{episode.title}</h3>
        <p>{episode.description}</p>
        <audio controls>
          <source src={episode.file} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </li>
  );
}
