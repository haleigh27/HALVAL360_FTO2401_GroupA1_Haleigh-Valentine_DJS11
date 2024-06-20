/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, removeFavourite } from '../../store/favouritesSlice';
import { updateProgress, markAsListened } from '../../store/playbackSlice';

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
  const playbackState = useSelector((state) => state.playback);
  const audioRef = useRef(null);

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

  const isEpisodeCompleted = () => {
    return playbackState.listened.some(
      (ep) =>
        ep.showId === showId &&
        ep.seasonNumber === seasonNumber &&
        ep.episodeNumber === episode.episode
    );
  };

  const getEpisodeProgress = () => {
    return (
      playbackState.inProgress[showId]?.[seasonNumber]?.[episode.episode] || 0
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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(
        updateProgress({
          showId,
          seasonNumber,
          episodeNumber: episode.episode,
          timestamp: audioRef.current.currentTime,
        })
      );
    }
  };

  const handleEnded = () => {
    dispatch(
      markAsListened({
        showId,
        seasonNumber,
        episodeNumber: episode.episode,
      })
    );
  };

  useEffect(() => {
    if (audioRef.current) {
      const progress = getEpisodeProgress();
      if (progress) {
        audioRef.current.currentTime = progress;
      }
    }
  }, [showId, seasonNumber, episode.episode, playbackState]);

  return (
    <li className={classes.episode}>
      <img src={seasonImage} alt="Episode" />
      <div className={classes.episodeDetails}>
        <h3>{episode.title}</h3>
        <p>{episode.description}</p>
        <div className={classes.playbackInfo}>
          {isEpisodeCompleted() ? (
            <span className={classes.completed}>✔️ Completed</span>
          ) : (
            <span className={classes.inProgress}>
              {getEpisodeProgress() > 0
                ? `Progress: ${Math.floor(getEpisodeProgress())}s`
                : 'Not Started'}
            </span>
          )}
        </div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio
          ref={audioRef}
          controls
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        >
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
