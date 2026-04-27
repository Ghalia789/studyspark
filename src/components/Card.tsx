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
      className={`bg-card dark:bg-card text-text dark:text-text rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-shadow duration-200 hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
