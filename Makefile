# Makefile for Kanbananas

# Default target
.PHONY: all
all: build

# -------------------------------------------- Backend Targets --------------------------------------------

# Build the backend application
.PHONY: build
build:
	cd backend && go build -o bin/kanbananas cmd/main.go

# Run the backend application
.PHONY: run-backend
run-backend:
	cd backend && go run cmd/main.go

# Install backend dependencies
.PHONY: deps-backend
deps-backend:
	cd backend && go mod tidy

# Clean backend build artifacts
.PHONY: clean-backend
clean-backend:
	rm -f backend/bin/kanbananas

# Run backend tests
.PHONY: test-backend
test-backend:
	cd backend && go test ./...

# Run the backend test script
.PHONY: test-api
test-api:
	cd backend && ./test_api.sh

# -------------------------------------------- Frontend Targets --------------------------------------------

# Install frontend dependencies
.PHONY: deps-frontend
deps-frontend:
	cd frontend && npm install

# Run the frontend application
.PHONY: run-frontend
run-frontend:
	cd frontend && npm run dev

# Build the frontend application
.PHONY: build-frontend
build-frontend:
	cd frontend && npm run build

# -------------------------------------------- Combined Targets --------------------------------------------

# Run both frontend and backend
.PHONY: run-all
run-all: run-backend run-frontend

# Install all dependencies
.PHONY: deps-all
deps-all: deps-backend deps-frontend