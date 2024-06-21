/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TabButton from '../navigation/TabButton';

import classes from './PodcastDetails.module.css';

export default function PodcastDetails({ data }) {
  const [selectedTab, setSelectedTab] = useState();
  const [isExpanded, setIsExpanded] = useState(false);

  function handleSelect(selectedButton) {
    setSelectedTab(selectedButton);
  }

  function toggleText() {
    setIsExpanded(!isExpanded);
  }

  let tabContent;

  if (!selectedTab || selectedTab === 'about') {
    tabContent = (
      <div className={classes.aboutContainer}>
        <p className={isExpanded ? classes.fullText : classes.truncated}>
          {data.description}
        </p>
        {data.description && data.description.length > 400 && (
          <button
            onClick={toggleText}
            type="button"
            className={classes.seeMore}
          >
            {isExpanded ? 'See Less' : 'See More'}
          </button>
        )}
      </div>
    );
  } else if (selectedTab === 'seasons') {
    tabContent = (
      <div id="tab-content_seasons" className={classes.sliderContainer}>
        {data.seasons.map((season) => (
          <Link key={season.season} to={`${season.season}`}>
            <div className={classes.slide}>
              <p>{season.title}</p>
              <img src={season.image} alt={`${season.title} cover`} />
            </div>
          </Link>
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
