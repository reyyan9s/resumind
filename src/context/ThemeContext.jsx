import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

const STORAGE_KEY = "resumind-theme"

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(STORAGE_KEY) || "system"
        }
        return "system"
    })

    // Resolve the actual applied theme (light or dark) from the preference
    const resolvedTheme = theme === "system"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : theme

    useEffect(() => {
        const root = document.documentElement

        // Add transition class for smooth theme change
        root.style.setProperty("transition", "background-color 0.3s ease, color 0.3s ease")

        if (resolvedTheme === "dark") {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }

        localStorage.setItem(STORAGE_KEY, theme)
    }, [theme, resolvedTheme])

    // Listen for OS theme changes when in system mode
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = () => {
            if (theme === "system") {
                // Force re-render by updating state with same value
                setTheme(prev => prev) // This won't trigger, so use a different approach
                const root = document.documentElement
                if (mediaQuery.matches) {
                    root.classList.add("dark")
                } else {
                    root.classList.remove("dark")
                }
            }
        }
        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [theme])

    const cycleTheme = () => {
        setTheme(prev => {
            if (prev === "light") return "dark"
            if (prev === "dark") return "system"
            return "light"
        })
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, cycleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) throw new Error("useTheme must be used within ThemeProvider")
    return context
}
