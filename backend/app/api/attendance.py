from fastapi import APIRouter, Depends
from uuid import uuid4

from app.schemas.attendance import AttendanceCreate
from app.db.database import get_connection

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("/")
async def mark_attendance(data: AttendanceCreate, conn=Depends(get_connection)):

    attendance_id = str(uuid4())

    await conn.execute(
        """
        INSERT INTO attendance(id, employee_id, date, status)
        VALUES($1,$2,$3,$4)
        """,
        attendance_id,
        data.employee_id,
        data.date,
        data.status,
    )

    return {"message": "Attendance marked"}

@router.get("/{employee_id}")
async def get_attendance(employee_id: str, conn=Depends(get_connection)):

    rows = await conn.fetch(
        """
        SELECT date, status
        FROM attendance
        WHERE employee_id = $1
        ORDER BY date DESC
        """,
        employee_id,
    )

    return [dict(row) for row in rows]