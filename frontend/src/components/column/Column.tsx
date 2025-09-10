"use client";
import { useState } from "react";
import ColumnHeader from "./ColumnHeader";

interface ColumnProps {
  columnId: number;
  columnTitle: string;
  color?: string;
  children?: React.ReactNode;
  onColorChange?: (color: string) => void;
  onDelete?: () => void;
  onTitleChange?: (newTitle: string) => void;
}

const Column = ({
  columnId,
  columnTitle,
  color,
  onColorChange,
  onDelete,
  onTitleChange,
}: ColumnProps) => {
  const backgroundColor = color ? `rgba(${color}, 0.1)` : "rgba(0, 0, 0, 0.1)";

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
      </div>
    </>
  );
};

export default Column;
