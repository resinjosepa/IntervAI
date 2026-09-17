import os
import json

from dotenv import load_dotenv
from google import genai


# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY is not set")


# ============================================================
# GEMINI CLIENT
# ============================================================

client = genai.Client(api_key=api_key)

MODEL_NAME = "gemini-3.6-flash"


# ============================================================
# CUSTOM EXCEPTION
# ============================================================

class AIServiceError(Exception):
    """Custom exception for AI service errors."""
    pass


# ============================================================
# AI SERVICE
# ============================================================

class AIService:

    # ========================================================
    # GENERATE INTERVIEW QUESTION
    # ========================================================

    def generate_question(
        self,
        role: str,
        difficulty: str,
        question_number: int,
    ) -> str:

        try:

            # Validate role
            if not role or not role.strip():
                raise AIServiceError(
                    "Candidate role cannot be empty."
                )

            # Validate difficulty
            if not difficulty or not difficulty.strip():
                raise AIServiceError(
                    "Difficulty cannot be empty."
                )

            # Validate question number
            if question_number < 1:
                raise AIServiceError(
                    "Question number must be at least 1."
                )

            prompt = f"""
You are an expert technical interviewer.

Generate interview question number {question_number}.

Candidate role:
{role}

Difficulty:
{difficulty}

Requirements:
- Ask exactly ONE interview question.
- Make it relevant to the candidate's role.
- Match the requested difficulty.
- Do not provide the answer.
- Keep the question clear and suitable for an interview.
- Do not add explanations before or after the question.
"""

            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=prompt,
            )

            if not response.text:
                raise AIServiceError(
                    "Gemini returned an empty response."
                )

            question = response.text.strip()

            if not question:
                raise AIServiceError(
                    "Generated question is empty."
                )

            return question

        except AIServiceError:
            raise

        except Exception as e:
            raise AIServiceError(
                f"Failed to generate interview question: {str(e)}"
            ) from e


    # ========================================================
    # EVALUATE ANSWER
    # ========================================================

    def evaluate_answer(
        self,
        question: str,
        answer: str,
    ) -> dict:

        try:

            # ------------------------------------------------
            # Validate question
            # ------------------------------------------------

            if not question or not question.strip():
                raise AIServiceError(
                    "Interview question cannot be empty."
                )

            # ------------------------------------------------
            # Handle empty answer
            # ------------------------------------------------

            if not answer or not answer.strip():

                return {
                    "score": 0,
                    "technical_accuracy": 0,
                    "clarity": 0,
                    "feedback": (
                        "No valid answer was provided. "
                        "The answer received 0 because it did "
                        "not address the interview question."
                    ),
                    "strengths": [
                        "The candidate submitted a response.",
                        "The interview attempt was recorded."
                    ],
                    "improvements": [
                        "Answer the question directly.",
                        "Include relevant technical concepts or examples."
                    ]
                }

            # ------------------------------------------------
            # Gemini evaluation prompt
            # ------------------------------------------------

            prompt = f"""
You are an expert technical interviewer.

Evaluate the candidate's answer to the interview question.

Interview Question:
{question}

Candidate Answer:
{answer}

Your job is to evaluate ONLY the candidate's actual answer.

IMPORTANT INVALID-ANSWER RULES:

1. If the answer is completely irrelevant to the question,
   return:
   score = 0
   technical_accuracy = 0
   clarity = 0

2. If the answer is nonsense, random text, or unrelated content,
   return:
   score = 0
   technical_accuracy = 0
   clarity = 0

3. If the candidate says that they do not know the answer,
   return:
   score = 0
   technical_accuracy = 0
   clarity = 0

4. If the answer is empty or contains no meaningful content,
   return:
   score = 0
   technical_accuracy = 0
   clarity = 0

5. Do NOT give points simply because the candidate submitted text.

6. If the answer is relevant but partially correct,
   give an appropriate partial score.

7. If the answer is relevant and technically correct,
   give a score based on its actual quality.

8. Do not assume information that the candidate did not provide.

Return ONLY valid JSON.

Use exactly this format:

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

- score: overall answer quality from 0 to 10.
- technical_accuracy: technical correctness from 0 to 10.
- clarity: how clearly the candidate explained the answer from 0 to 10.

For an invalid, irrelevant, nonsense, empty,
or "I don't know" answer:

score = 0
technical_accuracy = 0
clarity = 0

The feedback must clearly explain why the candidate
received a zero score.

For valid answers, evaluate the actual quality honestly.

Do not automatically give high scores.

strengths must contain exactly 2 points.

improvements must contain exactly 2 points.
"""

            # ------------------------------------------------
            # Call Gemini
            # ------------------------------------------------

            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=prompt,
            )

            if not response.text:
                raise AIServiceError(
                    "Gemini returned an empty evaluation."
                )

            # ------------------------------------------------
            # Clean Gemini JSON response
            # ------------------------------------------------

            response_text = response.text.strip()

            # Handle ```json ... ```
            if response_text.startswith("```json"):
                response_text = response_text[7:]

            # Handle ``` ... ```
            elif response_text.startswith("```"):
                response_text = response_text[3:]

            if response_text.endswith("```"):
                response_text = response_text[:-3]

            response_text = response_text.strip()

            # ------------------------------------------------
            # Parse JSON
            # ------------------------------------------------

            result = json.loads(response_text)

            # ------------------------------------------------
            # Validate required fields
            # ------------------------------------------------

            required_fields = [
                "score",
                "technical_accuracy",
                "clarity",
                "feedback",
                "strengths",
                "improvements",
            ]

            for field in required_fields:

                if field not in result:
                    raise AIServiceError(
                        f"Gemini response is missing field: {field}"
                    )

            # ------------------------------------------------
            # Validate scores
            # ------------------------------------------------

            try:
                result["score"] = float(result["score"])
                result["technical_accuracy"] = float(
                    result["technical_accuracy"]
                )
                result["clarity"] = float(
                    result["clarity"]
                )

            except (TypeError, ValueError) as e:

                raise AIServiceError(
                    "Gemini returned invalid score values."
                ) from e

            # ------------------------------------------------
            # Keep scores between 0 and 10
            # ------------------------------------------------

            result["score"] = max(
                0,
                min(10, result["score"])
            )

            result["technical_accuracy"] = max(
                0,
                min(10, result["technical_accuracy"])
            )

            result["clarity"] = max(
                0,
                min(10, result["clarity"])
            )

            # ------------------------------------------------
            # Return result
            # ------------------------------------------------

            return result

        except json.JSONDecodeError as e:

            raise AIServiceError(
                "Gemini returned invalid JSON while evaluating the answer."
            ) from e

        except AIServiceError:
            raise

        except Exception as e:

            raise AIServiceError(
                f"Failed to evaluate answer: {str(e)}"
            ) from e


    # ========================================================
    # GENERATE FINAL INTERVIEW REPORT
    # ========================================================

    def generate_final_report(
        self,
        evaluations: list,
    ) -> dict:

        try:

            # ------------------------------------------------
            # Validate evaluations
            # ------------------------------------------------

            if not evaluations:
                raise AIServiceError(
                    "No interview evaluations were provided."
                )

            # ------------------------------------------------
            # Final report prompt
            # ------------------------------------------------

            prompt = f"""
You are an expert technical interviewer.

Analyze the candidate's interview evaluations below
and generate a final interview performance report.

Evaluations:
{evaluations}

Return ONLY valid JSON.

Use exactly this format:

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

- overall_score must be from 0 to 10.
- Calculate the overall score based on the
  candidate's actual interview evaluations.
- Do not automatically give a high score.
- Consider technical accuracy, clarity,
  and overall answer quality.
- strengths must contain exactly 2 points.
- weaknesses must contain exactly 2 points.
- recommendations must contain exactly 2 points.
- Give honest feedback based only on the evaluations.
"""

            # ------------------------------------------------
            # Call Gemini
            # ------------------------------------------------

            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=prompt,
            )

            if not response.text:
                raise AIServiceError(
                    "Gemini returned an empty final report."
                )

            # ------------------------------------------------
            # Clean response
            # ------------------------------------------------

            response_text = response.text.strip()

            if response_text.startswith("```json"):
                response_text = response_text[7:]

            elif response_text.startswith("```"):
                response_text = response_text[3:]

            if response_text.endswith("```"):
                response_text = response_text[:-3]

            response_text = response_text.strip()

            # ------------------------------------------------
            # Parse JSON
            # ------------------------------------------------

            result = json.loads(response_text)

            # ------------------------------------------------
            # Validate required fields
            # ------------------------------------------------

            required_fields = [
                "overall_score",
                "summary",
                "strengths",
                "weaknesses",
                "recommendations",
            ]

            for field in required_fields:

                if field not in result:
                    raise AIServiceError(
                        f"Gemini report is missing field: {field}"
                    )

            # ------------------------------------------------
            # Validate overall score
            # ------------------------------------------------

            try:
                result["overall_score"] = float(
                    result["overall_score"]
                )

            except (TypeError, ValueError) as e:

                raise AIServiceError(
                    "Gemini returned an invalid overall score."
                ) from e

            result["overall_score"] = max(
                0,
                min(10, result["overall_score"])
            )

            return result

        except json.JSONDecodeError as e:

            raise AIServiceError(
                "Gemini returned invalid JSON while generating the final report."
            ) from e

        except AIServiceError:
            raise

        except Exception as e:

            raise AIServiceError(
                f"Failed to generate final report: {str(e)}"
            ) from e
# ============================================================
# FUNCTIONS USED BY MAIN.PY
# ============================================================

_service = AIService()


def generate_question(role, difficulty, question_number):
    return {
        "question": _service.generate_question(
            role,
            difficulty,
            question_number,
        ),
        "topic": "Technical Interview",
        "difficulty": difficulty,
    }


def evaluate_answer(question, answer):
    return _service.evaluate_answer(
        question,
        answer,
    )


def generate_final_report(evaluations):
    return _service.generate_final_report(
        evaluations,
    )
