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
from app.services.ai_service import AIService


router = APIRouter(prefix="/api/interviews", tags=["Interviews"])


@router.post("/start", response_model=StartInterviewResponse)
def start_interview(
    request: StartInterviewRequest,
    db: Session = Depends(get_db),
):
    interview = Interview(
        role=request.role,
        difficulty=request.difficulty,
        number_of_questions=request.number_of_questions,
    )

    db.add(interview)
    db.flush()

    ai_service = AIService()

    question_text = ai_service.generate_question(
        request.role,
        request.difficulty,
        1,
    )

    question = Question(
        interview_id=interview.id,
        question_text=question_text,
        question_number=1,
    )

    db.add(question)
    db.commit()
    db.refresh(question)

    return {
        "interview_id": interview.id,
        "question_id": question.id,
        "question": question.question_text,
    }


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
        raise HTTPException(
            status_code=404,
            detail="Interview not found",
        )

    return interview


@router.post(
    "/{interview_id}/answer",
    response_model=SubmitAnswerResponse,
)
def submit_answer(
    interview_id: int,
    request: SubmitAnswerRequest,
    db: Session = Depends(get_db),
):
    interview = (
        db.query(Interview)
        .filter(Interview.id == interview_id)
        .first()
    )

    if interview is None:
        raise HTTPException(
            status_code=404,
            detail="Interview not found",
        )

    question = (
        db.query(Question)
        .filter(
            Question.id == request.question_id,
            Question.interview_id == interview_id,
        )
        .first()
    )

    if question is None:
        raise HTTPException(
            status_code=404,
            detail="Question not found",
        )

    if question.answer is not None:
        raise HTTPException(
            status_code=400,
            detail="Question has already been answered",
        )

    ai_service = AIService()

    evaluation = ai_service.evaluate_answer(
        question.question_text,
        request.answer,
    )

    answer = Answer(
        question_id=question.id,
        answer_text=request.answer,
        score=evaluation["score"],
        feedback=evaluation["feedback"],
    )

    db.add(answer)

    next_question = ""

    next_question_number = question.question_number + 1

    if next_question_number <= interview.number_of_questions:
        question_text = ai_service.generate_question(
            interview.role,
            interview.difficulty,
            next_question_number,
        )

        new_question = Question(
            interview_id=interview.id,
            question_text=question_text,
            question_number=next_question_number,
        )

        db.add(new_question)
        next_question = question_text

    db.commit()

    return {
        "score": evaluation["score"],
        "feedback": evaluation["feedback"],
        "next_question": next_question,
    }
