from fastapi import FastAPI
from app.db.database import init_db, close_db
from app.api import employees

app = FastAPI(title="HRMS Lite")

app.include_router(employees.router)


@app.on_event("startup")
async def startup():
    await init_db()


@app.on_event("shutdown")
async def shutdown():
    await close_db()


@app.get("/")
async def root():
    return {"message": "HRMS API running"}