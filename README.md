# HRMS Lite

A lightweight Human Resource Management System (HRMS) application with a FastAPI backend and React frontend. It allows managing employees and tracking attendance.

## Features

- Employee management (add, view, update employees)
- Attendance tracking
- RESTful API backend
- Modern React frontend with routing

## Prerequisites

- **Node.js** (version 18 or higher) - for the frontend
- **Python** (version 3.8 or higher) - for the backend
- **Docker and Docker Compose** - for running PostgreSQL and the backend API (optional but recommended for easy setup)
- **Git** - to clone the repository

## Installation and Setup

### 1. Clone the Repository

```bash
git clone git@github.com:uixarsh/hrms-lite.git
cd hrms-lite
```

### 2. Backend Setup

The backend uses FastAPI and PostgreSQL. You can run it with Docker Compose for simplicity.

#### Using Docker Compose (Recommended)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file in the `backend` directory with your database URL:
   ```
   DATABASE_URL=postgresql://hrms:hrms@localhost:5432/hrms
   ```

3. Start the services (PostgreSQL and API):
   ```bash
   docker-compose up --build
   ```

   This will:
   - Start a PostgreSQL database on port 5432
   - Build and run the FastAPI API server on port 8000
   - Initialize the database schema from `app/db/schema.sql`

#### Manual Setup (Without Docker)

If you prefer not to use Docker:

1. Install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Set up PostgreSQL manually (ensure it's running on port 5432 with the credentials from docker-compose.yml).

3. Create a `.env` file as above.

4. Run the API:
   ```bash
   uvicorn app.main:app --reload
   ```

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` (default Vite port).

## Usage

- **API Documentation**: Visit `http://localhost:8000/docs` for interactive Swagger UI documentation of the API endpoints.
- **Frontend**: Open `http://localhost:5173` in your browser to access the web interface.
- **API Endpoints**:
  - `GET /` - Health check
  - Employee endpoints (under `/api/employees`)
  - Attendance endpoints (under `/api/attendance`)

## Project Structure

- `backend/` - FastAPI application
  - `app/main.py` - Main application entry point
  - `app/api/` - API routers for employees and attendance
  - `app/db/` - Database connection and schema
  - `app/models/` - Data models (if any)
  - `app/schemas/` - Pydantic schemas
- `frontend/` - React application
  - `src/App.jsx` - Main app component
  - `src/pages/` - Page components (Employees, Attendance)
  - `src/components/` - Reusable UI components
  - `src/api/client.js` - API client for backend communication

## Development

- **Backend**: Make changes in `backend/app/`, restart the server if not using `--reload`.
- **Frontend**: Changes are hot-reloaded automatically with Vite.
- **Linting**: Run `npm run lint` in the frontend directory.