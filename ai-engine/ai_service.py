from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas import (
    QuestionRequest,
    QuestionResponse,
    EvaluationRequest,
    EvaluationResponse,
    FinalReportRequest,
    FinalReportResponse
)

from ai_service import (
    generate_question,
    evaluate_answer,
    generate_final_report
)


app = FastAPI(
    title="IntervAI - AI Interview Engine",
    description="AI-powered interview question generation, answer evaluation, and final reporting",
    version="1.0.0"
)


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "IntervAI AI Interview Engine is running"
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


@app.post(
    "/api/ai/final-report",
    response_model=FinalReportResponse
)
def final_report(request: FinalReportRequest):

    result = generate_final_report(
        request.evaluations
    )

    return result
