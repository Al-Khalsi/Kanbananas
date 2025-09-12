// Package repository. column_repository provides the database operations for the Kanban application.
package repository

import (
	"kanbananas/internal/models"

	"gorm.io/gorm"
)

// ColumnRepository handles database operations for Column entities
type ColumnRepository struct{ db *gorm.DB }

// NewColumnRepository creates a new ColumnRepository
func NewColumnRepository(db *gorm.DB) *ColumnRepository {
	return &ColumnRepository{db: db}
}

// ------------------------------------ Public Functions ------------------------------------

// Create inserts a new column into the database.
func (columnRepository *ColumnRepository) Create(column *models.Column) error {
	return columnRepository.db.Create(column).Error
}

// GetAll retrieves all columns from the database.
func (columnRepository *ColumnRepository) GetAll() ([]models.Column, error) {
	var columns []models.Column
	err := columnRepository.db.Preload("Tasks").Find(&columns).Error
	return columns, err
}

// GetByID retrieves a column by its ID.
func (columnRepository *ColumnRepository) GetByID(id uint) (*models.Column, error) {
	var column models.Column
	err := columnRepository.db.Preload("Tasks").First(&column, id).Error
	return &column, err
}

// Update modifies an existing column.
func (columnRepository *ColumnRepository) Update(column *models.Column) error {
	return columnRepository.db.Save(column).Error
}

// Delete removes a column from the database.
func (columnRepository *ColumnRepository) Delete(id uint) error {
	return columnRepository.db.Delete(&models.Column{}, id).Error
}
