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
        if (existingSeason) {
          existingSeason.episodes.push({
            ...episode,
            timestampFavourited: new Date().toISOString(),
          });
        } else {
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
    removeFavorite: (state, action) => {
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
        if (show.seasons.length === 0) {
          return state.filter((show) => show.id !== showId);
        }
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
