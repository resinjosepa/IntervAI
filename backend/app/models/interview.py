from sqlalchemy import DateTime, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class Interview(Base):
    __tablename__ = "interviews"

    id: Mapped[int] = mapped_column(primary_key=True)
    role: Mapped[str] = mapped_column(String(100))
    difficulty: Mapped[str] = mapped_column(String(50))
    number_of_questions: Mapped[int]
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    questions: Mapped[list["Question"]] = relationship(
        back_populates="interview",
        cascade="all, delete-orphan",
    )
