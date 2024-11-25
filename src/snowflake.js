// Snowflake.js
import React from 'react';
import './snowflake.css';

const Snowflake = () => {
  const snowflakes = Array.from({ length: 50 }).map((_, index) => (
    <div key={index} className="snowflake" style={{
      left: `${Math.random() * 100}vw`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${Math.random() * 3 + 5}s`
    }}>
      ❄️
    </div>
  ));
  
  return <>{snowflakes}</>;
};

export default Snowflake;
