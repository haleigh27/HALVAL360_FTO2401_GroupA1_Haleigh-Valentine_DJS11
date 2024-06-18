/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import TabButton from '../navigation/TabButton';

import classes from './PodcastDetails.module.css';

export default function PodcastDetails({ data }) {
  const [selectedTab, setSelectedTab] = useState();

  function handleSelect(selectedButton) {
    setSelectedTab(selectedButton);
  }

  let tabContent;

  if (!selectedTab || selectedTab === 'about') {
    tabContent = (
      <div id="tab-content_description" className={classes.aboutContainer}>
        <p>{data.description}</p>
      </div>
    );
  } else if (selectedTab === 'seasons') {
    tabContent = (
      <div id="tab-content_seasons" className={classes.sliderContainer}>
        {data.seasons.map((season) => (
          <div key={season.season} className={classes.slide}>
            <p>{season.title}</p>
            <img src={season.image} alt={`${season.title} cover`} />
          </div>
        ))}
      </div>
    );
  }

  const seasonNum = data.seasons.length - 1;
  const latestSeasonImage = data.seasons[seasonNum].image;

  return (
    <div className={classes.detailsContainer}>
      <div className={classes.header}>
        <img src={latestSeasonImage} alt={`Season ${seasonNum + 1} cover`} />
        <h1>{data.title}</h1>
      </div>
      <div>
        <menu>
          <TabButton
            isSelected={selectedTab === 'about'}
            onSelect={() => handleSelect('about')}
          >
            About
          </TabButton>
          <TabButton
            isSelected={selectedTab === 'seasons'}
            onSelect={() => handleSelect('seasons')}
          >
            Seasons
          </TabButton>
        </menu>
        {tabContent}
      </div>
    </div>
  );
}
