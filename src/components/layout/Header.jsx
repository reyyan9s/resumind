import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Monitor, LayoutDashboard, LogOut, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useTheme } from "../../context/ThemeContext"
import { useAuth } from "../../context/AuthContext"
import { buttonClasses } from "../ui/Button"

const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
}

const themeLabels = {
    light: "Light",
    dark: "Dark",
    system: "System",
}

export function Header() {
    const { theme, cycleTheme } = useTheme()
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const Icon = themeIcons[theme]
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)

    const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || "Account"
    const initials = displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

    useEffect(() => {
        const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false) }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    async function handleSignOut() {
        setShowMenu(false)
        await logout()
        navigate("/")
    }

    return (
        <header
            className="fixed top-0 inset-x-0 z-50 transition-colors duration-500"
            style={{
                background: "var(--header-bg)",
                backdropFilter: "blur(20px) saturate(1.6)",
                WebkitBackdropFilter: "blur(20px) saturate(1.6)",
                borderBottom: "1px solid var(--header-border)",
                boxShadow: "var(--header-shadow)",
            }}
        >
            {/* Inner top-edge light reflection */}
            <div
                className="absolute top-0 inset-x-0 h-px pointer-events-none"
                style={{ background: "var(--header-highlight)" }}
            />

            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                {/* Left: Logo + Nav */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <img
                            src="/logo.png"
                            alt="Resumind Logo"
                            className="h-44 w-auto transition-transform group-hover:scale-105"
                        />
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {[
                            { to: "/templates", label: "Templates" },
                            { to: "/blog", label: "Blog" },
                        ].map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className="transition-colors duration-200"
                                style={{ color: "var(--header-text-muted)" }}
                                onMouseEnter={e => (e.target.style.color = "var(--header-text)")}
                                onMouseLeave={e => (e.target.style.color = "var(--header-text-muted)")}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right: Theme Toggle + Auth */}
                <div className="flex items-center gap-3">
                    {/* Theme toggle */}
                    <motion.button
                        onClick={cycleTheme}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.92 }}
                        className="relative h-9 w-9 rounded-xl flex items-center justify-center transition-colors duration-300 cursor-pointer"
                        style={{
                            background: "var(--toggle-bg)",
                            border: "1px solid var(--toggle-border)",
                            boxShadow: "var(--toggle-shadow)",
                        }}
                        title={`Theme: ${themeLabels[theme]}`}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={theme}
                                initial={{ opacity: 0, y: 6, rotate: -30 }}
                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                exit={{ opacity: 0, y: -6, rotate: 30 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Icon className="w-4 h-4" style={{ color: "var(--toggle-icon)" }} />
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>

                    {currentUser ? (
                        /* ── Logged-in: account dropdown ── */
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowMenu(v => !v)}
                                className="flex items-center gap-2 h-9 px-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.03]"
                                style={{
                                    background: "linear-gradient(135deg, #8b7cf8, #6d5ce7)",
                                    color: "#fff",
                                    boxShadow: "0 2px 12px rgba(120,100,248,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                                }}
                            >
                                <span className="h-5 w-5 rounded-lg bg-white/20 flex items-center justify-center text-[9px] font-black">{initials}</span>
                                <span className="hidden sm:block">{displayName.split(" ")[0]}</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMenu ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {showMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-2 w-48 rounded-2xl border shadow-2xl overflow-hidden py-2 px-2 z-50"
                                        style={{ background: "var(--header-bg)", borderColor: "var(--header-border)", backdropFilter: "blur(24px)" }}
                                    >
                                        <Link to="/dashboard" onClick={() => setShowMenu(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/10 hover:text-primary transition-all"
                                            style={{ color: "var(--header-text)" }}>
                                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                                        </Link>
                                        <button onClick={handleSignOut}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all">
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        /* ── Logged-out: Log in + Get Started ── */
                        <>
                            <Link
                                to="/login"
                                className="hidden sm:block text-sm font-medium transition-colors duration-200"
                                style={{ color: "var(--header-text-muted)" }}
                                onMouseEnter={e => (e.target.style.color = "var(--header-text)")}
                                onMouseLeave={e => (e.target.style.color = "var(--header-text-muted)")}
                            >
                                Log in
                            </Link>

                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center h-9 px-4 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.03]"
                                style={{
                                    background: "linear-gradient(135deg, #8b7cf8, #6d5ce7)",
                                    color: "#fff",
                                    boxShadow: "0 2px 12px rgba(120,100,248,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                                }}
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
