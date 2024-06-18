/* eslint-disable react/prop-types */
import React from 'react';

export default function SortDropdown({ onSortChange }) {
  const handleSortChange = (event) => {
    const { value } = event.target;
    onSortChange(value);
  };

  return (
    <div>
      <select id="sort-options" defaultValue="a-z" onChange={handleSortChange}>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="date_ascending">Date (Ascending)</option>
        <option value="date_descending">Date (Descending)</option>
      </select>
    </div>
  );
}
