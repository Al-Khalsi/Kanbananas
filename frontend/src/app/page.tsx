"use client";
import React, { useState } from "react";
import Column from "@/components/column/Column";
import { IoMdAdd } from "react-icons/io";

export default function Home() {
  const [columns, setColumns] = useState([
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

  const addColumn = () => {
    const newId =
      columns.length > 0 ? Math.max(...columns.map((c) => c.id)) + 1 : 1;
    setColumns([
      ...columns,
      {
        id: newId,
        title: `Column ${newId}`,
        color: "0, 0, 0",
        tasks: [],
      },
    ]);
  };

  const updateColumnColor = (id: number, color: string) => {
    setColumns(
      columns.map((column) =>
        column.id === id ? { ...column, color } : column
      )
    );
  };

  const updateColumnTitle = (id: number, newTitle: string) => {
    setColumns(
      columns.map((column) =>
        column.id === id ? { ...column, title: newTitle } : column
      )
    );
  };

  const deleteColumn = (id: number) => {
    setColumns(columns.filter((column) => column.id !== id));
  };

  const addTaskToColumn = (
    columnId: number,
    taskData: { title: string; description: string; progress: number }
  ) => {
    setColumns(
      columns.map((column) => {
        if (column.id === columnId) {
          const newTaskId =
            column.tasks.length > 0
              ? Math.max(...column.tasks.map((t) => t.id)) + 1
              : 1;

          return {
            ...column,
            tasks: [...column.tasks, { id: newTaskId, ...taskData }],
          };
        }
        return column;
      })
    );
  };

  const updateTaskInColumn = (
    columnId: number,
    taskId: number,
    updates: { title?: string; description?: string; progress?: number }
  ) => {
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
  };

  const deleteTaskFromColumn = (columnId: number, taskId: number) => {
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
