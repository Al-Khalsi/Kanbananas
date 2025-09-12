"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: {
    title: string;
    description: string;
    progress: number;
  }) => void;
  onDelete?: () => void;
  task?: { title: string; description: string; progress: number };
  columnColor: string;
}

const TaskModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  task,
  columnColor,
}: TaskModalProps) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [progress, setProgress] = useState(task?.progress || 0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setProgress(task.progress);
    } else {
      setTitle("");
      setDescription("");
      setProgress(0);
    }
  }, [task, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSave = () => {
    if (title.trim()) {
      onSave({ title, description, progress });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div ref={modalRef} className="bg-white w-96 h-full p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {task ? "Edit Task" : "New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <IoClose />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Task title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
            placeholder="Task description"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Progress
          </label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={progress === 0}
              onChange={() => setProgress(0)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="ml-2">Start (0%)</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={progress === 100}
              onChange={() => setProgress(100)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="ml-2">Done (100%)</span>
          </div>
        </div>
        <div className="flex gap-2">
          {task &&
            onDelete && (
              <button
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                className="flex-1 py-2 px-4 rounded-md text-white font-medium bg-red-600 hover:bg-red-700"
              >
                Delete Task
              </button>
            )}
          <button
            onClick={handleSave}
            className="w-full py-2 px-4 rounded-md text-white font-medium"
            style={{ backgroundColor: `rgba(${columnColor}, 0.8)` }}
          >
            {task ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
