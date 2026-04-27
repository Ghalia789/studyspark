"use client";

import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  illustration?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  title,
  description,
  illustration,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
    >
      {/* Illustration */}
      {illustration && (
        <div className="mb-6 w-32 h-32 opacity-80">
          {illustration}
        </div>
      )}

      {/* Content */}
      <h3 className="text-xl font-semibold text-text dark:text-text mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-muted max-w-sm mb-6">
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
