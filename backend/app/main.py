from fastapi import FastAPI

app = FastAPI(title="IntervAI Backend")


@app.get("/")
def root():
    return {"message": "IntervAI backend is running"}
