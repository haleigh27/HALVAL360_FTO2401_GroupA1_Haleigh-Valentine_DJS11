/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Episode from '../components/episodes/Episode';
import SortDropdown from '../components/dropdown/SortDropdown';
import sortShows from '../components/dropdown/sortShows';
import { convertDate } from '../utils/utils';

import classes from './Favourites.module.css';

export default function Favourites() {
  const favourites = useSelector((state) => state.favourites);
  const [favouritesFilter, setFavouritesFilter] = useState({
    showId: '',
    seasonNumber: '',
  });
  // Sort favourites by show title and recently updated
  const [sortShowOption, setSortShowOption] = useState('a-z');
  // Sort episodes within shows and seasons by recently added
  const [episodeSort, setEpisodeSort] = useState('mostRecent');

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

  // Set sort favourited shows by name and updated date
  const handleSortShowChange = (option) => {
    setSortShowOption(option);
  };

  // Set sort recently updated (episodes within a season)
  const handleSortChange = (event) => {
    setEpisodeSort(event.target.value);
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

  // Sort favourited shows by name and updated date
  const sortedFavourites = sortShows(filteredFavourites, sortShowOption);

  // Sort episodes within each season by timestamp added
  const sortedEpisodeFavourites = sortedFavourites.map((show) => ({
    ...show,
    seasons: show.seasons.map((season) => {
      // Sort season episodes by timestamp
      const sortedEpisodes = [...season.episodes].sort((a, b) => {
        const dateA = new Date(a.timestampFavourited);
        const dateB = new Date(b.timestampFavourited);
        if (episodeSort === 'mostRecent') {
          return dateB - dateA;
        }
        if (episodeSort === 'leastRecent') {
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
      {/* Dropdown: Sorting */}
      <div className={classes.filSort}>
        <div className={classes.sort}>
          {/* Dropdown: Sort by show title or date updated */}
          <SortDropdown onSortChange={handleSortShowChange} />
          {/* Dropdown: Sort by date added */}
          <div>
            <p className={classes.selectTitle}>Date Favourited:</p>
            <select
              value={episodeSort}
              onChange={handleSortChange}
              className={classes.select}
            >
              <option value="mostRecent">Most Recently Added</option>
              <option value="leastRecent">Least Recently Added</option>
            </select>
          </div>
        </div>
        {/* Dropdown Filters */}
        <div className={classes.filter}>
          {/* Dropdown: Filter by show */}
          <label>
            Filter by Show:
            <select
              value={favouritesFilter.showId}
              onChange={handleShowFilterChange}
              className={classes.select}
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
              className={classes.select}
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
      </div>
      {/* Display favourites */}
      {sortedEpisodeFavourites.map((show) => (
        <div key={show.id}>
          {/* Display show to user */}
          <h2>{show.title}</h2>
          {show.seasons.map((season) => (
            <div key={`S${show.id}S${season.season}`}>
              {/* Display show season to user */}
              <h3>{season.title}</h3>
              {/* Display favourited episodes to user */}
              {season.episodes.map((episode) => (
                <div key={`S${season.season}E${episode.episode}`}>
                  <Episode
                    episode={episode}
                    showId={show.id}
                    showTitle={show.title}
                    showDescription={show.description}
                    seasonNumber={season.season}
                    seasonTitle={season.title}
                    seasonImage={season.image}
                  />
                  {/* Display date and time user added item to favourites */}
                  <div className={classes.dateFav}>
                    <p>
                      <span>Date Favourited:</span>{' '}
                      {convertDate(episode.timestampFavourited)}
                    </p>
                    <p>
                      <span>{show.title}:</span>
                      {` ${season.title}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
