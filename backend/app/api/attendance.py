from fastapi import APIRouter, Depends, HTTPException
from uuid import uuid4
from asyncpg.exceptions import UniqueViolationError

from app.schemas.attendance import AttendanceCreate
from app.db.database import get_connection

router = APIRouter(prefix="/attendance", tags=["Attendance"])


# Mark attendance
@router.post("/")
async def mark_attendance(data: AttendanceCreate, conn=Depends(get_connection)):

    attendance_id = str(uuid4())

    try:
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

        return {"message": "Attendance marked successfully"}

    except UniqueViolationError:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this employee today"
        )


# Get attendance for a specific employee
@router.get("/employee/{employee_id}")
async def get_employee_attendance(employee_id: str, conn=Depends(get_connection)):

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


# Get all attendance records (used by dashboard table)
@router.get("/")
async def list_attendance(conn=Depends(get_connection)):

    rows = await conn.fetch(
        """
        SELECT 
            attendance.id,
            attendance.date,
            attendance.status,
            employees.full_name AS employee_name
        FROM attendance
        JOIN employees
        ON attendance.employee_id = employees.id
        ORDER BY attendance.date DESC
        """
    )

    return [dict(row) for row in rows]