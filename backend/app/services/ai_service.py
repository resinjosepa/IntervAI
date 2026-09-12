import os

import httpx


class AIService:
    def __init__(self):
        self.base_url = os.getenv("AI_ENGINE_URL", "http://ai-engine:8000")

    def generate_question(
        self,
        role: str,
        difficulty: str,
        question_number: int,
    ) -> str:
        response = httpx.post(
            f"{self.base_url}/api/ai/generate-question",
            json={
                "role": role,
                "difficulty": difficulty,
                "question_number": question_number,
            },
            timeout=60.0,
        )

        response.raise_for_status()

        return response.json()["question"]

    def evaluate_answer(
        self,
        question: str,
        answer: str,
    ) -> dict:
        response = httpx.post(
            f"{self.base_url}/api/ai/evaluate-answer",
            json={
                "question": question,
                "answer": answer,
            },
            timeout=60.0,
        )

        response.raise_for_status()

        return response.json()
