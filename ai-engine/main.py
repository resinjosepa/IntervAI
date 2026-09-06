from fastapi import FastAPI

from schemas import (
    QuestionRequest,
    QuestionResponse,
    EvaluationRequest,
    EvaluationResponse
)

from ai_service import (
    generate_question,
    evaluate_answer
)

app = FastAPI(
    title="AI Interview Engine",
    description="AI-powered interview question generation and answer evaluation",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "AI Interview Engine is running"
    }


@app.post(
    "/api/ai/generate-question",
    response_model=QuestionResponse
)
def create_question(request: QuestionRequest):

    result = generate_question(
        request.role,
        request.difficulty,
        request.question_number
    )

    return result
@app.post(
    "/api/ai/evaluate-answer",
    response_model=EvaluationResponse
)
def evaluate(request: EvaluationRequest):

    result = evaluate_answer(
        request.question,
        request.answer
    )

    return result
