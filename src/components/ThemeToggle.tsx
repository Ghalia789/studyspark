"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle({ isExpanded }: { isExpanded: boolean }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark"
    setDark(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  const toggleTheme = () => {
    const newDark = !dark
    setDark(newDark)
    document.documentElement.classList.toggle("dark", newDark)
    localStorage.setItem("theme", newDark ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl 
                 bg-primary/10 text-primary hover:bg-primary/20 transition"
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      suppressHydrationWarning
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
