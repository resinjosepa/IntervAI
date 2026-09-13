import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import Button from '../components/Button';

export default function Result() {
  const navigate = useNavigate();
  const {
    finalResult,
    sessionRecords,
    resetInterview,
    role,
    difficulty
  } = useInterview();

  const [showReview, setShowReview] = useState(false);

  // Compute overall score from backend or fallback to session scores average
  const backendOverallScore = finalResult?.overall_score;
  const computedAverage = sessionRecords.length > 0
    ? (sessionRecords.reduce((acc, curr) => acc + (Number(curr.score) || 0), 0) / sessionRecords.length).toFixed(1)
    : 0;
  const displayScore = backendOverallScore !== undefined && backendOverallScore !== null
    ? backendOverallScore
    : computedAverage;

  // Strengths, improvements, and recommendation (only display if backend returned them)
  const strengths = finalResult?.strengths;
  const improvements = finalResult?.improvements;
  const recommendation = finalResult?.recommendation;

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
    <div className="page-container page-result">
      <div className="result-card card-shadow">
        <header className="result-header">
          <div className="celebration-badge">🎉</div>
          <h1 className="result-title">Interview Completed 🎉</h1>
          <p className="result-subtitle">
            Here is your comprehensive evaluation for the <strong>{role}</strong> ({difficulty}) practice round.
          </p>
        </header>

        {/* Overall Score Section */}
        <div className="result-score-banner">
          <div className="score-ring-wrap">
            <div className="score-ring-content">
              <span className="ring-score-value">{displayScore}</span>
              <span className="ring-score-label">Overall Score / 10</span>
            </div>
          </div>
        </div>

        {/* Strengths (only if returned by backend) */}
        {normalizedStrengths.length > 0 && (
          <div className="result-section">
            <h3 className="result-section-title text-success">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Strengths
            </h3>
            <ul className="result-detail-list">
              {normalizedStrengths.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvements (only if returned by backend) */}
        {normalizedImprovements.length > 0 && (
          <div className="result-section">
            <h3 className="result-section-title text-warning">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Improvements
            </h3>
            <ul className="result-detail-list">
              {normalizedImprovements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendation (only if returned by backend) */}
        {recommendation && (
          <div className="result-section recommendation-section">
            <h3 className="result-section-title text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              Recommendation
            </h3>
            <p className="recommendation-text">{recommendation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="result-actions">
          <Button
            onClick={() => setShowReview(!showReview)}
            variant="outline"
            size="lg"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            }
          >
            {showReview ? 'Hide Review' : 'Review Interview'}
          </Button>

          <Button
            onClick={resetInterview}
            variant="primary"
            size="lg"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
            }
          >
            Try Again
          </Button>

          <Button
            onClick={() => navigate('/history')}
            variant="ghost"
            size="lg"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            }
          >
            View History
          </Button>
        </div>

        {/* Expandable Review Section */}
        {showReview && (
          <div className="review-section">
            <h3 className="review-title">Detailed Question Review</h3>
            <div className="review-list">
              {sessionRecords.map((item, idx) => (
                <div key={idx} className="review-item">
                  <div className="review-item-header">
                    <span className="review-num">Q{idx + 1}</span>
                    <span className="review-question">{item.question}</span>
                    <span className="review-score">{item.score} / 10</span>
                  </div>
                  <div className="review-answer-block">
                    <strong>Your Answer:</strong>
                    <p>{item.answer}</p>
                  </div>
                  {item.feedback && (
                    <div className="review-feedback-block">
                      <strong>Feedback:</strong> {item.feedback}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
