"use client";
import React, { useState, useEffect } from "react";
import Column from "@/components/column/Column";
import { IoMdAdd } from "react-icons/io";
import { ColumnAPI, TaskAPI, Column as ColumnType, Task as TaskType } from "@/api/apiClient";

interface Checkpoint {
  label: string;
  checked: boolean;
}

export default function Home() {
  const [columns, setColumns] = useState<ColumnType[]>([]);

  useEffect(() => {
    fetchColumns();
  }, []);

  const fetchColumns = async () => {
    try {
      const fetchedColumns = await ColumnAPI.getAll();
      
      // Fetch tasks for each column
      const columnsWithTasks = await Promise.all(
        fetchedColumns.map(async (column) => {
          const tasks = await TaskAPI.getByColumnId(column.id);
          return { ...column, tasks };
        })
      );
      
      setColumns(columnsWithTasks);
    } catch (error) {
      console.error('Error fetching columns:', error);
      // حالت fallback برای زمانی که سرور در دسترس نیست
      setColumns([
        {
          id: 1,
          title: "Column 1",
          color: "0, 0, 0",
          tasks: [
            {
              id: 1,
              title: "Sample Task",
              description: "This is a sample task",
              progress: 0,
              column_id: 1,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    }
  };

  const addColumn = async () => {
    try {
      const newColumn = await ColumnAPI.create({
        title: `Column ${columns.length + 1}`,
        color: "0, 0, 0",
      });
      
      // Add the new column with empty tasks array
      setColumns([...columns, { ...newColumn, tasks: [] }]);
    } catch (error) {
      console.error('Error adding column:', error);
    }
  };

  const updateColumnColor = async (id: number, color: string) => {
    try {
      const updatedColumn = await ColumnAPI.update(id, { 
        title: columns.find(c => c.id === id)?.title || `Column ${id}`,
        color 
      });
      
      setColumns(
        columns.map((column) =>
          column.id === id ? { ...column, ...updatedColumn } : column
        )
      );
    } catch (error) {
      console.error('Error updating column color:', error);
    }
  };

  const updateColumnTitle = async (id: number, newTitle: string) => {
    try {
      const updatedColumn = await ColumnAPI.update(id, { 
        title: newTitle,
        color: columns.find(c => c.id === id)?.color || "0, 0, 0"
      });
      
      setColumns(
        columns.map((column) =>
          column.id === id ? { ...column, ...updatedColumn } : column
        )
      );
    } catch (error) {
      console.error('Error updating column title:', error);
    }
  };

  const deleteColumn = async (id: number) => {
    try {
      await ColumnAPI.delete(id);
      setColumns(columns.filter((column) => column.id !== id));
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  const addTaskToColumn = async (
    columnId: number,
    taskData: { title: string; description: string; progress: number; checkpoints?: Checkpoint[] }
  ) => {
    try {
      const newTask = await TaskAPI.create({
        title: taskData.title,
        description: taskData.description,
        progress: taskData.progress,
        column_id: columnId,
      });
      
      setColumns(
        columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: [...column.tasks, newTask],
            };
          }
          return column;
        })
      );
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTaskInColumn = async (
    columnId: number,
    taskId: number,
    updates: { title?: string; description?: string; progress?: number; checkpoints?: Checkpoint[] }
  ) => {
    try {
      const updatedTask = await TaskAPI.update(taskId, {
        title: updates.title,
        description: updates.description,
        progress: updates.progress,
      });
      
      setColumns(
        columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
              ),
            };
          }
          return column;
        })
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTaskFromColumn = async (columnId: number, taskId: number) => {
    try {
      await TaskAPI.delete(taskId);
      
      setColumns(
        columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            };
          }
          return column;
        })
      );
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Task Management System
        </h1>

        <div className="flex overflow-x-auto pb-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              columnId={column.id}
              columnTitle={column.title}
              color={column.color}
              onColorChange={(color) => updateColumnColor(column.id, color)}
              onDelete={() => deleteColumn(column.id)}
              onTitleChange={(newTitle) =>
                updateColumnTitle(column.id, newTitle)
              }
              onAddTask={(taskData) => addTaskToColumn(column.id, taskData)}
              onTaskUpdate={(taskId, updates) =>
                updateTaskInColumn(column.id, taskId, updates)
              }
              onTaskDelete={(taskId) => deleteTaskFromColumn(column.id, taskId)}
              tasks={column.tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                progress: task.progress,
              }))}
            />
          ))}

          <button
            onClick={addColumn}
            className={`flex-none flex flex-col items-center justify-center p-2 me-3 mb-4 
              box-content w-65 h-80 text-4xl rounded-xl transition-colors border-2 
              border-gray-300 text-gray-500 border-dashed cursor-pointer
              hover:border-black hover:text-black `}
          >
            <IoMdAdd />
          </button>
        </div>
      </div>
    </div>
  );
}