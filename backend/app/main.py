from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.interviews import router as interviews_router


app = FastAPI(title="IntervAI Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(interviews_router)


@app.get("/")
def root():
    return {"message": "IntervAI backend is running"}
