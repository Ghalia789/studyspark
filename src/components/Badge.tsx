"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  onRemove?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles = {
  default: "bg-primary-soft text-primary",
  success: "bg-success/20 text-success dark:bg-success/25",
  warning: "bg-warning/20 text-warning dark:bg-warning/25",
  danger: "bg-danger/20 text-danger dark:bg-danger/25",
  info: "bg-base/15 text-base dark:bg-base/20",
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
  style,
}: BadgeProps) {
  return (
    <span
      style={style}
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full hover:opacity-70 transition-opacity"
          aria-label="Remove badge"
        >
          ×
        </button>
      )}
    </span>
  );
}
