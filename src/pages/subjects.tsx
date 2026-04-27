"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTasks, useSubjects, type Subject } from "@/hooks";
import {
  Plus,
  Trash2,
  Edit2,
  BookOpen,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Alert from "@/components/Alert";
import EmptyState from "@/components/EmptyState";

const PRESET_COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#FFA07A", // Light Salmon
  "#98D8C8", // Mint
  "#F7DC6F", // Yellow
  "#BB8FCE", // Purple
  "#85C1E2", // Sky Blue
];

export default function Subjects() {
  const [tasks] = useTasks();
  const [subjects, setSubjects] = useSubjects();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    color: PRESET_COLORS[0],
  });

  // Calculate subject statistics
  const subjectStats = subjects.map((subject) => {
    const subjectTasks = tasks.filter((t) => t.subject === subject.name);
    const completedTasks = subjectTasks.filter((t) => t.completed).length;
    return {
      subject,
      totalTasks: subjectTasks.length,
      completedTasks,
      pendingTasks: subjectTasks.length - completedTasks,
      completionPercentage:
        subjectTasks.length > 0
          ? Math.round((completedTasks / subjectTasks.length) * 100)
          : 0,
    };
  });

  const handleOpenCreateModal = () => {
    setFormData({
      name: "",
      color: PRESET_COLORS[0],
    });
    setEditingSubject(null);
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (subject: Subject) => {
    setFormData({
      name: subject.name,
      color: subject.color || PRESET_COLORS[0],
    });
    setEditingSubject(subject);
    setIsCreateModalOpen(true);
  };

  const handleCreateOrUpdateSubject = () => {
    if (!formData.name.trim()) {
      setAlert({ message: "Please enter a subject name", type: "error" });
      return;
    }

    // Check if subject name already exists (excluding the one being edited)
    const nameExists = subjects.some(
      (s) => s.name.toLowerCase() === formData.name.toLowerCase() && s.id !== editingSubject?.id
    );

    if (nameExists) {
      setAlert({ message: "Subject already exists", type: "error" });
      return;
    }

    if (editingSubject) {
      // Update existing subject
      const updatedSubjects = subjects.map((s) =>
        s.id === editingSubject.id
          ? {
              ...s,
              name: formData.name,
              color: formData.color,
            }
          : s
      );
      setSubjects(updatedSubjects);
      setAlert({ message: "Subject updated successfully!", type: "success" });
    } else {
      // Create new subject
      const newSubject: Subject = {
        id: crypto.randomUUID(),
        name: formData.name,
        color: formData.color,
        createdAt: new Date().toISOString(),
      };
      setSubjects([...subjects, newSubject]);
      setAlert({ message: "Subject created successfully!", type: "success" });
    }

    setIsCreateModalOpen(false);
    setFormData({
      name: "",
      color: PRESET_COLORS[0],
    });
  };

  const handleDeleteSubject = (id: string) => {
    const updatedSubjects = subjects.filter((s) => s.id !== id);
    setSubjects(updatedSubjects);
    setDeleteConfirm(null);
    setAlert({ message: "Subject deleted successfully!", type: "success" });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      color: PRESET_COLORS[0],
    });
    setEditingSubject(null);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg dark:bg-bg text-text dark:text-text p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/">
                <Button variant="secondary" size="sm">
                  <ArrowLeft size={16} />
                </Button>
              </Link>
              <h1 className="text-4xl font-bold">Subjects</h1>
            </div>
            <p className="text-muted">Manage your study subjects</p>
          </div>
          <Button onClick={handleOpenCreateModal}>
            <Plus size={20} className="mr-2" />
            New Subject
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

        {/* Subjects Grid */}
        {subjectStats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectStats.map(
              ({
                subject,
                totalTasks,
                completedTasks,
                pendingTasks,
                completionPercentage,
              }) => (
                <div key={subject.id} className="group">
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                    {/* Subject Header */}
                    <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: subject.color }}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg truncate">
                            {subject.name}
                          </h3>
                          <p className="text-xs text-muted">
                            {new Date(subject.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEditModal(subject)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                          title="Edit subject"
                        >
                          <Edit2 size={16} className="text-primary" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(subject.id)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                          title="Delete subject"
                        >
                          <Trash2 size={16} className="text-danger" />
                        </button>
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">
                          {totalTasks}
                        </p>
                        <p className="text-xs text-muted">Total</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-success">
                          {completedTasks}
                        </p>
                        <p className="text-xs text-muted">Done</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-warning">
                          {pendingTasks}
                        </p>
                        <p className="text-xs text-muted">Pending</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Progress</p>
                        <p className="text-sm font-bold text-info">
                          {completionPercentage}%
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-linear-to-r from-success to-success/70 h-full transition-all duration-300"
                          style={{ width: `${completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2 text-sm mt-auto">
                      {totalTasks === 0 ? (
                        <>
                          <AlertCircle size={16} className="text-muted" />
                          <span className="text-muted">No tasks yet</span>
                        </>
                      ) : pendingTasks === 0 ? (
                        <>
                          <CheckCircle2 size={16} className="text-success" />
                          <span className="text-success">All done!</span>
                        </>
                      ) : (
                        <>
                          <BookOpen size={16} className="text-warning" />
                          <span className="text-warning">
                            {pendingTasks} task{pendingTasks !== 1 ? "s" : ""} left
                          </span>
                        </>
                      )}
                    </div>
                  </Card>

                  {/* Delete Confirmation */}
                  {deleteConfirm === subject.id && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-50">
                      <Card className="max-w-sm">
                        <h3 className="text-lg font-bold mb-2">
                          Delete subject?
                        </h3>
                        <p className="text-sm text-muted mb-6">
                          This will delete the subject &quot;{subject.name}&quot;.
                          Tasks will not be deleted.
                        </p>
                        <div className="flex gap-3">
                          <Button
                            variant="secondary"
                            onClick={() => setDeleteConfirm(null)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteSubject(subject.id)}
                            className="flex-1"
                          >
                            Delete
                          </Button>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        ) : (
          <EmptyState
            title="No subjects yet"
            description="Create your first subject to get started organizing your tasks"
            action={{
              label: "Create Subject",
              onClick: handleOpenCreateModal,
            }}
          />
        )}

        {/* Create/Edit Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={resetForm}
          title={editingSubject ? "Edit Subject" : "Create New Subject"}
          size="md"
          footer={
            <>
              <Button variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateOrUpdateSubject}
              >
                {editingSubject ? "Update Subject" : "Create Subject"}
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <Input
              label="Subject Name"
              placeholder="e.g., Mathematics, Biology"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <div>
              <label className="block text-sm font-medium mb-3">Color</label>
              <div className="grid grid-cols-4 gap-3">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-full h-12 rounded-lg transition-all border-2 ${
                      formData.color === color
                        ? "border-gray-400 scale-105"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    title={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
