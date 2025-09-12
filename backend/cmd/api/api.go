// Package api. api registers endpoint handlers to gin.Engine.
package api

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"kanbananas/internal/handlers"
	"kanbananas/internal/repository"
	"kanbananas/internal/service"
)

// ------------------------------------ Public Functions ------------------------------------

// RegisterRoutes registers gin.Engine routes and returns the router.
func RegisterRoutes(db *gorm.DB) *gin.Engine {
	router := gin.Default()
	router.Use(registerMiddlewares())

	registerColumnHandler(db, router)
	registerTaskHandler(db, router)

	return router
}

// ------------------------------------ Private Helper Functions ------------------------------------

// registerMiddlewares registers all middlewares for the application.
func registerMiddlewares() gin.HandlerFunc {
	return func(c *gin.Context) {
		logMiddleware(c)

		c.Next()
	}
}

// registerColumnHandler registers routes of handlers.ColumnHandler.
func registerColumnHandler(db *gorm.DB, router *gin.Engine) *handlers.ColumnHandler {
	columnService := service.NewColumnService(repository.NewColumnRepository(db))

	columnHandler := handlers.NewColumnHandler(columnService)
	router.POST("/columns", columnHandler.CreateColumn)
	router.GET("/columns", columnHandler.GetColumns)
	router.GET("/columns/:id", columnHandler.GetColumn)
	router.PUT("/columns/:id", columnHandler.UpdateColumn)
	router.DELETE("/columns/:id", columnHandler.DeleteColumn)

	return columnHandler
}

// registerTaskHandler registers routes of handlers.TaskHandler.
func registerTaskHandler(db *gorm.DB, router *gin.Engine) *handlers.TaskHandler {
	taskService := service.NewTaskService(repository.NewTaskRepository(db))

	taskHandler := handlers.NewTaskHandler(taskService)
	router.POST("/tasks", taskHandler.CreateTask)
	router.GET("/tasks/:id", taskHandler.GetTask)
	router.PUT("/tasks/:id", taskHandler.UpdateTask)
	router.DELETE("/tasks/:id", taskHandler.DeleteTask)
	router.GET("/columns/:id/tasks", taskHandler.GetTasksByColumn)

	return taskHandler
}
