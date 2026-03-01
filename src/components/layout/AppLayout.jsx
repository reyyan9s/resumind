import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import {
    LayoutDashboard,
    FileText,
    Settings as SettingsIcon,
    Menu,
    X,
    Search,
    Bell,
    ChevronDown,
    Sparkles,
    User,
    LogOut,
    CheckCircle2,
    Clock,
    AlertCircle
} from "lucide-react"
import { cn } from "../../lib/utils"
import { useTheme } from "../../context/ThemeContext"
import { useAuth } from "../../context/AuthContext"
import { GridBackground, AmbientOrb } from "../ui/DecorativeElements"
import { Container } from "./Container"

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Templates', href: '/templates', icon: FileText },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
]

const palette = {
    dark: {
        sidebarBg: "rgba(12, 10, 28, 0.65)",
        sidebarBorder: "rgba(130, 110, 255, 0.12)",
        headerBg: "rgba(8, 8, 16, 0.7)",
        headerBorder: "rgba(130, 110, 255, 0.1)",
        text: "rgba(235, 232, 255, 0.95)",
        textMuted: "rgba(170, 160, 215, 0.55)",
        navHover: "rgba(120, 100, 255, 0.1)",
        inputBg: "rgba(255, 255, 255, 0.03)",
        inputBorder: "rgba(255, 255, 255, 0.08)",
        avatarBorder: "rgba(130, 110, 255, 0.3)",
    },
    light: {
        sidebarBg: "rgba(248, 247, 255, 0.75)",
        sidebarBorder: "rgba(120, 100, 255, 0.08)",
        headerBg: "rgba(248, 247, 255, 0.82)",
        headerBorder: "rgba(0, 0, 0, 0.05)",
        text: "#1A1040",
        textMuted: "rgba(80, 70, 130, 0.5)",
        navHover: "rgba(120, 100, 255, 0.06)",
        inputBg: "rgba(0, 0, 0, 0.04)",
        inputBorder: "rgba(0, 0, 0, 0.06)",
        avatarBorder: "rgba(120, 100, 255, 0.2)",
    },
}

export function AppLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false)

    const notificationRef = useRef(null)
    const profileRef = useRef(null)

    const location = useLocation()
    const navigate = useNavigate()
    const { resolvedTheme } = useTheme()
    const { currentUser, logout } = useAuth()
    const t = palette[resolvedTheme] || palette.dark

    const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || "User"
    const initials = displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

    async function handleSignOut() {
        setShowProfileMenu(false)
        await logout()
        navigate("/")
    }

    // Close dropdowns on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false)
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="min-h-screen flex transition-colors duration-500 overflow-hidden"
            style={{ background: resolvedTheme === "dark" ? "#080810" : "#F8F7FF" }}>

            <GridBackground className="opacity-[0.15] dark:opacity-[0.08]" />

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed inset-y-0 left-0 z-50 w-72 border-r p-8 shadow-2xl lg:hidden overflow-hidden"
                            style={{ background: t.sidebarBg, borderColor: t.sidebarBorder, backdropFilter: "blur(32px)" }}
                        >
                            <AmbientOrb className="top-[-10%] left-[-10%]" size="200px" color="rgba(124, 124, 255, 0.1)" />
                            <SidebarContent location={location} setSidebarOpen={setSidebarOpen} t={t} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col lg:border-r lg:px-8 lg:py-10 lg:z-10 transition-all duration-500 overflow-hidden"
                style={{ background: t.sidebarBg, borderColor: t.sidebarBorder, backdropFilter: "blur(32px)" }}>
                <AmbientOrb className="top-[-10%] left-[-10%]" size="200px" color="rgba(124, 124, 255, 0.08)" />
                <SidebarContent location={location} t={t} />
            </div>

            {/* Main content wrapper */}
            <div className="flex flex-1 flex-col lg:pl-72 z-0 min-w-0 transition-colors duration-500 bg-transparent">
                {/* Topbar */}
                <header className="sticky top-0 z-20 flex h-20 flex-shrink-0 items-center gap-x-4 border-b px-6 sm:gap-x-8 sm:px-8 lg:px-10 transition-all duration-500"
                    style={{ background: t.headerBg, borderColor: t.headerBorder, backdropFilter: "blur(24px)" }}>
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 lg:hidden transition-colors"
                        style={{ color: t.textMuted }}
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-8">
                        <div className="flex flex-1 items-center">
                            <div className="relative w-full max-w-md group">
                                <Search className="pointer-events-none absolute inset-y-0 left-4 h-full w-4.5 transition-colors opacity-30" style={{ color: t.text }} aria-hidden="true" />
                                <input
                                    id="search-field"
                                    className="block h-12 w-full border rounded-2xl bg-white/5 dark:bg-black/20 border-white/10 dark:border-white/5 py-0 pl-11 pr-4 transition-all duration-300 focus:ring-4 focus:ring-primary/10 shadow-sm"
                                    style={{ color: t.text }}
                                    placeholder="Search everything..."
                                    type="search"
                                    name="search"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">

                            {/* Notification Dropdown */}
                            <div className="relative" ref={notificationRef}>
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    type="button"
                                    className={cn(
                                        "relative p-2.5 rounded-xl transition-all hover:scale-110 active:scale-95 border",
                                        showNotifications ? "bg-primary/10 border-primary/20 text-primary" : "bg-white/5 dark:bg-black/20 border-white/10 dark:border-white/5 text-zinc-500"
                                    )}
                                >
                                    <span className="sr-only">View notifications</span>
                                    <Bell className="h-5 w-5" aria-hidden="true" />
                                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white dark:ring-[#080810]" />
                                </button>

                                <AnimatePresence>
                                    {showNotifications && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-80 rounded-2.5xl border shadow-2xl overflow-hidden z-50 py-2"
                                            style={{ background: resolvedTheme === 'dark' ? "rgba(12, 10, 28, 0.95)" : "rgba(255, 255, 255, 0.98)", borderColor: t.sidebarBorder, backdropFilter: "blur(40px)" }}
                                        >
                                            <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                                                <h3 className="text-[11px] font-black uppercase tracking-widest opacity-40">Notifications</h3>
                                                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-80">Clear All</button>
                                            </div>
                                            <div className="max-h-[350px] overflow-y-auto scrollbar-hide py-2">
                                                <NotificationItem
                                                    icon={CheckCircle2}
                                                    iconColor="text-emerald-500"
                                                    title="Resume Scored 85%"
                                                    desc="Your 'Software Engineer' resume just hit a high score. Ready to export?"
                                                    time="2m ago"
                                                    t={t}
                                                />
                                                <NotificationItem
                                                    icon={Sparkles}
                                                    iconColor="text-primary"
                                                    title="New Template: Executive"
                                                    desc="We've added a new high-performance template for senior roles."
                                                    time="1h ago"
                                                    t={t}
                                                />
                                                <NotificationItem
                                                    icon={Clock}
                                                    iconColor="text-amber-500"
                                                    title="Draft Auto-Saved"
                                                    desc="Don't worry, your progress is safe. We just backed up your data."
                                                    time="3h ago"
                                                    t={t}
                                                />
                                            </div>
                                            <div className="px-5 py-3 border-t border-white/5 text-center">
                                                <button className="text-[11px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">View All Activity</button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="h-8 w-px transition-colors bg-white/10" aria-hidden="true" />

                            {/* Profile Dropdown */}
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center gap-3 pl-2 group cursor-pointer"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-accent p-[1.5px] transition-transform group-hover:scale-110">
                                        <div className="h-full w-full rounded-[9.5px] bg-white dark:bg-[#080810] overflow-hidden">
                                            <div className="h-full w-full bg-primary/10 flex items-center justify-center font-black text-primary text-[11px] tracking-widest uppercase">{initials}</div>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block text-left">
                                        <p className="text-sm font-bold truncate max-w-[100px]" style={{ color: t.text }}>{displayName.split(" ")[0]}</p>
                                        <p className="text-[10px] uppercase tracking-[0.15em] font-black opacity-30 flex items-center gap-1" style={{ color: t.text }}>
                                            Profile <ChevronDown className={cn("w-3 h-3 transition-transform", showProfileMenu && "rotate-180")} />
                                        </p>
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {showProfileMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-64 rounded-2.5xl border shadow-2xl overflow-hidden z-50 py-3 px-2"
                                            style={{ background: resolvedTheme === 'dark' ? "rgba(12, 10, 28, 0.95)" : "rgba(255, 255, 255, 0.98)", borderColor: t.sidebarBorder, backdropFilter: "blur(40px)" }}
                                        >
                                            <div className="px-4 py-3 mb-2 border-b border-white/5">
                                                <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-1">Signed in as</p>
                                                <p className="text-sm font-bold truncate" style={{ color: t.text }}>{currentUser?.email || ""}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <ProfileMenuItem icon={User} label="My Profile" t={t} />
                                                <ProfileMenuItem icon={SettingsIcon} label="Account Settings" href="/settings" t={t} />
                                            </div>
                                            <div className="mt-2 pt-2 border-t border-white/5">
                                                <div onClick={handleSignOut}>
                                                    <ProfileMenuItem icon={LogOut} label="Sign Out" t={t} variant="danger" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 pb-16 relative overflow-x-hidden pt-10">
                    <Container>
                        <Outlet />
                    </Container>
                </main>
            </div>
        </div>
    )
}

function SidebarContent({ location, setSidebarOpen, t }) {
    return (
        <div className="flex h-full flex-col relative z-10">
            <div className="flex items-center justify-between lg:justify-start mb-16 px-2">
                <Link to="/" className="flex items-center gap-4 group" onClick={() => setSidebarOpen?.(false)}>
                    <img
                        src="/logo.png"
                        alt="Resumind Logo"
                        className="h-64 w-auto transition-transform group-hover:scale-110"
                    />
                </Link>
                {setSidebarOpen && (
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2.5 rounded-xl transition-colors bg-white/5 dark:bg-black/20" style={{ color: t.textMuted }}>
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <nav className="flex flex-1 flex-col">
                <div className="mb-8 px-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] opacity-30 mb-8 px-4" style={{ color: t.text }}>Navigation</p>
                    <ul role="list" className="space-y-2.5">
                        {navigation.map((item) => {
                            const isActive = location.pathname.startsWith(item.href)
                            return (
                                <li key={item.name}>
                                    <Link
                                        to={item.href}
                                        onClick={() => setSidebarOpen?.(false)}
                                        className={cn(
                                            'group flex gap-x-4 rounded-2.25xl p-4 text-[14px] font-bold transition-all duration-300',
                                            isActive
                                                ? 'bg-primary text-white shadow-xl shadow-primary/25'
                                                : 'text-zinc-500 hover:bg-white/5 hover:text-primary dark:hover:bg-white/5 transition-colors'
                                        )}
                                    >
                                        <item.icon
                                            className={cn(
                                                'h-5.5 w-5.5 shrink-0 transition-all',
                                                isActive ? 'text-white' : 'opacity-60 group-hover:opacity-100 group-hover:scale-110'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/* No Upgrade CTA in free model */}
            </nav>
        </div>
    )
}

function NotificationItem({ icon: Icon, iconColor, title, desc, time, t }) {
    return (
        <div className="px-5 py-4 hover:bg-white/5 transition-colors cursor-pointer group/item border-b border-white/5 last:border-0">
            <div className="flex gap-4">
                <div className={cn("h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110", iconColor)}>
                    <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold truncate transition-colors group-hover/item:text-primary" style={{ color: t.text }}>{title}</p>
                        <span className="text-[10px] font-medium opacity-30 whitespace-nowrap ml-2" style={{ color: t.text }}>{time}</span>
                    </div>
                    <p className="text-xs leading-relaxed opacity-50 line-clamp-2" style={{ color: t.text }}>{desc}</p>
                </div>
            </div>
        </div>
    )
}

function ProfileMenuItem({ icon: Icon, label, badge, variant, href, t }) {
    const content = (
        <div className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-1.5xl transition-all cursor-pointer group/item",
            variant === 'danger' ? 'hover:bg-red-500/10 text-red-500' : 'hover:bg-primary/10 text-zinc-500 hover:text-primary'
        )}>
            <Icon className={cn("w-4.5 h-4.5 transition-transform group-hover/item:scale-110", variant === 'danger' ? 'text-red-500' : 'group-hover/item:text-primary')} />
            <span className="text-sm font-bold flex-1">{label}</span>
            {badge && (
                <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-primary/10 text-primary">{badge}</span>
            )}
        </div>
    )

    if (href) {
        return <Link to={href}>{content}</Link>
    }

    return content
}
