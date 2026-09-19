import React from 'react';

export default function QuestionCard({
  role,
  difficulty,
  currentNumber,
  totalQuestions,
  question
}) {
  const percentage = Math.min(
    100,
    Math.round((currentNumber / (totalQuestions || 1)) * 100)
  );

  return (
    <div className="question-card">
      <div className="question-header">
        <div className="question-meta">
          <span className="badge badge-role">{role}</span>
          <span className={`badge badge-diff diff-${difficulty?.toLowerCase()}`}>
            {difficulty}
          </span>
        </div>
        <div className="question-progress-text">
          Question <strong>{currentNumber}</strong> / {totalQuestions}
        </div>
      </div>

      <div className="progress-bar-track" aria-hidden="true">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="question-body">
        <span className="question-label">AI Interviewer asks:</span>
        <h2 className="question-text">{question}</h2>
      </div>
    </div>
  );
}
