import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Episode from '../components/episodes/Episode';

export default function Favourites() {
  const favourites = useSelector((state) => state.favourites);
  const [favouritesFilter, setFavouritesFilter] = useState({
    showId: '',
    seasonNumber: '',
  });
  const [sort, setSort] = useState('mostRecent');

  // Set new show filter
  const handleShowFilterChange = (event) => {
    setFavouritesFilter({
      ...favouritesFilter,
      showId: event.target.value,
      seasonNumber: '',
    });
  };

  // Set new season
  const handleSeasonFilterChange = (event) => {
    setFavouritesFilter({
      ...favouritesFilter,
      seasonNumber: event.target.value,
    });
  };

  // Set sort recently updated
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  // Filter favourites array based on filter selections.
  const filteredFavourites = favourites.filter((favouritedShow) => {
    // Skip show if not the same as the favourites filter.
    if (
      favouritesFilter.showId &&
      favouritedShow.id !== favouritesFilter.showId
    )
      return false;
    // If season is selected, only include season data if season matches selected favourites.filter season.
    if (favouritesFilter.seasonNumber) {
      return favouritedShow.seasons.some(
        (season) => season.season.toString() === favouritesFilter.seasonNumber
      );
    }
    // Return all favourites data if no filters selected.
    return true;
  });

  // Sort episodes within each season by timestamp added
  const sortedFavourites = filteredFavourites.map((show) => ({
    ...show,
    seasons: show.seasons.map((season) => {
      // Sort season episodes by timestamp
      const sortedEpisodes = [...season.episodes].sort((a, b) => {
        const dateA = new Date(a.timestampFavourited);
        const dateB = new Date(b.timestampFavourited);
        if (sort === 'mostRecent') {
          return dateB - dateA;
        }
        if (sort === 'leastRecent') {
          return dateA - dateB;
        }
        return 0;
      });
      // Add episodes in sorted order
      return {
        ...season,
        episodes: sortedEpisodes,
      };
    }),
  }));

  return (
    <div>
      <h1>Favourites</h1>
      {/* Dropdown Filters */}
      <div>
        {/* Dropdown: Filter by show */}
        <label>
          Filter by Show:
          <select
            value={favouritesFilter.showId}
            onChange={handleShowFilterChange}
          >
            <option value="">All Shows</option>
            {favourites.map((show) => (
              <option key={show.id} value={show.id}>
                {show.title}
              </option>
            ))}
          </select>
        </label>
        {/* Dropdown: Filter by show season */}
        <label>
          Filter by Season:
          <select
            value={favouritesFilter.seasonNumber}
            onChange={handleSeasonFilterChange}
            disabled={!favouritesFilter.showId}
          >
            <option value="">All Seasons</option>
            {favourites
              .filter((show) => show.id === favouritesFilter.showId)
              .flatMap((show) =>
                show.seasons.map((season) => (
                  <option key={season.season} value={season.season}>
                    {season.title}
                  </option>
                ))
              )}
          </select>
        </label>
      </div>
      {/* Dropdown: Sorting */}
      <div>
        {/* Dropdown: Sort by date added */}
        <label>
          Sort by:
          <select value={sort} onChange={handleSortChange}>
            <option value="mostRecent">Most Recently Added</option>
            <option value="leastRecent">Least Recently Added</option>
          </select>
        </label>
      </div>
      {/* Display favourites */}
      {sortedFavourites.map((show) => (
        <div key={show.id}>
          {/* Display show to user */}
          <h2>{show.title}</h2>
          {show.seasons.map((season) => (
            <div key={season.season}>
              {/* Display show season to user */}
              <h3>{season.title}</h3>
              {/* Display favourited episodes to user */}
              {season.episodes.map((episode) => (
                <div>
                  <Episode
                    key={episode.episode}
                    episode={episode}
                    showId={show.id}
                    showTitle={show.title}
                    showDescription={show.description}
                    seasonNumber={season.season}
                    seasonTitle={season.title}
                    seasonImage={season.image}
                  />
                  {/* Display date and time user added item to favourites */}
                  <p>{`Date Favourited: ${episode.timestampFavourited}`}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
