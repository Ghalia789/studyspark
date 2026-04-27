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
        className={`w-full px-4 py-3 rounded-xl border border-gray-200/90 dark:border-gray-700/90 bg-card dark:bg-card text-text dark:text-text placeholder-muted dark:placeholder-muted shadow-sm shadow-black/5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? "border-danger focus:border-danger" : ""
        } ${className}`}
      />
      {error && <p className="text-sm text-danger mt-1">{error}</p>}
    </div>
  );
}
