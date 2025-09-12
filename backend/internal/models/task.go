// Package models. task provides the task model for the Kanban application.
package models

import "time"

// Task represents a task in a Kanban column
type Task struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Title       string    `gorm:"not null" json:"title"`
	Description string    `json:"description"`
	Progress    int       `json:"progress"` // 0-100
	ColumnID    uint      `json:"column_id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
