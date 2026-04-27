"use client";

import React from "react";
import Card from "./Card";
import Badge from "./Badge";
import { Trash2, Edit2 } from "lucide-react";

interface TaskItemProps {
  id?: string;
  title: string;
  description?: string;
  subject?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  completed?: boolean;
  onToggle?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const priorityVariants = {
  low: "default",
  medium: "warning",
  high: "danger",
} as const;

export default function TaskItem({
  id = "",
  title,
  description,
  subject,
  priority = "medium",
  dueDate,
  completed = false,
  onToggle,
  onEdit,
  onDelete,
  className = "",
}: TaskItemProps) {
  return (
    <Card
      className={`flex items-start gap-4 hover:shadow-lg cursor-pointer transition-all ${className}`}
      onClick={() => onToggle?.(id)}
    >
      {/* Checkbox */}
      <div className="flex-shrink-0 mt-1">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle?.(id)}
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 cursor-pointer accent-primary rounded"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={`font-semibold text-base transition-all ${
            completed
              ? "line-through text-muted"
              : "text-text dark:text-text"
          }`}
        >
          {title}
        </h3>

        {description && (
          <p className="text-sm text-muted mt-1 line-clamp-2">
            {description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {subject && <Badge size="sm" variant="info">{subject}</Badge>}
          {priority && (
            <Badge size="sm" variant={priorityVariants[priority]}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
          )}
        </div>
      </div>

      {/* Right side: Due date & Actions */}
      <div className="flex-shrink-0 flex flex-col items-end gap-2">
        {dueDate && (
          <span className="text-xs font-medium text-muted">{dueDate}</span>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id);
              }}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              aria-label="Edit task"
            >
              <Edit2 size={16} className="text-muted" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 rounded transition-colors"
              aria-label="Delete task"
            >
              <Trash2 size={16} className="text-danger" />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
