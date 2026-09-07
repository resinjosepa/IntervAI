import os
import json

from dotenv import load_dotenv
from google import genai


# Load environment variables from .env
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY is not set")


# Initialize Gemini client
client = genai.Client(api_key=api_key)


MODEL_NAME = "gemini-3.6-flash"


def generate_question(
    role: str,
    difficulty: str,
    question_number: int
):
    """
    Generate one interview question based on
    candidate role and difficulty.
    """

    prompt = f"""
You are an expert technical interviewer.

Generate interview question number {question_number}.

Candidate role: {role}
Difficulty: {difficulty}

Requirements:
- Ask exactly ONE interview question.
- Make it relevant to the candidate's role.
- Match the requested difficulty.
- Do not provide the answer.
- Keep the question clear and suitable for an interview.
"""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    question = response.text.strip()

    return {
        "question": question,
        "topic": "Technical Interview",
        "difficulty": difficulty
    }


def evaluate_answer(
    question: str,
    answer: str
):
    """
    Evaluate the candidate's answer.
    """

    prompt = f"""
You are an expert technical interviewer.

Evaluate the candidate's answer to the interview question.

Interview Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer and return ONLY valid JSON.

Use this exact format:

{{
    "score": 0,
    "technical_accuracy": 0,
    "clarity": 0,
    "feedback": "Detailed feedback about the answer",
    "strengths": [
        "Strength 1",
        "Strength 2"
    ],
    "improvements": [
        "Improvement 1",
        "Improvement 2"
    ]
}}

Scoring rules:
- score: overall answer quality from 1 to 10
- technical_accuracy: technical correctness from 1 to 10
- clarity: how clearly the candidate explained the answer from 1 to 10
- Give honest scores based on the candidate's actual answer.
- Do not automatically give high scores.
- strengths must contain exactly 2 points.
- improvements must contain exactly 2 points.
"""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    result = json.loads(response.text)

    return result


def generate_final_report(evaluations):
    """
    Generate the final interview performance report.
    """

    prompt = f"""
You are an expert technical interviewer.

Analyze the candidate's interview evaluations below and
generate a final interview report.

Evaluations:
{evaluations}

Return ONLY valid JSON using this exact format:

{{
    "overall_score": 0,
    "summary": "Overall summary of the candidate's performance",
    "strengths": [
        "Strength 1",
        "Strength 2"
    ],
    "weaknesses": [
        "Weakness 1",
        "Weakness 2"
    ],
    "recommendations": [
        "Recommendation 1",
        "Recommendation 2"
    ]
}}

Rules:
- overall_score must be from 1 to 10.
- Calculate the overall score based on the interview evaluations.
- strengths must contain exactly 2 points.
- weaknesses must contain exactly 2 points.
- recommendations must contain exactly 2 points.
- Give honest feedback based on the evaluations.
"""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    result = json.loads(response.text)

    return result
