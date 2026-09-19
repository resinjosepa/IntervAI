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

      // Save state from backend response
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
      setErrorMessage(
        err.message || 'Unable to start the interview. Please try again.'
      );
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

      // Backend response:
      // { score, feedback, next_question }
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
      setErrorMessage(
        err.message || 'Unable to submit your answer. Please try again.'
      );
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
      !lastFeedback.next_question;

    if (!isLastQuestion) {
      try {
        /*
         * The backend returns the next question's text,
         * but does not return its question_id.
         *
         * Fetch the interview and find the newly-created
         * question by matching its question text.
         */
        const interview = await apiGetInterview(interviewId);

        const nextQuestion = interview.questions?.find(
          (question) =>
            question.question_text === lastFeedback.next_question
        );

        if (!nextQuestion) {
          setErrorMessage('Unable to identify the next question.');
          return;
        }

        setCurrentQuestion(nextQuestion.question_text);
        setCurrentQuestionId(nextQuestion.id);
        setCurrentQuestionNumber((prev) => prev + 1);
        setLastFeedback(null);
        setCurrentAnswer('');

        navigate('/interview');
      } catch (err) {
        setErrorMessage(
          err.message || 'Unable to load the next question.'
        );
      }
    } else {
      // Final question reached - load result
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
      console.warn(
        'Failed to fetch detailed interview report, using local session records:',
        err
      );
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
    throw new Error(
      'useInterview must be used within an InterviewProvider'
    );
  }

  return context;
}

