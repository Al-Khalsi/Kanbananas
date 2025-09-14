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
	router.Use(corsMiddleware)
	router.Use(RegisterMiddlewares())

	baseUrlApi := router.Group("/pm/api")
	registerColumnHandler(db, baseUrlApi)
	registerTaskHandler(db, baseUrlApi)

	return router
}

// ------------------------------------ Private Helper Functions ------------------------------------

// registerColumnHandler registers routes of handlers.ColumnHandler.
func registerColumnHandler(db *gorm.DB, group *gin.RouterGroup) *handlers.ColumnHandler {
	columnService := service.NewColumnService(repository.NewColumnRepository(db))

	columnHandler := handlers.NewColumnHandler(columnService)
	group.POST("/columns", columnHandler.CreateColumn)
	group.GET("/columns", columnHandler.GetColumns)
	group.GET("/columns/:id", columnHandler.GetColumn)
	group.PUT("/columns/:id", columnHandler.UpdateColumn)
	group.DELETE("/columns/:id", columnHandler.DeleteColumn)

	return columnHandler
}

// registerTaskHandler registers routes of handlers.TaskHandler.
func registerTaskHandler(db *gorm.DB, group *gin.RouterGroup) *handlers.TaskHandler {
	taskService := service.NewTaskService(repository.NewTaskRepository(db))

	taskHandler := handlers.NewTaskHandler(taskService)
	group.POST("/tasks", taskHandler.CreateTask)
	group.GET("/tasks/:id", taskHandler.GetTask)
	group.PUT("/tasks/:id", taskHandler.UpdateTask)
	group.DELETE("/tasks/:id", taskHandler.DeleteTask)
	group.GET("/columns/:id/tasks", taskHandler.GetTasksByColumn)

	return taskHandler
}
