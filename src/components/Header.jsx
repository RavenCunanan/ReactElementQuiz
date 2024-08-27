import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ onReset }) {
  const navigate = useNavigate();

  function handleHomeClick(e) {
    e.preventDefault();
    onReset();          // Reset quiz state
    navigate('/');      // Navigate to the user form page
  }

  return (
    <header>
      <h1>What Element Are You?</h1>
      <nav>
        <Link to="/quiz">Quiz</Link>
        <Link to="/" onClick={handleHomeClick}>Home</Link>
      </nav>
    </header>
  );
}
