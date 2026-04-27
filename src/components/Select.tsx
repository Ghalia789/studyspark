"use client";

import React from "react";

interface SelectProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  disabled = false,
  error,
  className = "",
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text dark:text-text mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl border border-gray-200/90 dark:border-gray-700/90 bg-card dark:bg-card text-text dark:text-text appearance-none cursor-pointer shadow-sm shadow-black/5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? "border-danger focus:border-danger" : ""
        } ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23074F57' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          paddingRight: "2.5rem",
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-danger mt-1">{error}</p>}
    </div>
  );
}
