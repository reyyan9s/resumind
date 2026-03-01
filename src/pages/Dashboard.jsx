import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import {
    Plus, Edit2, Download, Clock, Zap, FileText,
    Sparkles, Lightbulb, TrendingUp, ArrowRight, Share2, Trash2, LogOut
} from "lucide-react"
import { Button } from "../components/ui/Button"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"
import { GlassPanel } from "../components/ui/DecorativeElements"
import { getUserResumes, createResume, deleteResume } from "../lib/resumeService"

const palette = {
    dark: {
        h1: "rgba(235,232,255,0.97)",
        sub: "rgba(180,170,230,0.55)",
        cardBg: "rgba(22,18,50,0.4)",
        cardBorder: "rgba(130,110,255,0.12)",
        previewBg: "rgba(30,22,60,0.5)",
    },
    light: {
        h1: "#1A1040",
        sub: "rgba(80,70,130,0.6)",
        cardBg: "rgba(255,255,255,0.8)",
        cardBorder: "rgba(120,100,255,0.1)",
        previewBg: "rgba(240,238,250,0.8)",
    },
}

const RESUME_COLORS = ["#7C7CFF", "#27C93F", "#FFBD44", "#FF6B6B", "#4ECDC4"]

function formatDate(timestamp) {
    if (!timestamp) return "Just created"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)
    if (diff < 60) return "Updated just now"
    if (diff < 3600) return `Updated ${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `Updated ${Math.floor(diff / 3600)}h ago`
    if (diff < 604800) return `Updated ${Math.floor(diff / 86400)}d ago`
    return `Updated ${date.toLocaleDateString()}`
}

export default function Dashboard() {
    const { resolvedTheme } = useTheme()
    const t = palette[resolvedTheme] || palette.dark
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    const [resumes, setResumes] = useState([])
    const [loadingResumes, setLoadingResumes] = useState(true)
    const [deletingId, setDeletingId] = useState(null)
    const [creating, setCreating] = useState(false)

    useEffect(() => {
        if (!currentUser) return
        const unsubscribe = getUserResumes(currentUser.uid, (data) => {
            setResumes(data)
            setLoadingResumes(false)
        })
        return unsubscribe
    }, [currentUser])

    async function handleCreateResume() {
        if (creating) return
        setCreating(true)
        try {
            const id = await createResume(currentUser.uid)
            navigate(`/builder?id=${id}`)
        } catch (err) {
            console.error("Failed to create resume:", err)
            setCreating(false)
        }
    }

    async function handleDelete(e, resumeId) {
        e.stopPropagation()
        if (deletingId) return
        setDeletingId(resumeId)
        try {
            await deleteResume(resumeId)
        } catch (err) {
            console.error("Failed to delete resume:", err)
        } finally {
            setDeletingId(null)
        }
    }

    async function handleLogout() {
        await logout()
        navigate("/")
    }

    const firstName = currentUser?.displayName?.split(" ")[0] || "there"

    return (
        <div className="px-4 lg:px-6 w-full max-w-[1600px] mx-auto pb-20 transition-colors duration-500">
            <div className="flex flex-col lg:flex-row gap-10">

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full mb-4 text-[10px] font-black uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/20">
                                <Zap className="w-3.5 h-3.5 fill-current" /> My Workspace
                            </div>
                            <h1 className="text-4xl font-black tracking-tight mb-2" style={{ color: t.h1 }}>
                                Hey, {firstName} 👋
                            </h1>
                            <p className="text-[15px] font-medium opacity-50" style={{ color: t.sub }}>
                                {resumes.length === 0
                                    ? "Create your first resume to get started."
                                    : `You have ${resumes.length} resume${resumes.length === 1 ? "" : "s"} in your vault.`}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleCreateResume}
                                disabled={creating}
                                className="rounded-2xl h-14 px-8 shadow-2xl shadow-primary/30 font-black text-[15px] transition-all hover:scale-[1.05] active:scale-95 flex items-center gap-2"
                            >
                                <Plus className="w-5.5 h-5.5 stroke-[3px]" />
                                {creating ? "Creating..." : "Create New"}
                            </Button>
                            <button
                                onClick={handleLogout}
                                className="h-14 w-14 rounded-2xl border flex items-center justify-center opacity-40 hover:opacity-100 transition-all hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500"
                                style={{ borderColor: t.cardBorder, color: t.h1 }}
                                title="Sign out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {/* New Resume CTA */}
                        <button
                            onClick={handleCreateResume}
                            disabled={creating}
                            className="group h-[420px] rounded-[2.5rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-10 text-center hover:bg-primary/5 hover:border-primary/40"
                            style={{ borderColor: "rgba(124,124,255,0.15)", background: "rgba(124,124,255,0.02)" }}
                        >
                            <div className="h-20 w-20 rounded-[1.75rem] bg-primary/10 text-primary flex items-center justify-center mb-8 transition-all group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_20px_50px_rgba(124,124,255,0.3)]">
                                <Plus className="w-10 h-10 stroke-[2.5px]" />
                            </div>
                            <h3 className="font-black text-xl mb-3" style={{ color: t.h1 }}>Design New Narrative</h3>
                            <p className="text-[13px] font-medium leading-relaxed opacity-40 max-w-[180px]" style={{ color: t.sub }}>
                                Open the visual builder and start a fresh professional story.
                            </p>
                        </button>

                        {/* Loading Skeletons */}
                        {loadingResumes && [1, 2].map(i => (
                            <div key={i} className="h-[420px] rounded-[2.5rem] animate-pulse" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }} />
                        ))}

                        {/* Resume Cards */}
                        {!loadingResumes && resumes.map((resume, i) => {
                            const color = RESUME_COLORS[i % RESUME_COLORS.length]
                            const isDeleting = deletingId === resume.id
                            return (
                                <motion.div
                                    key={resume.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: isDeleting ? 0.4 : 1, y: 0 }}
                                    transition={{ delay: i * 0.07 }}
                                    className="group flex flex-col h-[420px]"
                                >
                                    <div
                                        className="flex-1 rounded-[2.5rem] overflow-hidden relative transition-all duration-700 transform group-hover:-translate-y-3 group-hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
                                        style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: "blur(40px)" }}
                                    >
                                        {/* Paper Preview */}
                                        <div
                                            className="absolute inset-x-12 top-14 bottom-0 p-8 transform-gpu transition-all duration-700 group-hover:scale-[1.08] group-hover:-rotate-2 rounded-t-xl opacity-40 group-hover:opacity-100"
                                            style={{ background: t.previewBg, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                                        >
                                            <div className="relative h-full w-full bg-white rounded-t-sm p-6 overflow-hidden">
                                                <div className="h-6 w-1/2 bg-slate-200 mb-6" />
                                                <div className="space-y-3">
                                                    <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                                                    <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                                                    <div className="h-1.5 w-3/4 bg-slate-50 rounded-full" />
                                                </div>
                                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                                    <Sparkles className="w-16 h-16 text-primary" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Score Badge */}
                                        <div className="absolute top-6 left-6 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl">
                                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
                                            <span className="text-[10px] font-black tracking-widest text-white uppercase">{resume.templateId || "minimalist"}</span>
                                        </div>

                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 p-10 translate-y-4 group-hover:translate-y-0">
                                            <Button
                                                onClick={() => navigate(`/builder?id=${resume.id}`)}
                                                className="w-full h-13 rounded-2xl shadow-2xl font-black text-[15px] bg-white text-primary hover:bg-white/95"
                                            >
                                                <Edit2 className="w-4.5 h-4.5 mr-2.5" /> Edit Resume
                                            </Button>
                                            <div className="flex gap-3 w-full">
                                                <Button variant="outline" className="flex-1 h-12 rounded-xl bg-white/10 text-white border-white/20 hover:bg-white/20 text-[13px] font-bold">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                                <Button variant="outline" className="flex-1 h-12 rounded-xl bg-white/10 text-white border-white/20 hover:bg-white/20 text-[13px] font-bold">
                                                    <Share2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 px-4 flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-[17px] mb-1 group-hover:text-primary transition-colors" style={{ color: t.h1 }}>
                                                {resume.name || resume.role || "Untitled Resume"}
                                            </h3>
                                            <div className="flex items-center gap-2 opacity-30">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-black tracking-widest uppercase">
                                                    {formatDate(resume.updatedAt)}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => handleDelete(e, resume.id)}
                                            disabled={!!deletingId}
                                            className="h-10 w-10 rounded-xl flex items-center justify-center transition-all hover:bg-red-500/10 hover:text-red-500 active:scale-95 opacity-20 hover:opacity-100"
                                            style={{ color: t.h1 }}
                                        >
                                            <Trash2 className="w-4.5 h-4.5" />
                                        </button>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Widgets Sidebar */}
                <div className="lg:w-[320px] flex flex-col gap-8">
                    {/* Progress Widget */}
                    <GlassPanel className="p-8" intensity="medium">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40" style={{ color: t.h1 }}>AI Recommendations</h4>
                            <Lightbulb className="w-4 h-4 text-primary" />
                        </div>
                        <div className="space-y-6">
                            {[
                                { title: "Improve Tech Stack", desc: "Add more cloud-native skills to increase ATS matching.", score: "+12%" },
                                { title: "Refine Summary", desc: "Your executive summary is a bit too brief.", score: "+5%" },
                            ].map((tip, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-sm font-bold" style={{ color: t.h1 }}>{tip.title}</p>
                                        <span className="text-[10px] font-black text-emerald-500">{tip.score}</span>
                                    </div>
                                    <p className="text-[12px] font-medium opacity-40 leading-relaxed mb-3" style={{ color: t.sub }}>{tip.desc}</p>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary/40 w-0 group-hover:w-full transition-all duration-1000" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassPanel>

                    {/* Blog/Insights Widget */}
                    <div className="rounded-[2.5rem] p-8 border border-white/5 bg-white/5 group cursor-pointer transition-all hover:bg-white/[0.08]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-sm" style={{ color: t.h1 }}>Career Insights</h4>
                        </div>
                        <p className="text-sm font-bold mb-4 leading-tight group-hover:text-primary transition-colors" style={{ color: t.h1 }}>
                            How to negotiate your salary in the tech winter of 2026.
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-30" style={{ color: t.h1 }}>4 min read</span>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <GlassPanel className="p-8 border-dashed border-2" intensity="low">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-2" style={{ color: t.h1 }}>Resumes</p>
                                <p className="text-2xl font-black" style={{ color: t.h1 }}>{loadingResumes ? "—" : resumes.length}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-2" style={{ color: t.h1 }}>Account</p>
                                <p className="text-[11px] font-black" style={{ color: t.h1 }}>
                                    {currentUser?.email?.split("@")[0] || "—"}
                                </p>
                            </div>
                        </div>
                    </GlassPanel>
                </div>
            </div>
        </div>
    )
}
