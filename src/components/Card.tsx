import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-card/95 backdrop-blur-sm dark:bg-card text-text dark:text-text rounded-2xl shadow-sm border border-gray-200/80 dark:border-gray-700/80 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
