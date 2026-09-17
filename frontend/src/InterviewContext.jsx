import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  startInterview as apiStartInterview,
  submitAnswer as apiSubmitAnswer,
  getInterview as apiGetInterview,
  isMockMode
} from '../api/api';

const InterviewContext = createContext(null);

export function InterviewProvider({ children }) {
  const navigate = useNavigate();

  // Setup state
  const [role, setRole] = useState('Python Developer');
  const [difficulty, setDifficulty] = useState('Medium');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  // Active session state
  const [interviewId, setInterviewId] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [currentAnswer, setCurrentAnswer] = useState('');

  // Per-question feedback
  const [lastFeedback, setLastFeedback] = useState(null);

  // Full session records for review and summary
  const [sessionRecords, setSessionRecords] = useState([]);

  // Final summary results
  const [finalResult, setFinalResult] = useState(null);

  // Loading & error state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Start a new interview
   */
  const startNewInterview = async (customConfig) => {
    setErrorMessage('');
    setIsEvaluating(true);
    
    const config = customConfig || {
      role,
      difficulty,
      number_of_questions: Number(numberOfQuestions)
    };

    try {
      const data = await apiStartInterview(config);
      
      // Save state
      setInterviewId(data.interview_id);
      setCurrentQuestionId(data.question_id);
      setCurrentQuestion(data.question);
      setCurrentQuestionNumber(1);
      setNumberOfQuestions(Number(config.number_of_questions));
      setRole(config.role);
      setDifficulty(config.difficulty);
      
      setCurrentAnswer('');
      setLastFeedback(null);
      setSessionRecords([]);
      setFinalResult(null);

      navigate('/interview');
    } catch (err) {
      setErrorMessage(err.message || 'Unable to start the interview. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  /**
   * Submit the current answer
   */
  const submitCurrentAnswer = async (answerText) => {
    if (!answerText || !answerText.trim()) {
      setErrorMessage('Please type an answer before submitting.');
      return;
    }

    if (!interviewId) {
      setErrorMessage('No active interview session found.');
      return;
    }

    setErrorMessage('');
    setIsEvaluating(true);

    try {
      const data = await apiSubmitAnswer(interviewId, {
        question_id: currentQuestionId,
        answer: answerText.trim()
      });

      // Response format: { score, feedback, next_question, [strengths], [improvements], [next_question_id] }
      setLastFeedback(data);

      // Record answer history
      setSessionRecords((prev) => [
        ...prev,
        {
          question_id: currentQuestionId,
          question: currentQuestion,
          answer: answerText.trim(),
          score: data.score,
          feedback: data.feedback,
          strengths: data.strengths,
          improvements: data.improvements
        }
      ]);

      setCurrentAnswer('');
      navigate('/feedback');
    } catch (err) {
      setErrorMessage(err.message || 'Unable to submit your answer. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  /**
   * Proceed to next question or complete interview
   */
  const proceedNext = async () => {
    setErrorMessage('');

    const isLastQuestion =
      currentQuestionNumber >= numberOfQuestions ||
      !lastFeedback ||
      lastFeedback.next_question === null ||
      lastFeedback.next_question === undefined;

    if (!isLastQuestion && lastFeedback?.next_question) {
      // Transition to next question
      setCurrentQuestion(lastFeedback.next_question);
      if (lastFeedback.next_question_id !== undefined && lastFeedback.next_question_id !== null) {
        setCurrentQuestionId(lastFeedback.next_question_id);
      } else {
        // Fallback if backend didn't supply next_question_id
        setCurrentQuestionId((prev) => (typeof prev === 'number' ? prev + 1 : prev));
      }
      setCurrentQuestionNumber((prev) => prev + 1);
      setLastFeedback(null);
      setCurrentAnswer('');
      navigate('/interview');
    } else {
      // Final question reached - Load result
      await finishInterview();
    }
  };

  /**
   * Finalize and load results
   */
  const finishInterview = async () => {
    setIsLoadingSummary(true);
    try {
      const summaryData = await apiGetInterview(interviewId);
      setFinalResult(summaryData);
    } catch (err) {
      console.warn('Failed to fetch detailed interview report, using local session records:', err);
    } finally {
      setIsLoadingSummary(false);
      navigate('/result');
    }
  };

  /**
   * Reset interview state to begin fresh
   */
  const resetInterview = () => {
    setInterviewId(null);
    setCurrentQuestionId(null);
    setCurrentQuestion('');
    setCurrentQuestionNumber(1);
    setCurrentAnswer('');
    setLastFeedback(null);
    setSessionRecords([]);
    setFinalResult(null);
    setErrorMessage('');
    navigate('/');
  };

  const value = {
    role,
    setRole,
    difficulty,
    setDifficulty,
    numberOfQuestions,
    setNumberOfQuestions,
    interviewId,
    currentQuestionId,
    currentQuestion,
    currentQuestionNumber,
    currentAnswer,
    setCurrentAnswer,
    lastFeedback,
    sessionRecords,
    finalResult,
    isEvaluating,
    isLoadingSummary,
    errorMessage,
    setErrorMessage,
    startNewInterview,
    submitCurrentAnswer,
    proceedNext,
    finishInterview,
    resetInterview,
    isMock: isMockMode()
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
}
