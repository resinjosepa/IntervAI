import React from 'react';
import { useInterview } from '../context/InterviewContext';
import Button from '../components/Button';

const AVAILABLE_ROLES = [
  'Python Developer',
  'Java Developer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Analyst',
  'C++ Developer',
  'Software Engineer'
];

const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'];
const QUESTION_COUNTS = [5, 10, 15, 20];

export default function Home() {
  const {
    role,
    setRole,
    difficulty,
    setDifficulty,
    numberOfQuestions,
    setNumberOfQuestions,
    startNewInterview,
    isEvaluating,
    errorMessage
  } = useInterview();

  const handleStart = (e) => {
    e.preventDefault();
    startNewInterview({
      role,
      difficulty,
      number_of_questions: Number(numberOfQuestions)
    });
  };

  return (
    <div className="page-container page-home">
      <div className="home-card card-shadow">
        <header className="home-header">
          <div className="home-icon-badge">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h1 className="home-title">AI Interview Practice</h1>
          <p className="home-description">
            Practice interview questions tailored to your role and difficulty.
          </p>
        </header>

        {errorMessage && (
          <div className="alert alert-error">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleStart} className="home-form">
          {/* Role Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="role-select">
              Role
            </label>
            <div className="select-wrapper">
              <select
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-select"
                disabled={isEvaluating}
              >
                {AVAILABLE_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Difficulty Field */}
          <div className="form-group">
            <label className="form-label">Difficulty</label>
            <div className="pill-group" role="radiogroup">
              {DIFFICULTY_LEVELS.map((diff) => (
                <button
                  type="button"
                  key={diff}
                  className={`pill-btn ${difficulty === diff ? 'active' : ''}`}
                  onClick={() => setDifficulty(diff)}
                  disabled={isEvaluating}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Questions Field */}
          <div className="form-group">
            <label className="form-label">Number of Questions</label>
            <div className="pill-group" role="radiogroup">
              {QUESTION_COUNTS.map((count) => (
                <button
                  type="button"
                  key={count}
                  className={`pill-btn ${numberOfQuestions === count ? 'active' : ''}`}
                  onClick={() => setNumberOfQuestions(count)}
                  disabled={isEvaluating}
                >
                  {count} Questions
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="form-actions">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isEvaluating}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              }
            >
              Start Interview →
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
