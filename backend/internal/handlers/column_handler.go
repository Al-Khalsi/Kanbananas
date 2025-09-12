// Package handlers. column_handler provides HTTP handlers for column in Kanban application.
package handlers

import (
	"net/http"
	"strconv"

	"kanbananas/internal/models"
	"kanbananas/internal/service"

	"github.com/gin-gonic/gin"
)

// ColumnHandler handles HTTP requests for Column entities
type ColumnHandler struct{ service *service.ColumnService }

// NewColumnHandler creates a new ColumnHandler
func NewColumnHandler(service *service.ColumnService) *ColumnHandler {
	return &ColumnHandler{service: service}
}

// ------------------------------------ Public Functions ------------------------------------

// CreateColumn handles POST /columns to create a new column
func (h *ColumnHandler) CreateColumn(c *gin.Context) {
	var input struct {
		Title string `json:"title" binding:"required"`
		Color string `json:"color"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	column, err := h.service.CreateColumn(input.Title, input.Color)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, column)
}

// GetColumns handles GET /columns to retrieve all columns
func (h *ColumnHandler) GetColumns(c *gin.Context) {
	columns, err := h.service.GetAllColumns()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, columns)
}

// GetColumn handles GET /columns/:id to retrieve a specific column
func (h *ColumnHandler) GetColumn(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid column ID"})
		return
	}

	column, err := h.service.GetColumnByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Column not found"})
		return
	}

	c.JSON(http.StatusOK, column)
}

// UpdateColumn handles PUT /columns/:id to update a column
func (h *ColumnHandler) UpdateColumn(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid column ID"})
		return
	}

	var input models.Column
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	column, err := h.service.UpdateColumn(uint(id), input.Title, input.Color)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Column not found"})
		return
	}

	c.JSON(http.StatusOK, column)
}

// DeleteColumn handles DELETE /columns/:id to remove a column
func (h *ColumnHandler) DeleteColumn(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid column ID"})
		return
	}

	if err := h.service.DeleteColumn(uint(id)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Column not found"})
		return
	}

	c.Status(http.StatusNoContent)
}
