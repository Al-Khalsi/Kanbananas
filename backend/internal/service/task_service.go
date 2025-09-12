// Package service. task_service provides core business logic for task in Kanban application.
package service

import (
	"kanbananas/internal/models"
	"kanbananas/internal/repository"
)

// TaskService handles business logic for Task entities.
type TaskService struct{ repo *repository.TaskRepository }

// NewTaskService creates a new TaskService.
func NewTaskService(repo *repository.TaskRepository) *TaskService {
	return &TaskService{repo: repo}
}

// ------------------------------------ Public Functions ------------------------------------

// CreateTask creates a new task.
func (s *TaskService) CreateTask(title, description string, progress int, columnID uint) (*models.Task, error) {
	task := &models.Task{
		Title:       title,
		Description: description,
		Progress:    progress,
		ColumnID:    columnID,
	}

	err := s.repo.Create(task)
	if err != nil {
		return nil, err
	}

	return task, nil
}

// GetTaskByID retrieves a task by its ID.
func (s *TaskService) GetTaskByID(id uint) (*models.Task, error) {
	return s.repo.GetByID(id)
}

// UpdateTask updates an existing task.
func (s *TaskService) UpdateTask(id uint, title, description string, progress int) (*models.Task, error) {
	task, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}

	if title != "" {
		task.Title = title
	}

	if description != "" {
		task.Description = description
	}

	task.Progress = progress

	err = s.repo.Update(task)
	if err != nil {
		return nil, err
	}

	return task, nil
}

// DeleteTask removes a task.
func (s *TaskService) DeleteTask(id uint) error {
	return s.repo.Delete(id)
}

// GetTasksByColumnID retrieves all tasks for a specific column.
func (s *TaskService) GetTasksByColumnID(columnID uint) ([]models.Task, error) {
	return s.repo.GetTasksByColumnID(columnID)
}
