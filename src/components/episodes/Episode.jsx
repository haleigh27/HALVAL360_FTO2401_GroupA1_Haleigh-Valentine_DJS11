/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, removeFavourite } from '../../store/favouritesSlice';
import {
  updateProgress,
  playEpisode,
  pauseEpisode,
} from '../../store/playbackSlice';

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
  const { currentEpisode, isPlaying, inProgress, listened } = useSelector(
    (state) => state.playback
  );

  const isEpisodeFavourited = () => {
    const showIndex = favourites.findIndex((fav) => fav.id === showId);
    if (showIndex === -1) return false;

    const seasonIndex = favourites[showIndex].seasons.findIndex(
      (season) => season.season === seasonNumber
    );
    if (seasonIndex === -1) return false;

    return favourites[showIndex].seasons[seasonIndex].episodes.some(
      (ep) => ep.episode === episode.episode
    );
  };

  const handleFavourite = () => {
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

  const handlePlayEpisode = () => {
    // Pause if episode matches episode currently playing
    if (
      isPlaying &&
      currentEpisode.showId === showId &&
      currentEpisode.seasonNumber === seasonNumber &&
      currentEpisode.episode === episode.episode
    ) {
      dispatch(pauseEpisode());
    } else {
      // If different episode currently playing, first update currently playing episode's progress
      if (isPlaying) {
        dispatch(
          updateProgress({
            showId: currentEpisode.showId,
            seasonNumber: currentEpisode.seasonNumber,
            episodeNumber: currentEpisode.episode,
            timestamp: currentEpisode.currentTime,
          })
        );
      }
      // Play new episode
      dispatch(
        playEpisode({
          showId,
          seasonNumber,
          episode: episode.episode,
          title: episode.title,
          description: episode.description,
          file: episode.file,
          currentTime:
            inProgress[showId]?.[seasonNumber]?.[episode.episode] || 0,
        })
      );
    }
  };

  return (
    <li className={classes.episode}>
      <img src={seasonImage} alt="Episode" />
      <div className={classes.episodeDetails}>
        <h3>{episode.title}</h3>
        <p>{episode.description}</p>
        <button onClick={handlePlayEpisode} type="button">
          {isPlaying &&
          currentEpisode.showId === showId &&
          currentEpisode.seasonNumber === seasonNumber &&
          currentEpisode.episode === episode.episode
            ? 'Pause'
            : 'Play'}
        </button>
        <button onClick={handleFavourite} type="button">
          {isEpisodeFavourited()
            ? 'Remove from Favourites'
            : 'Add to Favourites'}
        </button>
        {listened.some(
          (ep) =>
            ep.showId === showId &&
            ep.seasonNumber === seasonNumber &&
            ep.episodeNumber === episode.episode
        ) ? (
          <span className={classes.listened}>✓ Listened</span>
        ) : (
          inProgress[showId]?.[seasonNumber]?.[episode.episode] && (
            <span className={classes.inProgress}>
              In Progress:{' '}
              {Math.floor(inProgress[showId][seasonNumber][episode.episode])}s
            </span>
          )
        )}
      </div>
    </li>
  );
}
