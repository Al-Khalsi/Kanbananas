// Package database. db provides database connection and migration functionality.
package database

import (
	"fmt"
	"kanbananas/pkg/consts"
	"log"
	"os"

	"kanbananas/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// ConnectDB establishes a connection to the PostgreSQL database.
func ConnectDB() *gorm.DB {
	// Get database connection details from environment variables
	host := os.Getenv(consts.EnvDBHost)
	user := os.Getenv(consts.EnvDBUser)
	password := os.Getenv(consts.EnvDBPassword)
	dbname := os.Getenv(consts.EnvDBName)
	port := os.Getenv(consts.EnvDBPort)

	// Create the connection string
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=UTC",
		host, user, password, dbname, port)

	// Connect to the database
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	return db
}

// Migrate runs the database migrations.
func Migrate(db *gorm.DB) {
	err := db.AutoMigrate(&models.Column{}, &models.Task{})
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
}
