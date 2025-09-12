// Package service. column_service provides core logic for column in kanban.
package service

import (
	"kanbananas/internal/models"
	"kanbananas/internal/repository"
)

// ColumnService handles business logic for Column entities.
type ColumnService struct{ repo *repository.ColumnRepository }

// NewColumnService creates a new ColumnService.
func NewColumnService(repo *repository.ColumnRepository) *ColumnService {
	return &ColumnService{repo: repo}
}

// ------------------------------------ Public Functions ------------------------------------

// CreateColumn creates a new column.
func (columnService *ColumnService) CreateColumn(title, color string) (*models.Column, error) {
	column := &models.Column{
		Title: title,
		Color: color,
	}

	err := columnService.repo.Create(column)
	if err != nil {
		return nil, err
	}

	return column, nil
}

// GetAllColumns retrieves all columns.
func (columnService *ColumnService) GetAllColumns() ([]models.Column, error) {
	return columnService.repo.GetAll()
}

// GetColumnByID retrieves a column by its ID.
func (columnService *ColumnService) GetColumnByID(id uint) (*models.Column, error) {
	return columnService.repo.GetByID(id)
}

// UpdateColumn updates an existing column.
func (columnService *ColumnService) UpdateColumn(id uint, title, color string) (*models.Column, error) {
	column, err := columnService.repo.GetByID(id)
	if err != nil {
		return nil, err
	}

	column.Title = title
	column.Color = color

	err = columnService.repo.Update(column)
	if err != nil {
		return nil, err
	}

	return column, nil
}

// DeleteColumn removes a column.
func (columnService *ColumnService) DeleteColumn(id uint) error {
	return columnService.repo.Delete(id)
}
