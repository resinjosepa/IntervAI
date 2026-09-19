import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { InterviewProvider } from './context/InterviewContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Interview from './pages/Interview';
import Feedback from './pages/Feedback';
import Result from './pages/Result';
import History from './pages/History';

export default function App() {
  return (
    <InterviewProvider>
      <div className="app-shell">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/result" element={<Result />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="footer-content">
            <p>© {new Date().getFullYear()} AI Interview Practice • Designed for Technical Interview Preparation</p>
          </div>
        </footer>
      </div>
    </InterviewProvider>
  );
}
