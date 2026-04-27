"use client";

import React from "react";

interface InputProps {
  type?: "text" | "email" | "password" | "number" | "date";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  className?: string;
}

export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  error,
  label,
  className = "",
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text dark:text-text mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-text placeholder-muted dark:placeholder-muted focus:outline-none focus:border-primary-soft dark:focus:border-primary-soft transition-colors duration-200 disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? "border-danger focus:border-danger" : ""
        } ${className}`}
      />
      {error && <p className="text-sm text-danger mt-1">{error}</p>}
    </div>
  );
}
