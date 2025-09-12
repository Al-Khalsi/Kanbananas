// app/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Column from "@/components/column/Column";
import { IoMdAdd } from "react-icons/io";
import apiClient from "@/constants/axios";

// تعریف انواع داده‌ها
interface Task {
  id: number;
  title: string;
  description: string;
  progress: number;
  checkpoints?: Checkpoint[];
}

interface Checkpoint {
  label: string;
  checked: boolean;
}

interface Column {
  id: number;
  title: string;
  color: string;
  tasks: Task[];
}

export default function Home() {
  const [columns, setColumns] = useState<Column[]>([]);

  // دریافت داده‌ها از سرور هنگام لود کامپوننت
  useEffect(() => {
    fetchColumns();
  }, []);

  const fetchColumns = async () => {
    try {
      const response = await apiClient.get('/columns');
      setColumns(response.data);
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
            },
          ],
        },
      ]);
    }
  };

  const addColumn = async () => {
    try {
      const newId = columns.length > 0 ? Math.max(...columns.map((c) => c.id)) + 1 : 1;
      const newColumn = {
        id: newId,
        title: `Column ${newId}`,
        color: "0, 0, 0",
        tasks: [],
      };
      
      // ارسال به سرور
      await apiClient.post('/columns', newColumn);
      
      // به روزرسانی state
      setColumns([...columns, newColumn]);
    } catch (error) {
      console.error('Error adding column:', error);
    }
  };

  const updateColumnColor = async (id: number, color: string) => {
    try {
      await apiClient.patch(`/columns/${id}`, { color });
      setColumns(
        columns.map((column) =>
          column.id === id ? { ...column, color } : column
        )
      );
    } catch (error) {
      console.error('Error updating column color:', error);
    }
  };

  const updateColumnTitle = async (id: number, newTitle: string) => {
    try {
      await apiClient.patch(`/columns/${id}`, { title: newTitle });
      setColumns(
        columns.map((column) =>
          column.id === id ? { ...column, title: newTitle } : column
        )
      );
    } catch (error) {
      console.error('Error updating column title:', error);
    }
  };

  const deleteColumn = async (id: number) => {
    try {
      await apiClient.delete(`/columns/${id}`);
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
      const column = columns.find(c => c.id === columnId);
      if (!column) return;
      
      const newTaskId = column.tasks.length > 0
        ? Math.max(...column.tasks.map((t) => t.id)) + 1
        : 1;

      const newTask = { id: newTaskId, ...taskData };
      
      await apiClient.post(`/columns/${columnId}/tasks`, newTask);
      
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
      await apiClient.put(`/columns/${columnId}/tasks/${taskId}`, updates);
      
      setColumns(
        columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updates } : task
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
      await apiClient.delete(`/columns/${columnId}/tasks/${taskId}`);
      
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
              tasks={column.tasks}
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