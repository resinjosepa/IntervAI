# IntervAI API Contract

This document defines the common API contract between the frontend, backend, and AI module.

---

## 1. Start Interview

### Endpoint

POST /api/interviews/start

### Request

```json
{
  "role": "Python Developer",
  "difficulty": "Medium",
  "number_of_questions": 5
}
```

### Response

```json
{
  "interview_id": 101,
  "question_id": 1,
  "question": "What is inheritance in Python?"
}
```

---

## 2. Submit Answer

### Endpoint

POST /api/interviews/{id}/answer

### Request

```json
{
  "question_id": 1,
  "answer": "Inheritance allows..."
}
```

### Response

```json
{
  "score": 8,
  "feedback": "Good explanation.",
  "next_question": "What is polymorphism?"
}
```

---

## 3. Get Interview

### Endpoint

GET /api/interviews/{id}

### Response

Returns the interview details, questions, answers, scores, and feedback.

---

## 4. Get Interview History

### Endpoint

GET /api/interviews/history

### Response

Returns a list of previous interviews.
