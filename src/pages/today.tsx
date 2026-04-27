"use client";

import React from "react";
import Link from "next/link";
import { useTasks } from "@/hooks";
import {
  CheckCircle2,
  Clock,
  Plus,
  ArrowLeft,
  Zap,
} from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import TaskItem from "@/components/TaskItem";
import EmptyState from "@/components/EmptyState";
import Badge from "@/components/Badge";

export default function Today() {
  const [tasks, setTasks] = useTasks();

  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // Filter tasks for today
  const todaysTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate).toISOString().split("T")[0];
    return taskDate === today && !task.completed;
  });

  // Also include completed tasks from today for visibility
  const completedTodayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate).toISOString().split("T")[0];
    return taskDate === today && task.completed;
  });

  // Sort by priority (high -> medium -> low)
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedTodaysTasks = [...todaysTasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  // Statistics
  const totalTodayTasks = todaysTasks.length + completedTodayTasks.length;
  const completedCount = completedTodayTasks.length;
  const pendingCount = todaysTasks.length;
  const completionPercentage = totalTodayTasks > 0 
    ? Math.round((completedCount / totalTodayTasks) * 100) 
    : 0;

  // Priority breakdown
  const highPriorityCount = sortedTodaysTasks.filter(
    (t) => t.priority === "high"
  ).length;
  const mediumPriorityCount = sortedTodaysTasks.filter(
    (t) => t.priority === "medium"
  ).length;
  const lowPriorityCount = sortedTodaysTasks.filter(
    (t) => t.priority === "low"
  ).length;

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-bg dark:bg-bg text-text dark:text-text p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/">
                <Button variant="secondary" size="sm">
                  <ArrowLeft size={16} />
                </Button>
              </Link>
              <h1 className="text-4xl font-bold">Today</h1>
            </div>
            <p className="text-muted">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <Link href="/tasks">
            <Button>
              <Plus size={20} className="mr-2" />
              New Task
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        {totalTodayTasks > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <p className="text-2xl font-bold text-primary mb-1">
                {totalTodayTasks}
              </p>
              <p className="text-xs text-muted">Total Today</p>
            </Card>
            <Card className="text-center">
              <p className="text-2xl font-bold text-success mb-1">
                {completedCount}
              </p>
              <p className="text-xs text-muted">Completed</p>
            </Card>
            <Card className="text-center">
              <p className="text-2xl font-bold text-warning mb-1">
                {pendingCount}
              </p>
              <p className="text-xs text-muted">Pending</p>
            </Card>
            <Card className="text-center">
              <p className="text-2xl font-bold text-info mb-1">
                {completionPercentage}%
              </p>
              <p className="text-xs text-muted">Completed</p>
            </Card>
          </div>
        )}

        {/* Priority Tags */}
        {totalTodayTasks > 0 && (
          <div className="flex gap-2 mb-8 flex-wrap">
            {highPriorityCount > 0 && (
              <Badge variant="danger">{highPriorityCount} High Priority</Badge>
            )}
            {mediumPriorityCount > 0 && (
              <Badge variant="warning">
                {mediumPriorityCount} Medium Priority
              </Badge>
            )}
            {lowPriorityCount > 0 && (
              <Badge variant="info">{lowPriorityCount} Low Priority</Badge>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          {sortedTodaysTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-warning" />
                <h2 className="text-xl font-bold">
                  Pending ({sortedTodaysTasks.length})
                </h2>
              </div>
              <div className="space-y-3">
                {sortedTodaysTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group border-l-4 border-l-warning"
                  >
                    <TaskItem
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      subject={task.subject}
                      priority={task.priority}
                      dueDate={task.dueDate}
                      completed={task.completed}
                      onToggle={handleToggleTask}
                      onDelete={handleDeleteTask}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTodayTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={20} className="text-success" />
                <h2 className="text-xl font-bold">
                  Completed ({completedTodayTasks.length})
                </h2>
              </div>
              <div className="space-y-3 opacity-70">
                {completedTodayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group border-l-4 border-l-success"
                  >
                    <TaskItem
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      subject={task.subject}
                      priority={task.priority}
                      dueDate={task.dueDate}
                      completed={task.completed}
                      onToggle={handleToggleTask}
                      onDelete={handleDeleteTask}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {totalTodayTasks === 0 && (
            <EmptyState
              title="No tasks for today"
              description="You&apos;re all caught up! No tasks scheduled for today."
              action={{
                label: "Create Task",
                onClick: () => window.location.href = "/tasks",
              }}
            />
          )}
        </div>

        {/* Motivation */}
        {totalTodayTasks > 0 && pendingCount === 0 && (
          <div className="mt-12 bg-linear-to-r from-success/10 to-info/10 rounded-lg p-8 border border-success/20 text-center">
            <Zap size={48} className="mx-auto mb-4 text-success" />
            <h3 className="text-2xl font-bold mb-2">Outstanding! 🎉</h3>
            <p className="text-muted">
              You&apos;ve completed all your tasks for today. Great job!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
