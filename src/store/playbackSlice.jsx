import { createSlice } from '@reduxjs/toolkit';

const playbackSlice = createSlice({
  name: 'playback',
  initialState: {
    inProgress: {},
    listened: [],
  },
  reducers: {
    updateProgress: (state, action) => {
      const { showId, seasonNumber, episodeNumber, timestamp } = action.payload;
      if (!state.inProgress[showId]) {
        state.inProgress[showId] = {};
      }
      if (!state.inProgress[showId][seasonNumber]) {
        state.inProgress[showId][seasonNumber] = {};
      }
      state.inProgress[showId][seasonNumber][episodeNumber] = timestamp;
    },
    markAsListened: (state, action) => {
      const { showId, seasonNumber, episodeNumber } = action.payload;
      if (
        !state.listened.some(
          (ep) =>
            ep.showId === showId &&
            ep.seasonNumber === seasonNumber &&
            ep.episodeNumber === episodeNumber
        )
      ) {
        state.listened.push({ showId, seasonNumber, episodeNumber });
      }
    },
  },
});

export const { updateProgress, markAsListened } = playbackSlice.actions;
export default playbackSlice.reducer;
