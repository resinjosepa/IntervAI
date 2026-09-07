from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Answer, Interview, Question
from app.schemas.interview import (
    StartInterviewRequest,
    StartInterviewResponse,
    SubmitAnswerRequest,
    SubmitAnswerResponse,
    InterviewResponse,
)


router = APIRouter(prefix="/api/interviews", tags=["Interviews"])


@router.post("/start", response_model=StartInterviewResponse)
def start_interview(
    request: StartInterviewRequest,
    db: Session = Depends(get_db),
):
    interview = Interview(
        role=request.role,
        difficulty=request.difficulty,
        number_of_questions=request.number_of_questions,    )

    db.add(interview)
    db.flush()

    db.rollback()

    raise HTTPException(
        status_code=501,
        detail="Question generation will be connected during integration.",
    )


@router.get("/history", response_model=list[InterviewResponse])
def get_interview_history(
    db: Session = Depends(get_db),
):
    interviews = (
        db.query(Interview)
        .order_by(Interview.created_at.desc())
        .all()
    )

    return interviews


@router.get("/{interview_id}", response_model=InterviewResponse)
def get_interview(
    interview_id: int,
    db: Session = Depends(get_db),
):
    interview = (
        db.query(Interview)
        .filter(Interview.id == interview_id)
        .first()
    )

    if interview is None:
        raise HTTPException(status_code=404, detail="Interview not found")

    return interview


@router.post("/{interview_id}/answer", response_model=SubmitAnswerResponse)
def submit_answer(
    interview_id: int,
    request: SubmitAnswerRequest,
    db: Session = Depends(get_db),
):
    question = (
        db.query(Question)
        .filter(
            Question.id == request.question_id,
            Question.interview_id == interview_id,
        )
        .first()
    )

    if question is None:
        raise HTTPException(status_code=404, detail="Question not found")

    raise HTTPException(
        status_code=501,
        detail="Answer evaluation will be connected during integration.",
    )
