# Kanbananas - Full Stack Project Management Tool

Kanbananas is a simple project management tool built with a Go backend and Next.js frontend.

## Project Structure

- `backend/` - Go backend with Gin, GORM, and PostgreSQL
- `frontend/` - Next.js frontend with React and Tailwind CSS
- `Makefile` - Build and run scripts for both frontend and backend
- `test_api.sh` - Script to test backend API endpoints

## Features

- Create and manage Kanban boards
- Add columns to organize tasks
- Create, update, and delete tasks
- Track task progress
- Customize column colors

## Backend

The backend is built with:
- Go programming language
- Gin web framework
- GORM ORM for database operations
- PostgreSQL database

For detailed information about the backend, check [backend/README.md](backend/README.md).

## Frontend

The frontend is built with:
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript

For detailed information about the frontend, check [frontend/README.md](frontend/README.md).

## Getting Started

### Using Makefile (Recommended)

1. Install dependencies for both frontend and backend:
   ```bash
   make deps-all
   ```

2. Run both frontend and backend:
   ```bash
   make run-all
   ```

### Manual Setup

#### Backend

1. Install Go (1.19 or later)
2. Install PostgreSQL
3. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE kanbananas;
   ```
4. Update the `backend/.env` file with your database credentials
5. Install dependencies:
   ```bash
   make deps-backend
   ```
   or
   ```bash
   cd backend && go mod tidy
   ```
6. Run the application:
   ```bash
   make run-backend
   ```
   or
   ```bash
   cd backend && go run cmd/main.go
   ```

#### Frontend

1. Install Node.js (18 or later)
2. Install dependencies:
   ```bash
   make deps-frontend
   ```
   or
   ```bash
   cd frontend && npm install
   ```
3. Run the development server:
   ```bash
   make run-frontend
   ```
   or
   ```bash
   cd frontend && npm run dev
   ```

## API Endpoints

The backend exposes a REST API for managing columns and tasks:

### Columns
- `POST /columns` - Create a new column
- `GET /columns` - Get all columns
- `GET /columns/:id` - Get a specific column
- `PUT /columns/:id` - Update a column
- `DELETE /columns/:id` - Delete a column

### Tasks
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a specific task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `GET /columns/:id/tasks` - Get all tasks for a column

## Testing

To test the API endpoints, you can:
1. Run the test script:
   ```bash
   make test-api
   ```
   or
   ```bash
   ./test_api.sh
   ```
2. Or manually test with curl commands as shown in the test script.