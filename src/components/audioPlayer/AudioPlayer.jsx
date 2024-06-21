/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateProgress,
  markAsListened,
  pauseEpisode,
} from '../../store/playbackSlice';

import classes from './AudioPlayer.module.css';

export default function AudioPlayer() {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const { currentEpisode, isPlaying, inProgress } = useSelector(
    (state) => state.playback
  );

  useEffect(() => {
    if (audioRef.current) {
      const progress =
        inProgress[currentEpisode.showId]?.[currentEpisode.seasonNumber]?.[
          currentEpisode.episode
        ];
      if (progress) {
        audioRef.current.currentTime = progress;
      }

      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentEpisode, isPlaying, inProgress]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(
        updateProgress({
          showId: currentEpisode.showId,
          seasonNumber: currentEpisode.seasonNumber,
          episodeNumber: currentEpisode.episode,
          timestamp: audioRef.current.currentTime,
        })
      );
    }
  };

  const handleEnded = () => {
    dispatch(
      markAsListened({
        showId: currentEpisode.showId,
        seasonNumber: currentEpisode.seasonNumber,
        episodeNumber: currentEpisode.episode,
      })
    );
    dispatch(pauseEpisode());
  };

  return (
    <div className={classes.audioPlayer}>
      <audio
        ref={audioRef}
        src={currentEpisode.file}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        controls
      />
    </div>
  );
}
