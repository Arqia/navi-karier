from fastapi import FastAPI
from .database import engine, Base
from .api.routes import router as api_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="NaviKarier API")

app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to NaviKarier API"}
