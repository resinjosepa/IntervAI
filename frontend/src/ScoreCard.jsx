import React from 'react';

export default function ScoreCard({
  score,
  feedback,
  strengths,
  improvements
}) {
  // Score color formatting
  const numScore = typeof score === 'number' ? score : parseFloat(score) || 0;
  let scoreClass = 'score-high';
  if (numScore < 6) {
    scoreClass = 'score-low';
  } else if (numScore < 8) {
    scoreClass = 'score-mid';
  }

  // Normalize strengths and improvements (can be string or array)
  const normalizedStrengths = Array.isArray(strengths)
    ? strengths
    : strengths && typeof strengths === 'string'
    ? [strengths]
    : [];

  const normalizedImprovements = Array.isArray(improvements)
    ? improvements
    : improvements && typeof improvements === 'string'
    ? [improvements]
    : [];

  return (
    <div className="score-card">
      <div className="score-hero">
        <span className="score-label">Your Score</span>
        <div className={`score-display ${scoreClass}`}>
          <span className="score-number">{score}</span>
          <span className="score-denominator">/ 10</span>
        </div>
      </div>

      {feedback && (
        <div className="feedback-section">
          <h4 className="section-subtitle">Feedback</h4>
          <div className="feedback-content">
            <svg className="feedback-quote-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <p className="feedback-text">{feedback}</p>
          </div>
        </div>
      )}

      {/* Only display strengths if backend provided them */}
      {normalizedStrengths.length > 0 && (
        <div className="feedback-detail-block strengths-block">
          <h4 className="detail-title text-success">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Key Strengths
          </h4>
          <ul className="detail-list">
            {normalizedStrengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Only display improvements if backend provided them */}
      {normalizedImprovements.length > 0 && (
        <div className="feedback-detail-block improvements-block">
          <h4 className="detail-title text-warning">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Areas for Improvement
          </h4>
          <ul className="detail-list">
            {normalizedImprovements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
