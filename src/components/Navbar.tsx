"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  Clock,
  CheckSquare,
  BookOpen,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import ThemeToggle from "./ThemeToggle"

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


  const navigationLinks = [
    ...navItems,
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <>
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed left-4 top-4 z-40 inline-flex items-center justify-center rounded-xl border border-gray-200 bg-card p-3 text-text shadow-md transition hover:bg-primary/10 lg:hidden dark:border-gray-700 dark:bg-dark-card"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isMobileMenuOpen && (
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close navigation menu"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen bg-card text-text dark:bg-dark-card dark:text-dark-text border-r border-gray-200 dark:border-gray-700 px-4 py-6 flex flex-col transition-all duration-300 lg:z-30 ${
          isExpanded ? "w-64" : "w-20"
        } ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="p-2 rounded-full bg-primary/20 text-primary">
            <Sparkles className="w-5 h-5 shrink-0" />
          </div>
          {isExpanded && (
            <span className="text-lg font-semibold whitespace-nowrap">
              StudySpark
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="ml-auto rounded-lg p-2 hover:bg-primary/10 lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navigationLinks.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition
                  ${
                    isActive
                      ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                      : "text-muted dark:text-dark-muted hover:bg-primary/10 hover:text-primary"
                  }
                `}
                title={!isExpanded ? item.label : ""}
                aria-current={isActive ? "page" : undefined}
              >
                <div
                  className={`p-1.5 rounded-full shrink-0 transition ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "bg-primary/10 text-muted group-hover:text-primary"
                  }`}
                >
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

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden items-center justify-center w-full p-2 rounded-xl hover:bg-primary/10 transition mt-4 lg:flex"
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
