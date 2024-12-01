import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <button onClick={handleClick}>
      Go to Home Page
    </button>
  );
};

export default HomeButton;
