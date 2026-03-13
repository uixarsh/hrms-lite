from fastapi import APIRouter, Depends
from app.db.database import get_connection

router = APIRouter(prefix="/employees", tags=["employees"])

@router.get("/")
async def list_employees(conn=Depends(get_connection)):

    rows = await conn.fetch(
        "SELECT * FROM employees ORDER BY created_at DESC"
    )

    return [dict(row) for row in rows]