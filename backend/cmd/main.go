// Package main. main is the entry point for the Kanbananas application.
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"kanbananas/cmd/api"
	"kanbananas/internal/database"
	"kanbananas/pkg/consts"
	"kanbananas/pkg/logger"
	"os"

	"github.com/joho/godotenv"
)

var db *gorm.DB

func init() {
	if err := godotenv.Load(); err != nil {
		panic(fmt.Errorf("failed to load env variables: %w", err))
	}
	db = database.ConnectDB()
	database.Migrate(db)
}

func main() {
	gin.ForceConsoleColor()
	router := api.RegisterRoutes(db)

	// Get port from environment variable or default to 8080
	port := os.Getenv(consts.EnvPort)
	if port == "" {
		port = consts.DefaultHttpPort
	}

	logger.Log.Printf("Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		logger.Log.Fatal("Failed to start server:", err)
	}
}
