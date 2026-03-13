from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import init_db, close_db
from app.api import employees
from app.api import attendance

app = FastAPI(title="HRMS Lite API")


# CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers
app.include_router(employees.router)
app.include_router(attendance.router)


@app.on_event("startup")
async def startup():
    print("Starting HRMS API...")
    await init_db()


@app.on_event("shutdown")
async def shutdown():
    print("Shutting down HRMS API...")
    await close_db()


@app.get("/")
async def root():
    return {"message": "HRMS API running"}