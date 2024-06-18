import React, { useEffect, useState } from 'react';
import { useRouteLoaderData, useSearchParams } from 'react-router-dom';
import PreviewList from '../components/previews/PreviewList';
import SortDropdown from '../components/dropdown/SortDropdown';
import sortShows from '../components/dropdown/sortShows';
import GenreDropdown from '../components/dropdown/GenreDropdown';

export default function Home() {
  const allShowsData = useRouteLoaderData('all-shows');
  const [sortOption, setSortOption] = useState('a-z');
  const [sortedShowsArray, setSortedShowsArray] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [genreArray, setGenreArray] = useState(sortedShowsArray);

  const genre = searchParams.get('genre') || 'All';

  useEffect(() => {
    // Sort
    setSortedShowsArray(sortShows(allShowsData, sortOption));
  }, [sortOption, allShowsData]);

  useEffect(() => {
    // Filter sorted shows by genre
    if (genre === 'All') {
      setGenreArray(sortedShowsArray);
    } else {
      const filteredData = sortedShowsArray.filter((show) =>
        show.genres.includes(parseInt(genre))
      );
      setGenreArray(filteredData);
    }
  }, [sortedShowsArray, genre]);

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const handleGenreChange = (event) => {
    const selectedGenreId = event.target.value;
    setSearchParams({ genre: selectedGenreId });
    console.log(genreArray);
  };

  return (
    <>
      <div>Recommended shows</div>
      <div>
        <SortDropdown onSortChange={handleSortOptionChange} />
        <GenreDropdown
          selectedGenre={genre}
          onGenreChange={handleGenreChange}
        />
      </div>
      <PreviewList genre="All Shows" previewListData={genreArray} />
    </>
  );
}
