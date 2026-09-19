import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import ScoreCard from '../components/ScoreCard';
import Button from '../components/Button';

export default function Feedback() {
  const navigate = useNavigate();
  const {
    interviewId,
    lastFeedback,
    proceedNext,
    currentQuestionNumber,
    numberOfQuestions,
    isEvaluating
  } = useInterview();

  useEffect(() => {
    if (!interviewId || !lastFeedback) {
      navigate('/');
    }
  }, [interviewId, lastFeedback, navigate]);

  if (!lastFeedback) {
    return null;
  }

  const isLastQuestion = currentQuestionNumber >= numberOfQuestions || !lastFeedback.next_question;

  return (
    <div className="page-container page-feedback">
      <div className="feedback-wrapper">
        <header className="feedback-header">
          <div className="badge badge-success-subtle">
            Question {currentQuestionNumber} of {numberOfQuestions} Evaluated
          </div>
          <h1 className="feedback-page-title">Assessment & Feedback</h1>
        </header>

        <ScoreCard
          score={lastFeedback.score}
          feedback={lastFeedback.feedback}
          strengths={lastFeedback.strengths}
          improvements={lastFeedback.improvements}
        />

        <div className="feedback-actions">
          <Button
            onClick={proceedNext}
            variant="primary"
            size="lg"
            loading={isEvaluating}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            }
          >
            {isLastQuestion ? 'Complete Interview & View Report 🎉' : 'Next Question →'}
          </Button>
        </div>
      </div>
    </div>
  );
}
