import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import QuestionCard from '../components/QuestionCard';
import Button from '../components/Button';
import Loading from '../components/Loading';

export default function Interview() {
  const navigate = useNavigate();
  const {
    role,
    difficulty,
    numberOfQuestions,
    interviewId,
    currentQuestion,
    currentQuestionNumber,
    currentAnswer,
    setCurrentAnswer,
    submitCurrentAnswer,
    isEvaluating,
    errorMessage
  } = useInterview();

  // Protect route if no session has started
  useEffect(() => {
    if (!interviewId && !currentQuestion) {
      navigate('/');
    }
  }, [interviewId, currentQuestion, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentAnswer.trim() || isEvaluating) return;
    submitCurrentAnswer(currentAnswer);
  };

  if (isEvaluating) {
    return <Loading text="Evaluating Answer..." subtext="Analyzing technical terminology, solution structure, and depth..." />;
  }

  const isAnswerEmpty = !currentAnswer || !currentAnswer.trim();

  return (
    <div className="page-container page-interview">
      <div className="interview-flow-wrapper">
        <header className="page-title-row">
          <div className="status-badge-inline">
            <span className="pulsing-recording-dot"></span>
            Interview in Progress
          </div>
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

        <QuestionCard
          role={role}
          difficulty={difficulty}
          currentNumber={currentQuestionNumber}
          totalQuestions={numberOfQuestions}
          question={currentQuestion || 'Loading next question...'}
        />

        <form onSubmit={handleSubmit} className="answer-form card-shadow">
          <label htmlFor="interview-answer" className="answer-label">
            Your Response
          </label>
          <textarea
            id="interview-answer"
            className="answer-textarea"
            placeholder="Type your answer here..."
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            rows={8}
            disabled={isEvaluating}
            autoFocus
          ></textarea>

          <div className="answer-footer">
            <span className="character-counter">
              {currentAnswer.trim().split(/\s+/).filter(Boolean).length} words
            </span>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isAnswerEmpty || isEvaluating}
              loading={isEvaluating}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              }
            >
              Submit Answer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
