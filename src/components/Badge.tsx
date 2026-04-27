"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  onRemove?: () => void;
  className?: string;
}

const variantStyles = {
  default: "bg-primary-soft text-primary",
  success: "bg-success bg-opacity-20 text-success",
  warning: "bg-warning bg-opacity-20 text-warning",
  danger: "bg-danger bg-opacity-20 text-danger",
  info: "bg-base bg-opacity-20 text-base",
};

const sizeStyles = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
};

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  onRemove,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-70 transition-opacity"
          aria-label="Remove badge"
        >
          ×
        </button>
      )}
    </span>
  );
}
