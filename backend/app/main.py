from fastapi import FastAPI

from app.routers.interviews import router as interviews_router


app = FastAPI(title="IntervAI Backend")

app.include_router(interviews_router)


@app.get("/")
def root():
    return {"message": "IntervAI backend is running"}
