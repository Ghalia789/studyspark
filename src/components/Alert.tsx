"use client";

import React, { useEffect, useState } from "react";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const typeStyles = {
  success: "bg-success bg-opacity-10 text-success border-success border-opacity-30",
  error: "bg-danger bg-opacity-10 text-danger border-danger border-opacity-30",
  info: "bg-base bg-opacity-10 text-base border-base border-opacity-30",
  warning: "bg-warning bg-opacity-10 text-warning border-warning border-opacity-30",
};

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

export default function Alert({
  message,
  type = "info",
  duration,
  onClose,
  action,
  className = "",
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const Icon = iconMap[type];

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border p-4 shadow-sm ${typeStyles[type]} ${className}`}
      role="alert"
    >
      <Icon size={20} className="shrink-0 mt-0.5" />

      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {action && (
          <button
            onClick={action.onClick}
            className="text-xs font-semibold hover:opacity-70 transition-opacity whitespace-nowrap"
          >
            {action.label}
          </button>
        )}
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="p-1 hover:opacity-70 transition-opacity"
          aria-label="Close alert"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
