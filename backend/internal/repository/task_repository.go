// Package repository. task_repository provides the database operations for the Kanban application.
package repository

import (
	"kanbananas/internal/models"

	"gorm.io/gorm"
)

// TaskRepository handles database operations for Task entities.
type TaskRepository struct{ db *gorm.DB }

// NewTaskRepository creates a new TaskRepository.
func NewTaskRepository(db *gorm.DB) *TaskRepository {
	return &TaskRepository{db: db}
}

// ------------------------------------ Public Functions ------------------------------------

// Create inserts a new task into the database.
func (taskRepository *TaskRepository) Create(task *models.Task) error {
	return taskRepository.db.Create(task).Error
}

// GetByID retrieves a task by its ID.
func (taskRepository *TaskRepository) GetByID(id uint) (*models.Task, error) {
	var task models.Task
	err := taskRepository.db.First(&task, id).Error
	return &task, err
}

// Update modifies an existing task.
func (taskRepository *TaskRepository) Update(task *models.Task) error {
	return taskRepository.db.Save(task).Error
}

// Delete removes a task from the database.
func (taskRepository *TaskRepository) Delete(id uint) error {
	return taskRepository.db.Delete(&models.Task{}, id).Error
}

// GetTasksByColumnID retrieves all tasks for a specific column.
func (taskRepository *TaskRepository) GetTasksByColumnID(columnID uint) ([]models.Task, error) {
	var tasks []models.Task
	err := taskRepository.db.Where("column_id = ?", columnID).Find(&tasks).Error
	return tasks, err
}
