import { createSlice } from '@reduxjs/toolkit';

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: [],
  reducers: {
    addFavourite: (state, action) => {
      const {
        showId,
        showTitle,
        showDescription,
        seasonNumber,
        seasonTitle,
        seasonImage,
        episode,
      } = action.payload;

      const existingShow = state.find((show) => show.id === showId);

      if (existingShow) {
        const existingSeason = existingShow.seasons.find(
          (season) => season.season === seasonNumber
        );
        // Show and season exist in favourites: push to episodes
        if (existingSeason) {
          existingSeason.episodes.push({
            ...episode,
            timestampFavourited: new Date().toISOString(),
          });
        } else {
          // Show exists but not season: push to seasons
          existingShow.seasons.push({
            season: seasonNumber,
            title: seasonTitle,
            image: seasonImage,
            episodes: [
              { ...episode, timestampFavourited: new Date().toISOString() },
            ],
          });
        }
      } else {
        // Show does not yet exist in favourites
        state.push({
          id: showId,
          title: showTitle,
          description: showDescription,
          seasons: [
            {
              season: seasonNumber,
              title: seasonTitle,
              image: seasonImage,
              episodes: [
                { ...episode, timestampFavourited: new Date().toISOString() },
              ],
            },
          ],
        });
      }
    },
    removeFavourite: (state, action) => {
      const { showId, seasonNumber, episode } = action.payload;
      const show = state.find((show) => show.id === showId);
      if (show) {
        const season = show.seasons.find(
          (season) => season.season === seasonNumber
        );
        if (season) {
          season.episodes = season.episodes.filter(
            (ep) => ep.episode !== episode.episode
          );
          if (season.episodes.length === 0) {
            show.seasons = show.seasons.filter(
              (season) => season.season !== seasonNumber
            );
          }
        }
        // Remove shoe if no seasons exist in favourites
        if (show.seasons.length === 0) {
          const index = state.indexOf(show);
          state.splice(index, 1);
        }
      }
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
