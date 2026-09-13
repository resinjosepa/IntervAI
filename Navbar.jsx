import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isMockMode } from '../api/api';

export default function Navbar() {
  const location = useLocation();
  const mockActive = isMockMode();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <line x1="9" y1="10" x2="15" y2="10"></line>
              <line x1="12" y1="7" x2="12" y2="13"></line>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">AI Interview Practice</span>
            <span className="brand-badge">FastAPI Ready</span>
          </div>
        </Link>

        <nav className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Practice
          </Link>
          <Link
            to="/history"
            className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
          >
            History
          </Link>

          <div className="status-indicator-pill" title={mockActive ? "Simulated local mock responses active" : "Connected to live FastAPI backend"}>
            <span className={`status-dot ${mockActive ? 'mock' : 'live'}`}></span>
            <span className="status-text">{mockActive ? 'Mock Mode' : 'Backend Ready'}</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
