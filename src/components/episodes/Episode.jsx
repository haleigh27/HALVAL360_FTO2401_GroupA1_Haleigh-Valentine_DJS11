/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlay,
  faCirclePause,
  faHeart,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
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
  const [isExpanded, setIsExpanded] = useState(false);

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
          showTitle,
          seasonNumber,
          seasonImage,
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

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className={classes.episode}>
      <img src={seasonImage} alt="Episode" />
      <div className={classes.episodeDetails}>
        <h3>{episode.title}</h3>
        <p className={isExpanded ? classes.fullText : classes.truncated}>
          {episode.description}
        </p>
        {episode.description && episode.description.length > 200 && (
          <button
            onClick={toggleText}
            type="button"
            className={classes.seeMore}
          >
            {isExpanded ? 'See Less' : 'See More'}
          </button>
        )}
        <div className={classes.col}>
          <div className={classes.interactionsContainer}>
            <button
              onClick={handlePlayEpisode}
              type="button"
              className={classes.interactionsBtn}
            >
              {isPlaying &&
              currentEpisode.showId === showId &&
              currentEpisode.seasonNumber === seasonNumber &&
              currentEpisode.episode === episode.episode ? (
                <FontAwesomeIcon
                  icon={faCirclePause}
                  size="2xl"
                  className={classes.audioControl}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCirclePlay}
                  size="2xl"
                  className={classes.audioControl}
                />
              )}
            </button>
            <button
              onClick={handleFavourite}
              type="button"
              className={classes.interactionsBtn}
            >
              {isEpisodeFavourited() ? (
                <FontAwesomeIcon icon={faHeart} size="2xl" />
              ) : (
                <FontAwesomeIcon icon={faHeartRegular} size="2xl" />
              )}
            </button>
          </div>
          <div>
            {listened.some(
              (ep) =>
                ep.showId === showId &&
                ep.seasonNumber === seasonNumber &&
                ep.episodeNumber === episode.episode
            ) ? (
              <FontAwesomeIcon
                icon={faCircleCheck}
                size="2xl"
                className={classes.completed}
              />
            ) : (
              inProgress[showId]?.[seasonNumber]?.[episode.episode] && (
                <span className={classes.inProgress}>
                  In Progress:{' '}
                  {Math.floor(
                    inProgress[showId][seasonNumber][episode.episode]
                  )}
                  s
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
