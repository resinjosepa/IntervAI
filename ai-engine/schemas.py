from pydantic import BaseModel


class QuestionRequest(BaseModel):
    role: str
    difficulty: str
    question_number: int = 1


class QuestionResponse(BaseModel):
    question: str
    topic: str
    difficulty: str

class EvaluationRequest(BaseModel):
    question: str
    answer: str


class EvaluationResponse(BaseModel):
    score: int
    technical_accuracy: int
    clarity: int
    feedback: str
    strengths: list[str]
    improvements: list[str]
