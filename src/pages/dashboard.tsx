"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useTasks, useSubjects } from "@/hooks";
import {
  CheckCircle,
  Clock,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Plus,
  CalendarDays,
  Flame,
  Target,
  Activity,
} from "lucide-react";
import StatCard from "@/components/StatCard";
import Card from "@/components/Card";
import Button from "@/components/Button";
import TaskItem from "@/components/TaskItem";

export default function Dashboard() {
  const [tasks, setTasks] = useTasks();
  const [subjects] = useSubjects();

  const todayKey = new Date().toISOString().split("T")[0];

  const totalTasks = tasks.length;
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const parseDateKey = (value: string) => {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().split("T")[0];
  };

  const overdueTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const taskDate = parseDateKey(task.dueDate);
        return !task.completed && taskDate !== null && taskDate < todayKey;
      }),
    [tasks, todayKey]
  );

  const dueTodayTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const taskDate = parseDateKey(task.dueDate);
        return !task.completed && taskDate === todayKey;
      }),
    [tasks, todayKey]
  );

  const upcomingTasks = useMemo(
    () =>
      tasks
        .filter((task) => !task.completed)
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 5),
    [tasks]
  );

  const recentTasks = useMemo(
    () => tasks.slice(0, 4),
    [tasks]
  );

  const subjectStats = useMemo(
    () =>
      subjects.map((subject) => {
        const subjectTasks = tasks.filter((task) => task.subject === subject.name);
        const completedSubjectTasks = subjectTasks.filter((task) => task.completed).length;
        return {
          name: subject.name,
          color: subject.color,
          total: subjectTasks.length,
          completed: completedSubjectTasks,
          pending: subjectTasks.length - completedSubjectTasks,
        };
      }),
    [subjects, tasks]
  );

  const handleToggleTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-bg dark:bg-bg text-text dark:text-text p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted">Welcome back! Here&apos;s your study overview.</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Tasks"
            value={totalTasks}
            icon={<BookOpen />}
            color="primary"
          />
          <StatCard
            title="Completed"
            value={completedTasks}
            icon={<CheckCircle />}
            color="success"
            trend="up"
            trendValue={`${completionPercentage}% done`}
          />
          <StatCard
            title="Pending"
            value={pendingTasks}
            icon={<Clock />}
            color="warning"
          />
          <StatCard
            title="Completion"
            value={`${completionPercentage}%`}
            icon={<TrendingUp />}
            color="info"
          />
        </div>

        {/* Study Pulse */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-warning/10 text-warning">
              <CalendarDays size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold">{dueTodayTasks.length}</p>
              <p className="text-sm text-muted">Due today</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-danger/10 text-danger">
              <Flame size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold">{overdueTasks.length}</p>
              <p className="text-sm text-muted">Overdue</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Target size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingTasks}</p>
              <p className="text-sm text-muted">Active tasks</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-info/10 text-info">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold">{subjects.length}</p>
              <p className="text-sm text-muted">Subjects tracked</p>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Tasks */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Upcoming Tasks</h2>
              <Link href="/tasks">
                <Button variant="secondary" size="sm">
                  View All <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>

            {upcomingTasks.length > 0 ? (
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
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
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CheckCircle size={48} className="mx-auto mb-4 text-success opacity-50" />
                <p className="text-muted mb-4">No pending tasks! Great job! 🎉</p>
                <Link href="/tasks">
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    Create New Task
                  </Button>
                </Link>
              </Card>
            )}
          </div>

          {/* Subject Summary */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Subject Summary</h2>
            <div className="space-y-3">
              {subjectStats.length > 0 ? (
                subjectStats.map((subject) => (
                  <Card key={subject.name} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: subject.color }}
                          ></div>
                          <p className="font-semibold text-sm">{subject.name}</p>
                        </div>
                        <p className="text-xs text-muted">
                          {subject.completed} of {subject.total} completed
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-success h-full transition-all duration-300"
                        style={{
                          width: `${subject.total > 0 ? (subject.completed / subject.total) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="text-center py-8">
                  <p className="text-muted mb-4">No subjects yet</p>
                  <Link href="/subjects">
                    <Button size="sm" variant="primary">
                      Create Subject
                    </Button>
                  </Link>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Recent Tasks</h3>
                <p className="text-sm text-muted">Your latest work, newest first.</p>
              </div>
              <Link href="/tasks">
                <Button variant="secondary" size="sm">
                  View all
                </Button>
              </Link>
            </div>

            {recentTasks.length > 0 ? (
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-xl border border-gray-200/80 dark:border-gray-700/80 px-4 py-3"
                  >
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-muted">
                        {task.subject} • {task.priority} priority
                      </p>
                    </div>
                    <span className={`text-xs font-semibold ${task.completed ? "text-success" : "text-warning"}`}>
                      {task.completed ? "Completed" : "Open"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No recent tasks yet.</p>
            )}
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">This Week</h3>
                <p className="text-sm text-muted">Tasks due in the next few days.</p>
              </div>
              <Link href="/today">
                <Button variant="secondary" size="sm">
                  Open Today
                </Button>
              </Link>
            </div>

            {upcomingTasks.length > 0 ? (
              <div className="space-y-3">
                {upcomingTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-xl bg-bg/60 dark:bg-bg/40 px-4 py-3"
                  >
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-muted">{task.subject}</p>
                    </div>
                    <p className="text-xs font-semibold text-muted">{task.dueDate}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">Nothing scheduled this week.</p>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-linear-to-r from-primary/10 to-info/10 rounded-lg p-8 border border-primary/20">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/tasks">
              <Button variant="primary" size="lg" className="w-full">
                <Plus size={20} className="mr-2" />
                View All Tasks
              </Button>
            </Link>
            <Link href="/today">
              <Button variant="primary" size="lg" className="w-full">
                <Clock size={20} className="mr-2" />
                Today&apos;s Tasks
              </Button>
            </Link>
            <Link href="/subjects">
              <Button variant="primary" size="lg" className="w-full">
                <BookOpen size={20} className="mr-2" />
                Manage Subjects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
