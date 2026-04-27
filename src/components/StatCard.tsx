"use client";

import React from "react";
import Card from "./Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "primary" | "success" | "warning" | "danger" | "info";
  className?: string;
}

const colorStyles = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-base",
};

export default function StatCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = "primary",
  className = "",
}: StatCardProps) {
  return (
    <Card className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted mb-1">{title}</p>
          <p className="text-3xl font-bold text-text dark:text-text">
            {value}
          </p>
        </div>
        {icon && (
          <div className={`text-2xl ${colorStyles[color]}`}>
            {icon}
          </div>
        )}
      </div>

      {trend && trendValue && (
        <div className="flex items-center gap-1">
          <span
            className={`text-sm font-medium ${
              trend === "up"
                ? "text-success"
                : trend === "down"
                  ? "text-danger"
                  : "text-muted"
            }`}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
          </span>
          <span className="text-xs text-muted">vs last week</span>
        </div>
      )}
    </Card>
  );
}
