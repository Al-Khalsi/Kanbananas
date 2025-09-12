"use client";
import { useState } from "react";
import ColumnHeader from "./ColumnHeader";
import TaskCard from "@/components/task/TaskCard";
import TaskModal from "@/components/task/TaskModal";

interface ColumnProps {
  columnId: number;
  columnTitle: string;
  color?: string;
  children?: React.ReactNode;
  onColorChange?: (color: string) => void;
  onDelete?: () => void;
  onTitleChange?: (newTitle: string) => void;
  onAddTask?: (task: {
    title: string;
    description: string;
    progress: number;
  }) => void;
  onTaskDelete?: (taskId: number) => void;
  tasks?: Array<{
    id: number;
    title: string;
    description: string;
    progress: number;
  }>;
  onTaskUpdate?: (
    taskId: number,
    updates: { title?: string; description?: string; progress?: number }
  ) => void;
}

const Column = ({
  columnId,
  columnTitle,
  color,
  onColorChange,
  onDelete,
  onTitleChange,
  onAddTask,
  onTaskDelete,
  tasks = [],
  onTaskUpdate,
}: ColumnProps) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<{
    id: number;
    title: string;
    description: string;
    progress: number;
  } | null>(null);
  const backgroundColor = color ? `rgba(${color}, 0.1)` : "rgba(0, 0, 0, 0.1)";

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleSaveTask = (taskData: {
    title: string;
    description: string;
    progress: number;
  }) => {
    if (editingTask) {
      onTaskUpdate?.(editingTask.id, taskData);
    } else {
      onAddTask?.(taskData);
    }
    setShowTaskModal(false);
  };

  const handleTaskClick = (task: {
    id: number;
    title: string;
    description: string;
    progress: number;
  }) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  return (
    <>
      <div
        className="relative flex-none px-3 py-3 me-3 mb-4 box-content w-65 rounded-lg shadow-md"
        style={{ backgroundColor }}
      >
        <ColumnHeader
          columnId={columnId}
          columnTitle={columnTitle}
          color={color}
          onColorChange={onColorChange}
          onDelete={onDelete}
          onTitleChange={onTitleChange}
        />

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => handleTaskClick(task)}
            color={color || "0, 0, 0"}
          />
        ))}

        <button
          onClick={handleAddTask}
          className="w-full flex items-center justify-center p-2 rounded cursor-pointer transition-colors"
          style={{
            color: `rgb(${color || "0, 0, 0"})`,
            border: `1px solid rgba(${color || "0, 0, 0"}, 0.5)`,
            backgroundColor: `rgba(${color || "0, 0, 0"}, 0.1)`,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = `rgba(${
              color || "0, 0, 0"
            }, 0.2)`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = `rgba(${
              color || "0, 0, 0"
            }, 0.1)`;
          }}
        >
          + New Task
        </button>
      </div>

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSave={handleSaveTask}
        onDelete={
          editingTask && onTaskDelete
            ? () => onTaskDelete(editingTask.id)
            : undefined
        }
        task={editingTask || undefined}
        columnColor={color || "0, 0, 0"}
      />
    </>
  );
};

export default Column;
