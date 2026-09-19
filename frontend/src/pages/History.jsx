import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInterviewHistory } from '../api/api';
import Button from '../components/Button';

export default function History() {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadHistory() {
      setLoading(true);
      setError('');

      try {
        const data = await getInterviewHistory();
        setHistoryList(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          'Unable to load interview history. Please check your backend connection.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  return (
    <div className="page-container page-history">
      <div className="history-wrapper">
        <div className="history-header-row">
          <div>
            <h1 className="history-title">Interview History</h1>
            <p className="history-subtitle">
              Review your past practice sessions and tracked improvements.
            </p>
          </div>

          <Button
            onClick={() => navigate('/')}
            variant="primary"
            size="md"
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            }
          >
            New Interview
          </Button>
        </div>

        {error && (
          <div className="alert alert-error">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-subtext">Loading interview history...</p>
          </div>
        ) : historyList.length === 0 ? (
          <div className="empty-state-card card-shadow">
            <div className="empty-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>

            <h3>No Interviews Recorded Yet</h3>

            <p>
              Complete your first AI interview practice session to build your
              history log.
            </p>

            <Button
              onClick={() => navigate('/')}
              variant="primary"
              size="md"
            >
              Start Your First Interview
            </Button>
          </div>
        ) : (
          <div className="history-table-wrapper card-shadow">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Interview ID</th>
                  <th>Role</th>
                  <th>Difficulty</th>
                  <th>Questions</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {historyList.map((item, index) => {
                  const answeredQuestions =
                    item.questions?.filter((q) => q.answer) || [];

                  const scores = answeredQuestions
                    .map((q) => Number(q.answer?.score))
                    .filter((score) => !Number.isNaN(score));

                  const averageScore =
                    scores.length > 0
                      ? scores.reduce((sum, score) => sum + score, 0) /
                        scores.length
                      : null;

                  const scoreBadgeClass =
                    averageScore === null
                      ? 'badge-score-mid'
                      : averageScore < 6
                      ? 'badge-score-low'
                      : averageScore < 8
                      ? 'badge-score-mid'
                      : 'badge-score-high';

                  return (
                    <tr key={item.id || index}>
                      <td>
                        <span className="mono-id">#{item.id}</span>
                      </td>

                      <td>
                        <strong className="table-role">
                          {item.role}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`badge badge-diff diff-${item.difficulty?.toLowerCase()}`}
                        >
                          {item.difficulty}
                        </span>
                      </td>

                      <td>
                        <span className="table-questions">
                          {item.number_of_questions} Qs
                        </span>
                      </td>

                      <td>
                        <span
                          className={`score-pill ${scoreBadgeClass}`}
                        >
                          {averageScore !== null
                            ? `${averageScore.toFixed(1)} / 10`
                            : 'N/A'}
                        </span>
                      </td>

                      <td>
                        <span className="table-date">
                          N/A
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
