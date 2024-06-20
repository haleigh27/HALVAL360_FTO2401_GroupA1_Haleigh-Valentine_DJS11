import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classes from './BackForwardButton.module.css';

export default function ForwardButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isForwardActive, setIsForwardActive] = useState(false);

  useEffect(() => {
    // Check if there's a forward history to go to
    const historyState = window.history.state;
    setIsForwardActive(
      historyState && historyState.idx < window.history.length - 1
    );
  }, [location]);

  const handleGoForward = () => {
    navigate(1); // Navigate forward one step in history
  };

  return (
    <button
      type="button"
      aria-label="Navigate forward"
      onClick={handleGoForward}
      disabled={!isForwardActive}
      className={`${classes.navButton} ${
        isForwardActive ? '' : classes.disabled
      }`}
    >
      <FontAwesomeIcon icon={faChevronRight} size="xl" />
    </button>
  );
}
