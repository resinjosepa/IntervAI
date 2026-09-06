from pydantic import BaseModel


class StartInterviewRequest(BaseModel):
    role: str
    difficulty: str
    number_of_questions: int


class SubmitAnswerRequest(BaseModel):
    question_id: int
    answer: str


class StartInterviewResponse(BaseModel):
    interview_id: int
    question_id: int
    question: str


class SubmitAnswerResponse(BaseModel):
    score: float
    feedback: str
    next_question: str

class AnswerResponse(BaseModel):
    id: int
    question_id: int
    answer_text: str
    score: float
    feedback: str


class QuestionResponse(BaseModel):
    id: int
    question_text: str
    question_number: int
    answer: AnswerResponse | None = None
class AnswerResponse(BaseModel):
    id: int
    question_id: int
    answer_text: str
    score: float
    feedback: str


class QuestionResponse(BaseModel):
    id: int
    question_text: str
    question_number: int
    answer: AnswerResponse | None = None


class InterviewResponse(BaseModel):
    id: int
    role: str
    difficulty: str
    number_of_questions: int
    questions: list[QuestionResponse]
