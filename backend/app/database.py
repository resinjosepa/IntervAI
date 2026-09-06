from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Interview, Question, Answer
from app.models.base import Base

class Settings(BaseSettings):
    database_url: str

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()

engine = create_engine(settings.database_url)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)

Base.metadata.create_all(bind=engine)
