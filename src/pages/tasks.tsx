"use client";

import React, { useState } from "react";
import { Plus, Filter } from "lucide-react";
import TaskItem from "@/components/TaskItem";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Select from "@/components/Select";
import Badge from "@/components/Badge";
import Alert from "@/components/Alert";
import EmptyState from "@/components/EmptyState";

interface Task {
  id: string;
  title: string;
  description: string;
  subject: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  completed: boolean;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete Algebra Assignment",
      description: "Solve problems 1-20 from Chapter 5",
      subject: "Math",
      priority: "high",
      dueDate: "Feb 5, 2026",
      completed: false,
    },
    {
      id: "2",
      title: "Read Biology Chapter 3",
      description: "Focus on photosynthesis section",
      subject: "Biology",
      priority: "medium",
      dueDate: "Feb 6, 2026",
      completed: true,
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    priority: "medium" as "low" | "medium" | "high",
    dueDate: "",
  });

  const [filterPriority, setFilterPriority] = useState<string>("");
  const [filterSubject, setFilterSubject] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState(true);

  // Get unique subjects for filter
  const subjects = Array.from(new Set(tasks.map((t) => t.subject)));

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (!showCompleted && task.completed) return false;
    if (filterPriority && task.priority !== filterPriority) return false;
    if (filterSubject && task.subject !== filterSubject) return false;
    return true;
  });

  const handleCreateTask = () => {
    if (!formData.title.trim()) {
      setAlert({ message: "Please enter a task title", type: "error" });
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      subject: formData.subject,
      priority: formData.priority,
      dueDate: formData.dueDate,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    resetForm();
    setAlert({ message: "Task created successfully!", type: "success" });
  };

  const handleUpdateTask = () => {
    if (!editingTask || !formData.title.trim()) {
      setAlert({ message: "Please enter a task title", type: "error" });
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: formData.title,
              description: formData.description,
              subject: formData.subject,
              priority: formData.priority,
              dueDate: formData.dueDate,
            }
          : task
      )
    );
    resetForm();
    setAlert({ message: "Task updated successfully!", type: "success" });
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setAlert({ message: "Task deleted", type: "success" });
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        description: task.description,
        subject: task.subject,
        priority: task.priority,
        dueDate: task.dueDate,
      });
      setIsCreateModalOpen(true);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      subject: "",
      priority: "medium",
      dueDate: "",
    });
    setEditingTask(null);
    setIsCreateModalOpen(false);
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-bg dark:bg-bg text-text dark:text-text p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Tasks</h1>
            <p className="text-muted">
              {completedCount} of {tasks.length} tasks completed
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} size="lg">
            <Plus size={20} className="mr-2" />
            Create Task
          </Button>
        </div>

        {/* Alert */}
        {alert && (
          <div className="mb-6">
            <Alert
              message={alert.message}
              type={alert.type}
              duration={3000}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        {/* Filters */}
        <div className="bg-card dark:bg-card rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-primary" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Filter by Priority"
              placeholder="All priorities"
              options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
              value={filterPriority}
              onChange={setFilterPriority}
            />
            <Select
              label="Filter by Subject"
              placeholder="All subjects"
              options={subjects.map((s) => ({ value: s, label: s }))}
              value={filterSubject}
              onChange={setFilterSubject}
            />
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCompleted}
                  onChange={(e) => setShowCompleted(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary"
                />
                <span className="text-sm font-medium">Show Completed</span>
              </label>
            </div>
          </div>
        </div>

        {/* Task Stats */}
        {filteredTasks.length > 0 && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {filterPriority && (
              <Badge
                onRemove={() => setFilterPriority("")}
                variant={
                  filterPriority === "high"
                    ? "danger"
                    : filterPriority === "medium"
                      ? "warning"
                      : "default"
                }
              >
                Priority: {filterPriority}
              </Badge>
            )}
            {filterSubject && (
              <Badge onRemove={() => setFilterSubject("")} variant="info">
                Subject: {filterSubject}
              </Badge>
            )}
          </div>
        )}

        {/* Tasks List */}
        {filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                subject={task.subject}
                priority={task.priority}
                dueDate={task.dueDate}
                completed={task.completed}
                onToggle={handleToggleTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No tasks found"
            description={
              tasks.length === 0
                ? "Create your first task to get started"
                : "No tasks match your filters"
            }
            action={{
              label: "Create Task",
              onClick: () => setIsCreateModalOpen(true),
            }}
          />
        )}

        {/* Create/Edit Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={resetForm}
          title={editingTask ? "Edit Task" : "Create New Task"}
          size="md"
          footer={
            <>
              <Button variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                onClick={editingTask ? handleUpdateTask : handleCreateTask}
              >
                {editingTask ? "Update Task" : "Create Task"}
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <Input
              label="Task Title"
              placeholder="e.g., Complete Math Homework"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Textarea
              label="Description"
              placeholder="Add details about this task..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Subject"
                placeholder="e.g., Math"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
              <Select
                label="Priority"
                options={[
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                ]}
                value={formData.priority}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    priority: value as "low" | "medium" | "high",
                  })
                }
              />
            </div>
            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}
