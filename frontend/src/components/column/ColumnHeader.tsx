"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoKebabHorizontal } from "react-icons/go";

interface ColumnHeaderProps {
  columnId: number;
  columnTitle: string;
  color?: string;
  onColorChange?: (color: string) => void;
  onDelete?: () => void;
  onTitleChange?: (newTitle: string) => void;
}

const ColumnHeader = ({
  columnId,
  columnTitle,
  color,
  onColorChange,
  onDelete,
  onTitleChange,
}: ColumnHeaderProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedColor, setSelectedColor] = useState(color || "0, 0, 0");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(columnTitle);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const titleBackgroundColor = color
    ? `rgba(${color}, 0.3)`
    : "rgba(0, 0, 0, 0.3)";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor = e.target.value;

    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);

    const rgbColor = `${r}, ${g}, ${b}`;
    setSelectedColor(rgbColor);
    onColorChange?.(rgbColor);
  };

  const handleDelete = () => {
    onDelete?.();
    setShowMenu(false);
  };

  const handleTitleChange = () => {
    onTitleChange?.(title);
    setIsEditing(false);
    setShowMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleChange();
    } else if (e.key === "Escape") {
      setTitle(columnTitle);
      setIsEditing(false);
    }
  };

  return (
    <div
      className="flex justify-between items-center mb-2 rounded shadow"
      style={{ backgroundColor: titleBackgroundColor }}
    >
      <div className="flex-grow">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleChange}
            onKeyDown={handleKeyDown}
            className="font-semibold w-full px-3 py-2 border border-gray-300 rounded"
          />
        ) : (
          <div
            className="font-semibold px-3 py-2 rounded"
            onClick={() => setIsEditing(true)}
          >
            {title}
          </div>
        )}
      </div>

      <div className="relative ml-2" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-600 hover:text-gray-900 p-1 cursor-pointer"
        >
          <GoKebabHorizontal />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Rename Column
            </button>
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-full flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Change Color
            </button>
            <button
              onClick={handleDelete}
              className="w-full flex px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
            >
              Delete Column
            </button>
          </div>
        )}

        {showColorPicker && (
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-20">
            <div className="px-4 py-2 text-xs text-gray-500 border-b">
              Select Color
            </div>
            <div className="p-3">
              <input
                type="color"
                onChange={handleCustomColorChange}
                className="w-full h-8 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColumnHeader;