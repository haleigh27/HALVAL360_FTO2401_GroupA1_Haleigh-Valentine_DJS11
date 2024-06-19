/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, removeFavourite } from '../../store/favouritesSlice';

import classes from './Episode.module.css';

export default function Episode({
  episode,
  showId,
  showTitle,
  showDescription,
  seasonNumber,
  seasonTitle,
  seasonImage,
}) {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites);

  const isEpisodeFavourited = () => {
    // Check if show in favourites
    const showIndex = favourites.findIndex((fav) => fav.id === showId);
    if (showIndex === -1) return false;

    // Check if show > season in favourites
    const seasonIndex = favourites[showIndex].seasons.findIndex(
      (season) => season.season === seasonNumber
    );
    if (seasonIndex === -1) return false;

    // Check if show > season > episode in favourites
    return favourites[showIndex].seasons[seasonIndex].episodes.some(
      (ep) => ep.episode === episode.episode
    );
  };

  const handleFavourite = () => {
    // payload state for favouritesSlice in store
    const payload = {
      showId,
      showTitle,
      showDescription,
      seasonNumber,
      seasonTitle,
      seasonImage,
      episode,
    };

    if (isEpisodeFavourited()) {
      dispatch(removeFavourite(payload));
    } else {
      dispatch(addFavourite(payload));
    }
  };

  return (
    <li className={classes.episode}>
      <img src={seasonImage} alt="Episode" />
      <div className={classes.episodeDetails}>
        <h3>{episode.title}</h3>
        <p>{episode.description}</p>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio controls>
          <source src={episode.file} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <button onClick={handleFavourite} type="button">
          {isEpisodeFavourited()
            ? 'Remove from Favourites'
            : 'Add to Favourites'}
        </button>
      </div>
    </li>
  );
}
