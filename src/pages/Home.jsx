import React, { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import PreviewList from '../components/previews/PreviewList';
import SortDropdown from '../components/dropdown/SortDropdown';
import sortShows from '../components/dropdown/sortShows';

export default function Home() {
  const allShowsData = useRouteLoaderData('all-shows');
  const [sortOption, setSortOption] = useState('a-z');
  const [sortedShowsArray, setSortedShowsArray] = useState([]);

  useEffect(() => {
    setSortedShowsArray(sortShows(allShowsData, sortOption));
  }, [sortOption, allShowsData]);

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  return (
    <>
      <div>Recommended shows</div>
      <SortDropdown onSortChange={handleSortOptionChange} />
      <PreviewList genre="All Shows" previewListData={sortedShowsArray} />
    </>
  );
}
