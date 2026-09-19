import React from 'react';

export default function Loading({
  text = 'Evaluating Answer...',
  subtext = 'Analyzing conceptual accuracy, structure, and technical depth'
}) {
  return (
    <div className="loading-container">
      <div className="loading-card">
        <div className="loading-pulse-ring">
          <div className="loading-spinner"></div>
        </div>
        <h3 className="loading-title">{text}</h3>
        {subtext && <p className="loading-subtext">{subtext}</p>}
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
