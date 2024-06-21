/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateProgress,
  markAsListened,
  pauseEpisode,
  resetListeningHistory,
} from '../../store/playbackSlice';

import classes from './AudioPlayer.module.css';

export default function AudioPlayer() {
  const dispatch = useDispatch(); // Redux hook for dispatching actions
  const audioRef = useRef(null); // Reference to the <audio> element
  const { currentEpisode, isPlaying, inProgress } = useSelector(
    (state) => state.playback // Redux hook to access state from playbackSlice
  );

  // Effect to handle changes in currentEpisode and isPlaying
  useEffect(() => {
    if (audioRef.current) {
      // Retrieve progress from Redux state and set current time of audio element
      const progress =
        inProgress[currentEpisode.showId]?.[currentEpisode.seasonNumber]?.[
          currentEpisode.episode
        ];
      if (progress) {
        audioRef.current.currentTime = progress;
      } else {
        audioRef.current.currentTime = 0;
      }

      // Play or pause audio based on isPlaying state
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Failed to play audio:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEpisode, isPlaying]);

  // Handler for updating progress in Redux state on time update of audio
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

  // Handler for marking episode as listened when it ends
  const handleEnded = () => {
    dispatch(
      markAsListened({
        showId: currentEpisode.showId,
        seasonNumber: currentEpisode.seasonNumber,
        episodeNumber: currentEpisode.episode,
      })
    );
    dispatch(pauseEpisode()); // Pause playback after marking as listened
  };

  // Handler for resetting listening history and stopping audio playback
  const handleReset = () => {
    dispatch(resetListeningHistory());
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Rendering the AudioPlayer component
  return (
    <div className={classes.audioPlayer}>
      <div className={classes.infoSection}>
        <img src={currentEpisode.seasonImage} alt="Season" />
        <div>
          <h3>{currentEpisode.showTitle}</h3>
          <p>{currentEpisode.title}</p>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={currentEpisode.file}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        controls // Render native controls for the audio element
      />
      <button type="button" onClick={handleReset}>
        Reset Listening History
      </button>
    </div>
  );
}
