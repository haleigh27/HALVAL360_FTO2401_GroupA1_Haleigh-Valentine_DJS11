import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import classes from './BackForwardButton.module.css';

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBackActive, setIsBackActive] = useState(false);

  useEffect(() => {
    // Check if there's a back history to go to
    const historyState = window.history.state;
    setIsBackActive(historyState && historyState.idx > 0);
  }, [location]);

  const handleGoBack = () => {
    navigate(-1); // Navigate back one step in history
  };

  return (
    <button
      type="button"
      aria-label="Navigate back"
      onClick={handleGoBack}
      disabled={!isBackActive}
      className={`${classes.navButton} ${isBackActive ? '' : classes.disabled}`}
    >
      <FontAwesomeIcon icon={faChevronLeft} size="xl" />
    </button>
  );
}
