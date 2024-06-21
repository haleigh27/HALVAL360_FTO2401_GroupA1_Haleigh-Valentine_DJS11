import React, { useEffect, useState } from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';

import PreviewList from '../components/previews/PreviewList';
import SortDropdown from '../components/dropdown/SortDropdown';
import sortShows from '../components/dropdown/sortShows';

export default function Genre() {
  // Fetching genreData and allShows using react-router-dom hooks
  const genreData = useLoaderData();
  const allShows = useRouteLoaderData('all-shows');

  // State to hold filtered shows based on genreData.shows
  const [filteredData, setFilteredData] = useState([]);

  // Effect to filter shows based on genreData.shows when allShows or genreData.shows change
  useEffect(() => {
    const filtered = allShows.filter((item) =>
      genreData.shows.includes(item.id)
    );
    setFilteredData(filtered);
  }, [allShows, genreData.shows]);

  // State for sorting option and sorted shows array
  const [sortOption, setSortOption] = useState('a-z');
  const [sortedShowsArray, setSortedShowsArray] = useState([]);

  // Effect to sort filteredData based on sortOption using sortShows function
  useEffect(() => {
    setSortedShowsArray(sortShows(filteredData, sortOption));
  }, [sortOption, filteredData]);

  // Handler for changing the sorting option
  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  // Rendering JSX to display genre title, description, sort dropdown, and preview list of shows
  return (
    <div>
      <h1>{genreData.title}</h1>
      <p>{genreData.description}</p>
      <SortDropdown onSortChange={handleSortOptionChange} />
      <PreviewList genre={genreData.title} previewListData={sortedShowsArray} />
    </div>
  );
}
