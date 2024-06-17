import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav className={classes.navBar}>
        <ul className={classes.list}>
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="search"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="library"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Library
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
