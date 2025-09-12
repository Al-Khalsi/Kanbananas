# Kanbananas Backend

This is the backend for the Kanbananas application, built with Go, Gin, GORM, and PostgreSQL.

## Project Structure

```
backend/
├── cmd/
│   └── main.go          # Application entry point
├── internal/
│   ├── database/        # Database connection and migration
│   ├── handlers/        # HTTP handlers
│   ├── models/          # Database models
│   ├── repository/      # Database operations (CRUD)
│   └── service/         # Business logic
├── pkg/                 # Shared utilities (if any)
├── .env                 # Environment variables
├── go.mod               # Go module file
└── go.sum               # Go checksum file
```

## Setup

1. Install Go (1.19 or later)
2. Install PostgreSQL
3. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE kanbananas;
   ```
4. Update the `.env` file with your database credentials
5. Install dependencies:
   ```bash
   go mod tidy
   ```
6. Run the application:
   ```bash
   go run cmd/main.go
   ```

## API Endpoints

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

## Database Schema

### Columns
- id (uint, primary key)
- title (string, not null)
- color (string)
- created_at (timestamp)
- updated_at (timestamp)

### Tasks
- id (uint, primary key)
- title (string, not null)
- description (string)
- progress (int)
- column_id (uint, foreign key to columns)
- created_at (timestamp)
- updated_at (timestamp)