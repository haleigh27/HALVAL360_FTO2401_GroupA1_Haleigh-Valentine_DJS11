import React from 'react';
import { useRouteLoaderData, useParams } from 'react-router-dom';
import Episode from '../../components/episodes/Episode';
import classes from './Season.module.css';

export default function Season() {
  const data = useRouteLoaderData('selected-show');
  const { seasonId } = useParams();

  const selectedSeason = data.seasons.find(
    (season) => season.season.toString() === seasonId
  );

  // Display individual season
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1>{data.title}</h1>
        <div>
          <h2>{selectedSeason.title}</h2>
          <h4>{`Episodes: ${selectedSeason.episodes.length}`}</h4>
        </div>
      </header>
      <div className={classes.seasonEpisodes}>
        <ul className={classes.list}>
          {selectedSeason.episodes.map((episode) => (
            <Episode
              key={`S${selectedSeason.season}E${episode.episode}`}
              episode={episode}
              showId={data.id}
              showTitle={data.title}
              showDescription={data.description}
              seasonNumber={selectedSeason.season}
              seasonTitle={selectedSeason.title}
              seasonImage={selectedSeason.image}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
