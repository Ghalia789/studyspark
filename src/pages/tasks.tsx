"use client";

import React, { useDeferredValue, useMemo, useState } from "react";
import { Plus, Filter, Search, ArrowUpDown, X } from "lucide-react";
import TaskItem from "@/components/TaskItem";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Select from "@/components/Select";
import Badge from "@/components/Badge";
import Alert from "@/components/Alert";
import EmptyState from "@/components/EmptyState";
import { useTasks, useSubjects, type Task } from "@/hooks";

type SortOption =
  | "dueDate-asc"
  | "dueDate-desc"
  | "priority"
  | "subject"
  | "title";

const priorityRank = {
  high: 0,
  medium: 1,
  low: 2,
} as const;

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "dueDate-asc", label: "Due Date: Soonest" },
  { value: "dueDate-desc", label: "Due Date: Latest" },
  { value: "priority", label: "Priority" },
  { value: "subject", label: "Subject" },
  { value: "title", label: "Title" },
];

export default function Tasks() {
  const [tasks, setTasks] = useTasks();
  const [availableSubjects] = useSubjects();

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("dueDate-asc");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const filterSubjects = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.subject))).sort((a, b) => a.localeCompare(b)),
    [tasks]
  );

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  const activeSortLabel = useMemo(
    () => sortOptions.find((option) => option.value === sortBy)?.label,
    [sortBy]
  );

  const subjectOptions = useMemo(
    () =>
      availableSubjects.map((subject) => ({
        value: subject.name,
        label: subject.name,
      })),
    [availableSubjects]
  );

  const openCreateTaskForm = () => {
    setFormData((currentForm) => ({
      ...currentForm,
      title: "",
      description: "",
      subject: availableSubjects[0]?.name ?? "",
      priority: "medium",
      dueDate: "",
    }));
    setEditingTask(null);
    setIsCreateModalOpen(true);
  };

  const filteredTasks = useMemo(() => {
    const normalizedQuery = deferredSearchQuery.trim().toLowerCase();

    const filtered = tasks.filter((task) => {
      if (!showCompleted && task.completed) return false;
      if (filterPriority && task.priority !== filterPriority) return false;
      if (filterSubject && task.subject !== filterSubject) return false;

      if (!normalizedQuery) return true;

      return [task.title, task.description, task.subject].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      );
    });

    const sortByDueDate = (a: Task, b: Task, direction: 1 | -1) => {
      const aTime = Date.parse(a.dueDate);
      const bTime = Date.parse(b.dueDate);
      const aValid = Number.isFinite(aTime);
      const bValid = Number.isFinite(bTime);

      if (!aValid && !bValid) return 0;
      if (!aValid) return 1;
      if (!bValid) return -1;

      return (aTime - bTime) * direction;
    };

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "dueDate-desc":
          return sortByDueDate(a, b, -1);
        case "priority":
          return priorityRank[a.priority] - priorityRank[b.priority];
        case "subject":
          return a.subject.localeCompare(b.subject);
        case "title":
          return a.title.localeCompare(b.title);
        case "dueDate-asc":
        default:
          return sortByDueDate(a, b, 1);
      }
    });
  }, [tasks, deferredSearchQuery, filterPriority, filterSubject, showCompleted, sortBy]);

  const activeFilterCount = useMemo(
    () =>
      [
        searchQuery,
        filterPriority,
        filterSubject,
        !showCompleted ? "hidden-completed" : "",
      ].filter(Boolean).length,
    [searchQuery, filterPriority, filterSubject, showCompleted]
  );

  const clearFilters = () => {
    setSearchQuery("");
    setFilterPriority("");
    setFilterSubject("");
    setShowCompleted(true);
    setSortBy("dueDate-asc");
  };

  const handleCreateTask = () => {
    if (!formData.title.trim()) {
      setAlert({ message: "Please enter a task title", type: "error" });
      return;
    }

    if (!formData.subject.trim()) {
      setAlert({ message: "Please choose a subject", type: "error" });
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

    setTasks((currentTasks) => [newTask, ...currentTasks]);
    resetForm();
    setAlert({ message: "Task created successfully!", type: "success" });
  };

  const handleUpdateTask = () => {
    if (!editingTask || !formData.title.trim()) {
      setAlert({ message: "Please enter a task title", type: "error" });
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
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
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    setAlert({ message: "Task deleted", type: "success" });
  };

  const handleToggleTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
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
      subject: availableSubjects[0]?.name ?? "",
      priority: "medium",
      dueDate: "",
    });
    setEditingTask(null);
    setIsCreateModalOpen(false);
  };

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
          <Button onClick={openCreateTaskForm} size="lg">
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
        <div className="bg-card dark:bg-card rounded-2xl p-6 mb-8 border border-gray-200/80 dark:border-gray-700/80 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-primary" />
              <h3 className="font-semibold">Advanced Filters</h3>
            </div>
            {activeFilterCount > 0 && (
              <Button variant="secondary" size="sm" onClick={clearFilters}>
                <X size={14} />
                Clear Filters
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-4">
            <div className="xl:col-span-2">
              <Input
                label="Search Tasks"
                placeholder="Search title, description, or subject"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <p className="mt-2 flex items-center gap-2 text-xs text-muted">
                <Search size={14} />
                Search matches task titles, descriptions, and subjects.
              </p>
            </div>

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
              options={filterSubjects.map((subject) => ({ value: subject, label: subject }))}
              value={filterSubject}
              onChange={setFilterSubject}
            />
            <Select
              label="Sort By"
              options={sortOptions}
              value={sortBy}
              onChange={(value) => setSortBy(value as SortOption)}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl bg-bg/70 dark:bg-bg/40 px-4 py-3 text-sm text-muted">
            <span className="flex items-center gap-2">
              <ArrowUpDown size={14} />
              Sorted by: {activeSortLabel}
            </span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="font-medium text-text dark:text-text">
                Show Completed
              </span>
            </label>
          </div>
        </div>

        {/* Task Stats */}
        {filteredTasks.length > 0 && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {searchQuery && (
              <Badge onRemove={() => setSearchQuery("")} variant="default">
                Search: {searchQuery}
              </Badge>
            )}
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
            {sortBy !== "dueDate-asc" && (
              <Badge onRemove={() => setSortBy("dueDate-asc")} variant="default">
                Sort: {activeSortLabel}
              </Badge>
            )}
            {!showCompleted && (
              <Badge onRemove={() => setShowCompleted(true)} variant="warning">
                Hidden Completed
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
                : "No tasks match your search, filters, or sort settings"
            }
            action={{
              label: tasks.length === 0 ? "Create Task" : "Clear Filters",
              onClick:
                tasks.length === 0 ? () => setIsCreateModalOpen(true) : clearFilters,
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
              <Select
                label="Subject"
                placeholder="Choose a subject"
                options={subjectOptions}
                value={formData.subject}
                onChange={(value) =>
                  setFormData({ ...formData, subject: value })
                }
                disabled={availableSubjects.length === 0}
              />
              {availableSubjects.length === 0 && (
                <p className="text-xs text-muted col-span-2">
                  Create subjects first on the Subjects page so tasks can be assigned cleanly.
                </p>
              )}
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
