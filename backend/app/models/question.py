from sqlalchemy import ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class Question(Base):
    __tablename__ = "questions"

    id: Mapped[int] = mapped_column(primary_key=True)
    interview_id: Mapped[int] = mapped_column(
        ForeignKey("interviews.id")
    )
    question_text: Mapped[str] = mapped_column(Text)
    question_number: Mapped[int]

    interview: Mapped["Interview"] = relationship(
        back_populates="questions"
    )
    answer: Mapped["Answer"] = relationship(
        back_populates="question",
        uselist=False,
        cascade="all, delete-orphan",
    )
