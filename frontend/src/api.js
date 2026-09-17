import axios from 'axios';
import {
  mockStartInterview,
  mockSubmitAnswer,
  mockGetInterview,
  mockGetHistory
} from './mockData';

// Base URL configured via environment variable
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const FORCE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Centralized Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Flag to track whether we are operating in mock mode
let mockModeActive = FORCE_MOCK;

export function isMockMode() {
  return mockModeActive;
}

export function getBaseUrl() {
  return BASE_URL;
}

/**
 * Start Interview
 * POST /api/interviews/start
 * Request: { role, difficulty, number_of_questions }
 * Response: { interview_id, question_id, question }
 */
export async function startInterview({ role, difficulty, number_of_questions }) {
  if (FORCE_MOCK) {
    mockModeActive = true;
    return mockStartInterview({ role, difficulty, number_of_questions });
  }

  try {
    const response = await apiClient.post('/api/interviews/start', {
      role,
      difficulty,
      number_of_questions: Number(number_of_questions),
    });
    mockModeActive = false;
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable for startInterview, falling back to mock mode:', error.message);
    mockModeActive = true;
    return mockStartInterview({ role, difficulty, number_of_questions });
  }
}

/**
 * Submit Answer
 * POST /api/interviews/{id}/answer
 * Request: { question_id, answer }
 * Response: { score, feedback, next_question }
 */
export async function submitAnswer(interviewId, { question_id, answer }) {
  if (mockModeActive || FORCE_MOCK) {
    return mockSubmitAnswer(interviewId, { question_id, answer });
  }

  try {
    const response = await apiClient.post(`/api/interviews/${interviewId}/answer`, {
      question_id,
      answer,
    });
    return response.data;
  } catch (error) {
    console.warn(`Backend unavailable for submitAnswer (${interviewId}), falling back to mock evaluator:`, error.message);
    mockModeActive = true;
    return mockSubmitAnswer(interviewId, { question_id, answer });
  }
}

/**
 * Get Interview Details / Results
 * GET /api/interviews/{id}
 */
export async function getInterview(interviewId) {
  if (mockModeActive || FORCE_MOCK) {
    return mockGetInterview(interviewId);
  }

  try {
    const response = await apiClient.get(`/api/interviews/${interviewId}`);
    return response.data;
  } catch (error) {
    console.warn(`Backend unavailable for getInterview (${interviewId}), using fallback report:`, error.message);
    return mockGetInterview(interviewId);
  }
}

/**
 * Interview History
 * GET /api/interviews/history
 */
export async function getInterviewHistory() {
  if (FORCE_MOCK) {
    return mockGetHistory();
  }

  try {
    const response = await apiClient.get('/api/interviews/history');
    mockModeActive = false;
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable for history, showing saved mock history:', error.message);
    mockModeActive = true;
    return mockGetHistory();
  }
}

export default apiClient;
