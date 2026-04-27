"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Clock,
  CheckSquare,
  BookOpen,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { useState } from "react"

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Today",
    href: "/today",
    icon: Clock,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Subjects",
    href: "/subjects",
    icon: BookOpen,
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <>
      <aside
        className={`fixed left-0 top-0 h-screen bg-card text-text dark:bg-dark-card dark:text-dark-text border-r border-gray-200 dark:border-gray-700 px-4 py-6 flex flex-col transition-all duration-300 ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="p-2 rounded-full bg-primary/20 text-primary">
            <Sparkles className="w-5 h-5 flex-shrink-0" />
          </div>
          {isExpanded && (
            <span className="text-lg font-semibold whitespace-nowrap">
              StudySpark
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition
                  ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted dark:text-dark-muted hover:bg-primary/10"
                  }
                `}
                title={!isExpanded ? item.label : ""}
              >
                <div className="p-1.5 rounded-full bg-primary/10 flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                {isExpanded && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="mb-4">
          <ThemeToggle isExpanded={isExpanded} />
        </div>

        {/* Settings */}
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted dark:text-dark-muted hover:bg-primary/10 transition"
          title="Settings"
        >
          <div className="p-1.5 rounded-full bg-primary/10 flex-shrink-0">
            <Settings className="w-4 h-4" />
          </div>
          {isExpanded && <span>Settings</span>}
        </Link>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-full p-2 rounded-xl hover:bg-primary/10 transition mt-4"
          title={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </aside>

    </>
  )
}
