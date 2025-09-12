// Package models. column provides the column model for the Kanban application.
package models

import (
	"time"
)

// Column represents a Kanban column.
type Column struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Title     string    `gorm:"not null" json:"title"`
	Color     string    `json:"color"`
	Tasks     []Task    `gorm:"foreignKey:ColumnID" json:"tasks"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
