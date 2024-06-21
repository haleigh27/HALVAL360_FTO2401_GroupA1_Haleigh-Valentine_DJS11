/* eslint-disable react/prop-types */
import React from 'react';

import classes from './TabButton.module.css';

export default function TabButton({ children, onSelect, isSelected }) {
  return (
    <li>
      <button
        className={`${classes.tab} ${isSelected ? classes.active : undefined}`}
        onClick={onSelect}
        type="button"
      >
        {children}
      </button>
    </li>
  );
}
