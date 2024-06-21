import React, { useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import PreviewList from '../previews/PreviewList';
import classes from './Dropdown.module.css';

export default function SearchByTitle() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const allShowsData = useRouteLoaderData('all-shows');

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    if (value) {
      const filteredShows = allShowsData.filter((show) =>
        show.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredShows);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div>
      <div>
        <h1>Search shows</h1>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a specific show..."
          className={classes.search}
        />
      </div>
      <PreviewList genre="" previewListData={suggestions} />
    </div>
  );
}
