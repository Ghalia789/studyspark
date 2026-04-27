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
      className={`flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200/80 bg-card/70 px-6 py-14 text-center shadow-sm dark:border-gray-700/80 ${className}`}
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
          className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-sm shadow-primary/20 transition-all duration-200 hover:bg-primary/90 hover:shadow-md"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
