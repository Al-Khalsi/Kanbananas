
"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface Checkpoint {
  label: string;
  checked: boolean;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: {
    title: string;
    description: string;
    progress: number;
    checkpoints?: Checkpoint[];
  }) => void;
  onDelete?: () => void;
  task?: { title: string; description: string; progress: number; checkpoints?: Checkpoint[] };
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
  const [checkpoints, setCheckpoints] = useState<{ label: string; checked: boolean; disabled?: boolean }[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      if (task.checkpoints) {
        setCheckpoints(
          task.checkpoints.map((cp, index) => ({
            ...cp,
            disabled: index === 0,
          }))
        );
      } else {
        setCheckpoints([
          { label: "Start", checked: true, disabled: true },
          { label: "Done", checked: task.progress === 100, disabled: false },
        ]);
      }
    } else {
      setTitle("");
      setDescription("");
      setCheckpoints([
        { label: "Start", checked: true, disabled: true },
        { label: "Done", checked: false, disabled: false },
      ]);
    }
  }, [task, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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

  const getPercent = (index: number) => {
    if (checkpoints.length <= 1) return 0;
    return Math.round((index * 100) / (checkpoints.length - 1));
  };

  const handleCheckboxChange = (index: number) => {
    if (index === 0) return;
    setCheckpoints((prev) =>
      prev.map((cp, i) => (i === index ? { ...cp, checked: !cp.checked } : cp))
    );
  };

  const handleAddCheckpoint = () => {
    if (!newLabel.trim()) return;
    setCheckpoints((prev) => [
      ...prev.slice(0, -1),
      { label: newLabel, checked: false, disabled: false },
      prev[prev.length - 1],
    ]);
    setNewLabel("");
  };

  const handleSave = () => {
    if (title.trim()) {
      const percents = checkpoints.map((_, index) => getPercent(index));
      const checkedPercents = checkpoints
        .map((cp, index) => (cp.checked ? percents[index] : null))
        .filter((p): p is number => p !== null);
      const progress = checkedPercents.length > 0 ? Math.max(...checkedPercents) : 0;
      const savedCheckpoints: Checkpoint[] = checkpoints.map(({ disabled, ...cp }) => cp);
      onSave({ title, description, progress, checkpoints: savedCheckpoints });
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
          {checkpoints.map((cp, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={cp.checked}
                onChange={() => handleCheckboxChange(index)}
                disabled={cp.disabled}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="ml-2">
                {cp.label} ({getPercent(index)}%)
              </span>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add Checkpoint
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Checkpoint label"
            />
            <button
              onClick={handleAddCheckpoint}
              className="py-2 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          {task && onDelete && (
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
