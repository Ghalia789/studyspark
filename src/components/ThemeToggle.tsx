"use client"

import { useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useSettings } from "@/hooks"

export default function ThemeToggle({ isExpanded }: { isExpanded: boolean }) {
  const [settings, setSettings] = useSettings()
  const dark = settings.theme === "dark"

  // Keep the document class in sync with the persisted theme setting.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  const toggleTheme = () => {
    const nextTheme = dark ? "light" : "dark"

    setSettings({
      ...settings,
      theme: nextTheme,
    })

    // Preserve the legacy key so older state still resolves correctly.
    localStorage.setItem("theme", nextTheme)
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
