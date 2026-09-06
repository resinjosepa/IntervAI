def generate_question(
    role: str,
    difficulty: str,
    question_number: int
):
    return {
        "question": (
            f"Question {question_number}: "
            f"Explain an important concept related to {role}."
        ),
        "topic": "General Technical Knowledge",
        "difficulty": difficulty
    }
def evaluate_answer(
    question: str,
    answer: str
):
    return {
        "score": 8,
        "technical_accuracy": 8,
        "clarity": 8,
        "feedback": "Good explanation of the concept.",
        "strengths": [
            "Correct basic understanding",
            "Clear explanation"
        ],
        "improvements": [
            "Add a practical example"
        ]
    }
