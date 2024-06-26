/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

import classes from './MiniPreviewCarousel.module.css';

// Carousel for Recommendations
export default function MiniPreviewCarousel({ data }) {
  return (
    <div className={classes.container}>
      <h3 className={classes.recTitle}>Recommended for you!</h3>
      <div className={`${classes.preview} ${classes.sliderContainer}`}>
        {data.map((show) => (
          <Link key={show.id} to={`/show/${show.id}`}>
            <div className={classes.slide}>
              <img src={show.image} alt={`${show.title} cover`} />
              <p>{show.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
