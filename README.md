# AI Interview Practice App - Frontend

A modern, responsive, and beginner-friendly React + Vite frontend for technical interview preparation with AI. Designed to connect seamlessly with an existing FastAPI backend.

---

## Features

- **Customized Setup**: Choose from 8 target roles, 3 difficulty levels, and question lengths.
- **Dynamic Interview Flow**: Progress tracking, clean card-based question prompt, and responsive answer textarea.
- **Instant AI Scoring & Feedback**: Question-by-question scoring (e.g., 8/10), constructive feedback, strengths, and areas for improvement.
- **Final Comprehensive Report**: Aggregate evaluation, overall score, key strengths, improvements, and tailored recommendation.
- **Interview History**: Real-time view of past completed interviews fetched from the backend.
- **Automatic Mock Fallback**: Built-in mock mode keeps the app fully testable and functional even when the backend is offline.
- **Responsive Modern Design**: Desktop, tablet, and mobile optimized with the official palette (Primary #2563EB, Dark #0F172A).

---

## Tech Stack

- **React 18** (Functional components with Hooks)
- **Vite** (Ultra-fast development server and builder)
- **Axios** (Centralized API client)
- **React Router v6** (Client-side routing)
- **Vanilla Modern CSS** (Zero bloated CSS dependencies, 100% custom styled)

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation

```bash
# 1. Navigate to the project directory
cd ai-interview-frontend

# 2. Install dependencies
npm install

# 3. (Optional) Configure environment variables
copy .env.example .env

# 4. Start Vite development server
npm run dev
```

The app will be accessible at `http://localhost:3000`.

---

## Backend API Contract

The frontend connects to the following FastAPI endpoints:

| Action | Method | Endpoint | Request Body | Response Body |
| :--- | :--- | :--- | :--- | :--- |
| **Start Interview** | `POST` | `/api/interviews/start` | `{"role": "Python Developer", "difficulty": "Medium", "number_of_questions": 5}` | `{"interview_id": 101, "question_id": 1, "question": "..."}` |
| **Submit Answer** | `POST` | `/api/interviews/{id}/answer` | `{"question_id": 1, "answer": "..."}` | `{"score": 8, "feedback": "...", "next_question": "..."}` |
| **Get Interview** | `GET` | `/api/interviews/{id}` | None | Interview report details |
| **Interview History** | `GET` | `/api/interviews/history` | None | Array of past interviews |

### Mock Data Mode
If the FastAPI backend is not running at `http://localhost:8000`, the frontend automatically switches to **Mock Mode**. A status indicator in the top navigation bar indicates whether live API mode or mock mode is active.

---

## Docker Support

You can build and run the frontend using Docker:

```bash
# Build the Docker image
docker build -t ai-interview-frontend .

# Run container on port 80
docker run -p 80:80 ai-interview-frontend
```

---

## Project Structure

```
ai-interview-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation header with brand & backend status
│   │   ├── Loading.jsx       # Evaluating answer & loading spinners
│   │   ├── QuestionCard.jsx  # Question display card with role/difficulty badge
│   │   ├── ScoreCard.jsx     # Visual score badge and feedback display
│   │   └── Button.jsx        # Reusable styled button component
│   ├── pages/
│   │   ├── Home.jsx          # Role, difficulty, and question count selector
│   │   ├── Interview.jsx     # Live interview session with answer textarea
│   │   ├── Feedback.jsx      # Per-question score & evaluation display
│   │   ├── Result.jsx        # Final interview summary & recommendations
│   │   └── History.jsx       # Past interview sessions table
│   ├── api/
│   │   ├── api.js            # Axios client with fallback to mock data
│   │   └── mockData.js       # Realistic mock question banks & AI evaluator
│   ├── context/
│   │   └── InterviewContext.jsx # Global session state management
│   ├── App.jsx               # Route definitions
│   ├── main.jsx              # React DOM mounting
│   └── App.css               # Design system tokens and styling
├── public/
│   └── favicon.svg           # Application favicon
├── .env.example              # Environment variables template
├── Dockerfile                # Production multi-stage Docker build
├── package.json              # Project dependencies & scripts
├── vite.config.js            # Vite configuration
└── README.md                 # Documentation
```
