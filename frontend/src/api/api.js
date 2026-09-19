import axios from 'axios';

import {
  mockStartInterview,
  mockSubmitAnswer,
  mockGetInterview,
  mockGetHistory
} from './mockData';

// Backend URL
const BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Mock mode is enabled ONLY when explicitly requested.
const FORCE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Centralized Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// Track whether mock mode is active
let mockModeActive = FORCE_MOCK;

export function isMockMode() {
  return mockModeActive;
}

export function getBaseUrl() {
  return BASE_URL;
}

/**
 * Start a new interview
 *
 * Backend:
 * POST /api/interviews/start
 *
 * Request:
 * {
 *   role,
 *   difficulty,
 *   number_of_questions
 * }
 *
 * Response:
 * {
 *   interview_id,
 *   question_id,
 *   question
 * }
 */
export async function startInterview({
  role,
  difficulty,
  number_of_questions
}) {
  if (FORCE_MOCK) {
    mockModeActive = true;

    return mockStartInterview({
      role,
      difficulty,
      number_of_questions
    });
  }

  const response = await apiClient.post(
    '/api/interviews/start',
    {
      role,
      difficulty,
      number_of_questions: Number(number_of_questions),
    }
  );

  mockModeActive = false;

  return response.data;
}

/**
 * Submit an answer
 *
 * Backend:
 * POST /api/interviews/{interview_id}/answer
 *
 * Request:
 * {
 *   question_id,
 *   answer
 * }
 *
 * Response:
 * {
 *   score,
 *   feedback,
 *   next_question
 * }
 */
export async function submitAnswer(
  interviewId,
  { question_id, answer }
) {
  if (FORCE_MOCK) {
    return mockSubmitAnswer(interviewId, {
      question_id,
      answer
    });
  }

  const response = await apiClient.post(
    `/api/interviews/${interviewId}/answer`,
    {
      question_id,
      answer,
    }
  );

  return response.data;
}

/**
 * Get a single interview
 *
 * Backend:
 * GET /api/interviews/{interview_id}
 */
export async function getInterview(interviewId) {
  if (FORCE_MOCK) {
    return mockGetInterview(interviewId);
  }

  const response = await apiClient.get(
    `/api/interviews/${interviewId}`
  );

  return response.data;
}

/**
 * Get interview history
 *
 * Backend:
 * GET /api/interviews/history
 */
export async function getInterviewHistory() {
  if (FORCE_MOCK) {
    return mockGetHistory();
  }

  const response = await apiClient.get(
    '/api/interviews/history'
  );

  mockModeActive = false;

  return response.data;
}

export default apiClient;

