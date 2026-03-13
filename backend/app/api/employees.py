from fastapi import APIRouter, Depends, HTTPException
from uuid import uuid4

from app.schemas.employee import EmployeeCreate
from app.db.database import get_connection

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post("/")
async def create_employee(data: EmployeeCreate, conn=Depends(get_connection)):

    try:
        employee_id = str(uuid4())

        await conn.execute(
            """
            INSERT INTO employees(id, employee_id, full_name, email, department)
            VALUES($1,$2,$3,$4,$5)
            """,
            employee_id,
            data.employee_id,
            data.full_name,
            data.email,
            data.department,
        )

        return {"message": "Employee created"}

    except Exception:
        raise HTTPException(status_code=400, detail="Employee already exists")
    

@router.get("/")
async def list_employees(conn=Depends(get_connection)):

    rows = await conn.fetch(
        """
        SELECT id, employee_id, full_name, email, department
        FROM employees
        ORDER BY created_at DESC
        """
    )

    return [dict(row) for row in rows]


@router.delete("/{employee_id}")
async def delete_employee(employee_id: str, conn=Depends(get_connection)):

    result = await conn.execute(
        """
        DELETE FROM employees
        WHERE id = $1
        """,
        employee_id,
    )

    if result == "DELETE 0":
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"message": "Employee deleted"}