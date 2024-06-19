/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Episode from '../episodes/Episode';
import classes from './Seasons.module.css';

export default function Seasons({ showData }) {
  const [selectedSeason, setSelectedSeason] = useState(
    showData.seasons[0].season
  );

  const handleSeasonChange = (event) => {
    setSelectedSeason(Number(event.target.value));
  };

  const selectedSeasonData = showData.seasons.find(
    (season) => season.season === selectedSeason
  );

  return (
    <div>
      <div className={classes.selectionBar}>
        <h3>{`Episodes: ${selectedSeasonData.episodes.length}`}</h3>
        <select id="season-select" onChange={handleSeasonChange}>
          {showData.seasons.map((season) => (
            <option key={season.season} value={season.season}>
              {season.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <ul className={classes.list}>
          {selectedSeasonData.episodes.map((episode) => (
            <Episode
              key={`S${selectedSeasonData.season}E${episode.episode}`}
              episode={episode}
              showId={showData.id}
              showTitle={showData.title}
              showDescription={showData.description}
              seasonNumber={selectedSeasonData.season}
              seasonTitle={selectedSeasonData.title}
              seasonImage={selectedSeasonData.image}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
