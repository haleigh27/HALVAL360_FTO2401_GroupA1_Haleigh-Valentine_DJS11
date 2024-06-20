import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';

import PodcastDetails from '../../components/podcastDetails/PodcastDetails';
import Seasons from '../../components/seasons/Seasons';

import classes from './Show.module.css';

export default function Show() {
  const data = useRouteLoaderData('selected-show');
  return (
    <div className={classes.container}>
      <PodcastDetails data={data} />
      <Seasons showData={data} />
    </div>
  );
}
