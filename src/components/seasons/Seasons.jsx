/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Episode from '../episodes/Episode';
import classes from './Seasons.module.css';

export default function Seasons({ seasonData }) {
  const [selectedSeason, setSelectedSeason] = useState(seasonData[0].season);

  const handleSeasonChange = (event) => {
    setSelectedSeason(Number(event.target.value));
  };

  const selectedSeasonData = seasonData.find(
    (season) => season.season === selectedSeason
  );

  return (
    <div>
      <div className={classes.selectionBar}>
        <h3>{`Episodes: ${selectedSeasonData.episodes.length}`}</h3>
        <select id="season-select" onChange={handleSeasonChange}>
          {seasonData.map((season) => (
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
              key={`S${selectedSeason}E${episode.episode}`}
              episode={episode}
              image={selectedSeasonData.image}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
