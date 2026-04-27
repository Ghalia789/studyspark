"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useSettings, useSubjects, useTasks, type UserSettings } from "@/hooks";
import {
  ArrowLeft,
  Monitor,
  Moon,
  Sun,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  LayoutGrid,
  List,
  RotateCcw,
  Database,
  CheckCircle2,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";

const defaultSettings: UserSettings = {
  theme: "light" as const,
  viewMode: "card" as const,
  notificationsEnabled: true,
  soundEnabled: false,
};

export default function Settings() {
  const [settings, setSettings] = useSettings();
  const [tasks, setTasks] = useTasks();
  const [subjects, setSubjects] = useSubjects();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.theme === "dark");
    localStorage.setItem("theme", settings.theme);
  }, [settings.theme]);

  const taskCount = tasks.length;
  const subjectCount = subjects.length;
  const completedTaskCount = tasks.filter((task) => task.completed).length;

  const updateSettings = (patch: Partial<UserSettings>) => {
    setSettings({
      ...settings,
      ...patch,
    });
  };

  const resetDemoData = () => {
    setTasks([]);
    setSubjects([]);
    setSettings(defaultSettings);
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  };

  return (
    <div className="min-h-screen bg-bg dark:bg-bg text-text dark:text-text p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/">
                <Button variant="secondary" size="sm">
                  <ArrowLeft size={16} />
                </Button>
              </Link>
              <h1 className="text-4xl font-bold">Settings</h1>
            </div>
            <p className="text-muted">
              Customize StudySpark and manage your saved data.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <ClipboardList size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold">{taskCount}</p>
              <p className="text-sm text-muted">Saved tasks</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-info/10 text-info">
              <BookOpen size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold">{subjectCount}</p>
              <p className="text-sm text-muted">Saved subjects</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-success/10 text-success">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedTaskCount}</p>
              <p className="text-sm text-muted">Completed tasks</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Monitor size={18} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Appearance</h2>
                <p className="text-sm text-muted">Theme and layout preferences.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-3">Theme</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "light", label: "Light", icon: Sun },
                    { value: "dark", label: "Dark", icon: Moon },
                    { value: "system", label: "System", icon: Monitor },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        updateSettings({ theme: value === "system" ? "light" : (value as UserSettings["theme"]) })
                      }
                      className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition ${
                        settings.theme === (value === "system" ? "light" : value)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted">
                  System follows your browser preference by using the current app theme.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium mb-3">View Mode</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => updateSettings({ viewMode: "card" })}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-4 transition ${
                      settings.viewMode === "card"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                    }`}
                  >
                    <LayoutGrid size={18} />
                    <span className="font-medium">Card View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSettings({ viewMode: "list" })}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-4 transition ${
                      settings.viewMode === "list"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                    }`}
                  >
                    <List size={18} />
                    <span className="font-medium">List View</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-info/10 text-info">
                <Bell size={18} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Notifications</h2>
                <p className="text-sm text-muted">Control reminders and sound alerts.</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => updateSettings({ notificationsEnabled: !settings.notificationsEnabled })}
                className="w-full flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:border-primary/50 transition"
              >
                <div className="flex items-center gap-3">
                  {settings.notificationsEnabled ? (
                    <Bell className="text-primary" size={18} />
                  ) : (
                    <BellOff className="text-muted" size={18} />
                  )}
                  <div className="text-left">
                    <p className="font-medium">Task notifications</p>
                    <p className="text-sm text-muted">Show reminders for due tasks.</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${settings.notificationsEnabled ? "text-success" : "text-muted"}`}>
                  {settings.notificationsEnabled ? "On" : "Off"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className="w-full flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:border-primary/50 transition"
              >
                <div className="flex items-center gap-3">
                  {settings.soundEnabled ? (
                    <Volume2 className="text-primary" size={18} />
                  ) : (
                    <VolumeX className="text-muted" size={18} />
                  )}
                  <div className="text-left">
                    <p className="font-medium">Sound alerts</p>
                    <p className="text-sm text-muted">Play a sound for reminder events.</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${settings.soundEnabled ? "text-success" : "text-muted"}`}>
                  {settings.soundEnabled ? "On" : "Off"}
                </span>
              </button>
            </div>
          </Card>
        </div>

        <Card className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10 text-warning">
              <Database size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Data Management</h2>
              <p className="text-sm text-muted">Clear or reset your saved local data.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="font-medium mb-2">What is stored locally?</p>
              <ul className="space-y-2 text-sm text-muted">
                <li>• Tasks and their completion status</li>
                <li>• Subjects and subject colors</li>
                <li>• Theme, view mode, and notification preferences</li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
              <p className="font-medium">Reset options</p>
              <p className="text-sm text-muted">
                This clears the saved demo data and restores the default app settings.
              </p>
              <Button variant="danger" onClick={resetDemoData} className="w-full">
                <RotateCcw size={16} className="mr-2" />
                Reset demo data
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
