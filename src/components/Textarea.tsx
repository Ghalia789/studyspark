"use client";

import React from "react";

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  className?: string;
}

export default function Textarea({
  placeholder = "",
  value,
  onChange,
  disabled = false,
  error,
  label,
  rows = 4,
  maxLength,
  showCount = false,
  className = "",
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text dark:text-text mb-2">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={`w-full px-4 py-3 rounded-xl border border-gray-200/90 dark:border-gray-700/90 bg-card dark:bg-card text-text dark:text-text placeholder-muted dark:placeholder-muted shadow-sm shadow-black/5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all duration-200 resize-none disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? "border-danger focus:border-danger" : ""
        } ${className}`}
      />
      <div className="flex items-center justify-between mt-1">
        {error && <p className="text-sm text-danger">{error}</p>}
        {showCount && maxLength && (
          <p className="text-xs text-muted ml-auto">
            {value?.length ?? 0} / {maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
