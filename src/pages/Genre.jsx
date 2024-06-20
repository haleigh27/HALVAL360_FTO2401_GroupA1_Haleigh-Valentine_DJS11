import React, { useEffect, useState } from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';

import PreviewList from '../components/previews/PreviewList';
import SortDropdown from '../components/dropdown/SortDropdown';
import sortShows from '../components/dropdown/sortShows';

export default function Genre() {
  const genreData = useLoaderData();
  const allShows = useRouteLoaderData('all-shows');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = allShows.filter((item) =>
      genreData.shows.includes(item.id)
    );
    setFilteredData(filtered);
  }, [allShows, genreData.shows]);

  const [sortOption, setSortOption] = useState('a-z');
  const [sortedShowsArray, setSortedShowsArray] = useState([]);

  useEffect(() => {
    setSortedShowsArray(sortShows(filteredData, sortOption));
  }, [sortOption, filteredData]);

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  return (
    <div>
      <h1>{genreData.title}</h1>
      <p>{genreData.description}</p>
      <SortDropdown onSortChange={handleSortOptionChange} />
      <PreviewList genre={genreData.title} previewListData={sortedShowsArray} />
    </div>
  );
}
