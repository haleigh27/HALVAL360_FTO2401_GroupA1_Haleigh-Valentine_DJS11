import React from 'react';
import { useLoaderData } from 'react-router-dom';

import PodcastDetails from '../components/podcastDetails/PodcastDetails';
import Seasons from '../components/seasons/Seasons';

import classes from './Show.module.css';

export default function Show() {
  const data = useLoaderData();
  return (
    <div className={classes.container}>
      <PodcastDetails data={data} />
      <Seasons showData={data} />
    </div>
  );
}
