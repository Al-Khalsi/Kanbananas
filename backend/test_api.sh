#!/bin/bash

# Test script for Kanbananas API

echo "Testing Kanbananas API"

# Start the server in the background
echo "Starting server..."
go run cmd/main.go &

# Give the server a moment to start
sleep 3

# Test creating a column
echo "Creating a column..."
curl -X POST http://localhost:8080/columns \
  -H "Content-Type: application/json" \
  -d '{"title": "To Do", "color": "255, 0, 0"}'

echo ""

# Test getting all columns
echo "Getting all columns..."
curl -X GET http://localhost:8080/columns

echo ""

# Test creating a task
echo "Creating a task..."
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Task", "description": "This is a test task", "progress": 0, "column_id": 1}'

echo ""

# Test getting all tasks for a column
echo "Getting tasks for column 1..."
curl -X GET http://localhost:8080/columns/1/tasks

echo ""

# Stop the server
echo "Stopping server..."
pkill -f "go run cmd/main.go"

echo "Test completed."