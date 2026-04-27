"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle({ isExpanded }: { isExpanded: boolean }) {
  const [dark, setDark] = useState(() => {
    // Initialize from localStorage (client-side only)
    if (typeof window === 'undefined') {
      return false
    }
    return localStorage.getItem("theme") === "dark"
  })

  // Apply theme to DOM when component mounts
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  const toggleTheme = () => {
    const newDark = !dark
    setDark(newDark)
    localStorage.setItem("theme", newDark ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl 
                 bg-primary/10 text-primary hover:bg-primary/20 transition"
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
      {isExpanded && (
        <span className="text-sm">
          Switch to{dark ? " Light" : " Dark"}
        </span>
      )}
    </button>
  )
}
