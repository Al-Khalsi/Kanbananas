# Makefile for Kanbananas backend

BINARY=kanbananas
MAIN_FILE=cmd/main.go
BINARY_DIR=bin

# Default target
.PHONY: all
all: build

# Build the application
.PHONY: build
build:
	go build -o $(BINARY_DIR)/$(BINARY) $(MAIN_FILE)

# Run the application
.PHONY: run
run:
	go run $(MAIN_FILE)

# Install dependencies
.PHONY: deps
deps:
	go mod tidy

# Clean build artifacts
.PHONY: clean
clean:
	rm -f $(BINARY_DIR)/$(BINARY)

# Run tests
.PHONY: test
test:
	go test ./...

# Run the test script
.PHONY: test-api
test-api:
	./test_api.sh