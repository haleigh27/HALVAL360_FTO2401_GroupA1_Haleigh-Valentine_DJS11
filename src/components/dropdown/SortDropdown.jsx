/* eslint-disable react/prop-types */
import React from 'react';
import classes from './Dropdown.module.css';

export default function SortDropdown({ onSortChange }) {
  const handleSortChange = (event) => {
    const { value } = event.target;
    onSortChange(value);
  };

  return (
    <div>
      <p className={classes.selectTitle}>Sort:</p>
      <select
        defaultValue="a-z"
        onChange={handleSortChange}
        className={classes.select}
      >
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="date_ascending">Date (Ascending)</option>
        <option value="date_descending">Date (Descending)</option>
      </select>
    </div>
  );
}
