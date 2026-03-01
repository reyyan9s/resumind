import { useState, useMemo, useEffect, useRef, useCallback } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
    ChevronLeft, LayoutTemplate, Download, Settings,
    User, Briefcase, GraduationCap, ChevronDown, ChevronRight,
    Code, Sparkles, Wand2, FileText, Layout, Plus, Check, Cloud, X, Trash2, PenLine, BookOpen
} from "lucide-react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { GridBackground, AmbientOrb, GlassPanel } from "../components/ui/DecorativeElements"
import { templates } from "../data/templates"
import { ResumeLayout } from "../components/resume/TemplateLayouts"
import { getResume, createResume, updateResume } from "../lib/resumeService"
import { rewriteSummary } from "../lib/ai"

const SECTIONS = [
    { id: 'personal', title: 'Personal Info', icon: User },
    { id: 'summary', title: 'Professional Summary', icon: Settings },
    { id: 'experience', title: 'Work Experience', icon: Briefcase },
    { id: 'education', title: 'Education', icon: GraduationCap },
    { id: 'skills', title: 'Skills', icon: Code }
]

const palette = {
    dark: {
        headerBg: "rgba(12, 10, 28, 0.75)",
        headerBorder: "rgba(130, 110, 255, 0.15)",
        editorBg: "rgba(15, 12, 35, 0.6)",
        editorBorder: "rgba(130, 110, 255, 0.12)",
        previewBg: "#090A10",
        h1: "rgba(235,232,255,0.97)",
        text: "rgba(235,232,255,0.92)",
        textMuted: "rgba(170,160,215,0.5)",
        cardBg: "rgba(255,255,255,0.03)",
        cardBorder: "rgba(255,255,255,0.06)",
        activeCardBg: "rgba(120,100,255,0.08)",
        inputBg: "rgba(255,255,255,0.04)",
        inputBorder: "rgba(255,255,255,0.08)",
    },
    light: {
        headerBg: "rgba(255, 255, 255, 0.85)",
        headerBorder: "rgba(0, 0, 0, 0.05)",
        editorBg: "rgba(248, 247, 255, 0.75)",
        editorBorder: "rgba(120, 100, 255, 0.08)",
        previewBg: "#F4F6FB",
        h1: "#1A1040",
        text: "#1A1040",
        textMuted: "rgba(80, 70, 130, 0.5)",
        cardBg: "rgba(255,255,255,0.7)",
        cardBorder: "rgba(0,0,0,0.04)",
        activeCardBg: "rgba(120,100,255,0.05)",
        inputBg: "white",
        inputBorder: "rgba(0,0,0,0.08)",
    },
}

const DEFAULT_DATA = {
    name: '',
    role: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    customSections: [],
    templateId: 'minimalist',
}

export default function Builder() {
    const { resolvedTheme } = useTheme()
    const { currentUser } = useAuth()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const t = palette[resolvedTheme] || palette.dark
    const [activeSection, setActiveSection] = useState('personal')

    const resumeId = searchParams.get('id')
    const [resumeData, setResumeData] = useState(DEFAULT_DATA)
    const [saveStatus, setSaveStatus] = useState('saved') // 'saved' | 'saving' | 'unsaved'
    const [loading, setLoading] = useState(!!resumeId)
    const [aiLoading, setAiLoading] = useState(false)

    async function handleAIRewrite() {
        setAiLoading(true)
        try {
            const result = await rewriteSummary(resumeData)
            updateData('summary', result)
        } catch (err) {
            console.error('AI rewrite failed:', err)
            alert(`AI rewrite failed: ${err?.message || String(err)}`)
        } finally {
            setAiLoading(false)
        }
    }
    // ── Array helpers ──────────────────────────────────────
    const DEFAULTS = {
        experience: { company: '', role: '', period: '', desc: '' },
        education: { school: '', degree: '', period: '' },
    }
    function addItem(section) {
        setResumeData(prev => ({ ...prev, [section]: [...prev[section], { ...DEFAULTS[section] }] }))
    }
    function updateItem(section, idx, field, value) {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) => i === idx ? { ...item, [field]: value } : item)
        }))
    }
    function removeItem(section, idx) {
        setResumeData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== idx) }))
    }
    function addSkill(skill) {
        const s = skill.trim()
        if (s && !resumeData.skills.includes(s))
            setResumeData(prev => ({ ...prev, skills: [...prev.skills, s] }))
    }
    function removeSkill(idx) {
        setResumeData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }))
    }
    // ──────────────────────────────────────────────────────
    // ── Custom section helpers ────────────────────────────────
    function addCustomSection(title) {
        const id = 'custom_' + Date.now()
        setResumeData(prev => ({
            ...prev,
            customSections: [...(prev.customSections || []), { id, title, entries: [] }]
        }))
        setActiveSection(id)
    }
    function renameCustomSection(id, title) {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s => s.id === id ? { ...s, title } : s)
        }))
    }
    function deleteCustomSection(id) {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.filter(s => s.id !== id)
        }))
        setActiveSection('personal')
    }
    function addCustomEntry(sectionId) {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s =>
                s.id === sectionId
                    ? { ...s, entries: [...s.entries, { title: '', subtitle: '', period: '', description: '' }] }
                    : s
            )
        }))
    }
    function updateCustomEntry(sectionId, idx, field, value) {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s =>
                s.id === sectionId
                    ? { ...s, entries: s.entries.map((e, i) => i === idx ? { ...e, [field]: value } : e) }
                    : s
            )
        }))
    }
    function removeCustomEntry(sectionId, idx) {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s =>
                s.id === sectionId
                    ? { ...s, entries: s.entries.filter((_, i) => i !== idx) }
                    : s
            )
        }))
    }
    const [addingSectionName, setAddingSectionName] = useState('')
    const [showAddSection, setShowAddSection] = useState(false)
    // ──────────────────────────────────────────────────────
    const saveTimerRef = useRef(null)
    const documentIdRef = useRef(resumeId) // tracks the Firestore doc id (even if created mid-session)

    const templateId = resumeData.templateId || 'minimalist'
    const selectedTemplate = useMemo(() =>
        templates.find(temp => temp.id === templateId) || templates[0]
        , [templateId])

    // Load existing resume
    useEffect(() => {
        if (!resumeId || !currentUser) return
        setLoading(true)
        getResume(resumeId).then(data => {
            if (data) {
                const { id, userId, createdAt, updatedAt, ...rest } = data
                setResumeData(prev => ({ ...DEFAULT_DATA, ...rest }))
                documentIdRef.current = resumeId
            }
            setLoading(false)
        })
    }, [resumeId, currentUser])

    // Auto-save with debounce
    const save = useCallback(async (data) => {
        if (!currentUser) return
        setSaveStatus('saving')
        try {
            if (documentIdRef.current) {
                await updateResume(documentIdRef.current, { ...data, name: data.role || data.name || "Untitled Resume" })
            } else {
                // No id yet — create a new doc
                const newId = await createResume(currentUser.uid, { ...data, name: data.role || data.name || "Untitled Resume" })
                documentIdRef.current = newId
                navigate(`/builder?id=${newId}`, { replace: true })
            }
            setSaveStatus('saved')
        } catch (err) {
            console.error("Auto-save failed:", err)
            setSaveStatus('unsaved')
        }
    }, [currentUser, navigate])

    const updateData = (field, value) => {
        setResumeData(prev => {
            const next = { ...prev, [field]: value }
            setSaveStatus('unsaved')
            if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
            saveTimerRef.current = setTimeout(() => save(next), 1200)
            return next
        })
    }

    // Cleanup timer on unmount
    useEffect(() => () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current) }, [])

    const saveLabel = saveStatus === 'saving' ? 'Saving...' : saveStatus === 'unsaved' ? 'Unsaved changes' : 'Auto-saved'
    const SaveIcon = saveStatus === 'saved' ? Check : Cloud

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center" style={{ background: t.previewBg }}>
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center animate-pulse">
                        <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-30" style={{ color: t.text }}>Loading resume...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen w-full flex flex-col overflow-hidden transition-colors duration-500" style={{ background: t.previewBg }}>
            {/* Top Navbar */}
            <header className="h-20 border-b flex flex-shrink-0 items-center justify-between px-8 z-20 shadow-sm relative"
                style={{ background: t.headerBg, borderColor: t.headerBorder, backdropFilter: "blur(24px)" }}>
                <div className="flex items-center gap-8">
                    <Link to="/dashboard" className="transition-all flex items-center gap-2 text-[13px] font-black uppercase tracking-widest group opacity-40 hover:opacity-100" style={{ color: t.text }}>
                        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back
                    </Link>
                    <div className="h-6 w-px bg-white/10" />
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black tracking-tight" style={{ color: t.h1 }}>
                                {resumeData.role || 'New Resume'} <span className="opacity-30 mx-2 font-medium">•</span> {selectedTemplate.name}
                            </h1>
                            <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 flex items-center gap-1.5 ${saveStatus === 'saved' ? 'text-emerald-500' : saveStatus === 'saving' ? 'text-primary' : 'text-amber-500'} opacity-60`}>
                                <SaveIcon className="w-3 h-3" />
                                {saveLabel}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/templates">
                        <Button variant="outline" size="sm" className="hidden sm:flex rounded-xl h-11 px-5 border-white/10 bg-white/5 font-bold text-[13px]" style={{ color: t.text }}>
                            <LayoutTemplate className="w-4 h-4 mr-2" /> Templates
                        </Button>
                    </Link>
                    <Button size="sm" className="h-11 px-6 rounded-xl shadow-2xl shadow-primary/25 font-black text-[13px]">
                        <Download className="w-4 h-4 mr-2" /> Export PDF
                    </Button>
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex-1 flex overflow-hidden">

                {/* Left Side: Editor */}
                <div className="w-full lg:w-[500px] flex-shrink-0 border-r flex flex-col z-10 shadow-2xl transition-all duration-500 relative overflow-hidden"
                    style={{ background: t.editorBg, borderColor: t.headerBorder, backdropFilter: "blur(40px)" }}>

                    <AmbientOrb className="top-[-10%] left-[-10%]" size="300px" color="rgba(124, 124, 255, 0.05)" />

                    <div className="flex-1 overflow-y-auto p-8 space-y-5 scrollbar-hide relative z-10">
                        <div className="flex items-center justify-between mb-8 px-1">
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                                <span className="text-[11px] font-black uppercase tracking-[0.25em] opacity-30" style={{ color: t.text }}>Content Architecture</span>
                            </div>
                            <button className="text-[11px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                                <Layout className="w-3.5 h-3.5" /> Reorder
                            </button>
                        </div>

                        {SECTIONS.map((section, idx) => {
                            const isActive = activeSection === section.id
                            const Icon = section.icon

                            return (
                                <motion.div key={section.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="rounded-[2rem] transition-all duration-500 overflow-hidden"
                                    style={{
                                        background: isActive ? t.activeCardBg : t.cardBg,
                                        border: `1px solid ${isActive ? "rgba(124,124,255,0.3)" : t.cardBorder}`,
                                        boxShadow: isActive ? "0 20px 40px -10px rgba(0,0,0,0.2)" : "none"
                                    }}>
                                    <button
                                        onClick={() => setActiveSection(isActive ? null : section.id)}
                                        className="w-full flex items-center justify-between p-5 transition-all text-left"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={cn(
                                                "h-11 w-11 rounded-1.5xl flex items-center justify-center transition-all",
                                                isActive ? 'bg-primary text-white shadow-xl shadow-primary/30 rotate-3' : 'bg-white/5 text-primary border border-white/5'
                                            )}>
                                                <Icon className="w-5.5 h-5.5" />
                                            </div>
                                            <div>
                                                <span className="font-black text-[15px] block" style={{ color: isActive ? t.h1 : t.text }}>{section.title}</span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-30" style={{ color: t.text }}>
                                                    {isActive ? 'Currently Editing' : 'Click to expand'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="h-8 w-8 rounded-full flex items-center justify-center transition-all group-hover:bg-white/5" style={{ color: t.text }}>
                                            {isActive ? <ChevronDown className="w-4.5 h-4.5 opacity-30" /> : <ChevronRight className="w-4.5 h-4.5 opacity-10" />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                className="border-t px-8 pb-10 pt-8 space-y-6"
                                                style={{ borderColor: t.cardBorder }}
                                            >
                                                {section.id === 'personal' && (
                                                    <div className="space-y-5">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Full Legal Name</label>
                                                            <Input value={resumeData.name} className="h-12 rounded-1.5xl bg-white/5 border-white/10" style={{ color: t.text }} onChange={(e) => updateData('name', e.target.value)} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Current / Focus Role</label>
                                                            <Input value={resumeData.role} className="h-12 rounded-1.5xl bg-white/5 border-white/10" style={{ color: t.text }} onChange={(e) => updateData('role', e.target.value)} />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-5">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Email Address</label>
                                                                <Input value={resumeData.email} className="h-12 rounded-1.5xl bg-white/5 border-white/10" style={{ color: t.text }} onChange={(e) => updateData('email', e.target.value)} />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Contact Number</label>
                                                                <Input value={resumeData.phone} className="h-12 rounded-1.5xl bg-white/5 border-white/10" style={{ color: t.text }} onChange={(e) => updateData('phone', e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Location / Address</label>
                                                            <Input value={resumeData.location || ''} placeholder="e.g. New York, NY" className="h-12 rounded-1.5xl bg-white/5 border-white/10" style={{ color: t.text }} onChange={(e) => updateData('location', e.target.value)} />
                                                        </div>
                                                    </div>
                                                )}

                                                {section.id === 'summary' && (
                                                    <div className="space-y-6">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Executive Summary</label>
                                                            <textarea
                                                                className="w-full min-h-[160px] rounded-[1.5rem] border bg-white/5 px-5 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none scrollbar-hide"
                                                                style={{ borderColor: "rgba(255,255,255,0.08)", color: t.text }}
                                                                value={resumeData.summary}
                                                                onChange={(e) => updateData('summary', e.target.value)}
                                                            />
                                                        </div>
                                                        <Button
                                                            variant="secondary"
                                                            size="sm"
                                                            disabled={aiLoading}
                                                            onClick={handleAIRewrite}
                                                            className="w-full h-12 rounded-1.5xl text-[13px] font-black gap-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {aiLoading
                                                                ? <><Sparkles className="w-4 h-4 animate-spin" /> Rewriting…</>
                                                                : <><Wand2 className="w-4 h-4" /> Rewrite with AI Assistant</>}
                                                        </Button>
                                                    </div>
                                                )}

                                                {/* ── Work Experience ── */}
                                                {section.id === 'experience' && (
                                                    <div className="space-y-4">
                                                        {resumeData.experience.map((exp, i) => (
                                                            <div key={i} className="rounded-2xl border p-4 space-y-3 relative" style={{ background: t.inputBg, borderColor: t.inputBorder }}>
                                                                <button onClick={() => removeItem('experience', i)} className="absolute top-3 right-3 h-7 w-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all"><X className="w-3.5 h-3.5" /></button>
                                                                <div className="grid grid-cols-2 gap-3">
                                                                    <div className="space-y-1">
                                                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Company</label>
                                                                        <Input value={exp.company} className="h-10 rounded-xl bg-white/5 border-white/10 text-sm" style={{ color: t.text }} onChange={(e) => updateItem('experience', i, 'company', e.target.value)} placeholder="Company name" />
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Job Title</label>
                                                                        <Input value={exp.role} className="h-10 rounded-xl bg-white/5 border-white/10 text-sm" style={{ color: t.text }} onChange={(e) => updateItem('experience', i, 'role', e.target.value)} placeholder="Your role" />
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Period</label>
                                                                    <Input value={exp.period} className="h-10 rounded-xl bg-white/5 border-white/10 text-sm" style={{ color: t.text }} onChange={(e) => updateItem('experience', i, 'period', e.target.value)} placeholder="e.g. Jan 2022 – Present" />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Description</label>
                                                                    <textarea className="w-full min-h-[80px] rounded-xl border bg-white/5 px-4 py-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none scrollbar-hide" style={{ borderColor: 'rgba(255,255,255,0.08)', color: t.text }} value={exp.desc} onChange={(e) => updateItem('experience', i, 'desc', e.target.value)} placeholder="Describe your achievements…" />
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {resumeData.experience.length === 0 && (
                                                            <div className="text-center py-8 rounded-2xl bg-white/5 border border-dashed border-white/10">
                                                                <Plus className="w-5 h-5 opacity-20 mx-auto mb-2" />
                                                                <p className="text-[11px] font-bold uppercase tracking-widest opacity-20" style={{ color: t.text }}>No experience added yet</p>
                                                            </div>
                                                        )}
                                                        <Button onClick={() => addItem('experience')} variant="outline" size="sm" className="w-full h-10 rounded-xl text-[12px] font-black border-white/10 gap-2" style={{ background: t.inputBg, color: t.text }}><Plus className="w-4 h-4" /> Add Work Experience</Button>
                                                    </div>
                                                )}

                                                {/* ── Education ── */}
                                                {section.id === 'education' && (
                                                    <div className="space-y-4">
                                                        {resumeData.education.map((edu, i) => (
                                                            <div key={i} className="rounded-2xl border p-4 space-y-3 relative" style={{ background: t.inputBg, borderColor: t.inputBorder }}>
                                                                <button onClick={() => removeItem('education', i)} className="absolute top-3 right-3 h-7 w-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all"><X className="w-3.5 h-3.5" /></button>
                                                                <div className="space-y-1">
                                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>School / University</label>
                                                                    <Input value={edu.school} className="h-10 rounded-xl bg-white/5 border-white/10 text-sm" style={{ color: t.text }} onChange={(e) => updateItem('education', i, 'school', e.target.value)} placeholder="University name" />
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-3">
                                                                    <div className="space-y-1">
                                                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Degree</label>
                                                                        <Input value={edu.degree} className="h-10 rounded-xl bg-white/5 border-white/10 text-sm" style={{ color: t.text }} onChange={(e) => updateItem('education', i, 'degree', e.target.value)} placeholder="e.g. B.Tech CS" />
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Period</label>
                                                                        <Input value={edu.period} className="h-10 rounded-xl bg-white/5 border-white/10 text-sm" style={{ color: t.text }} onChange={(e) => updateItem('education', i, 'period', e.target.value)} placeholder="e.g. 2020 – 2024" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {resumeData.education.length === 0 && (
                                                            <div className="text-center py-8 rounded-2xl bg-white/5 border border-dashed border-white/10">
                                                                <Plus className="w-5 h-5 opacity-20 mx-auto mb-2" />
                                                                <p className="text-[11px] font-bold uppercase tracking-widest opacity-20" style={{ color: t.text }}>No education added yet</p>
                                                            </div>
                                                        )}
                                                        <Button onClick={() => addItem('education')} variant="outline" size="sm" className="w-full h-10 rounded-xl text-[12px] font-black border-white/10 gap-2" style={{ background: t.inputBg, color: t.text }}><Plus className="w-4 h-4" /> Add Education</Button>
                                                    </div>
                                                )}

                                                {/* ── Skills ── */}
                                                {section.id === 'skills' && (
                                                    <div className="space-y-4">
                                                        <div className="flex flex-wrap gap-2 min-h-[40px]">
                                                            {resumeData.skills.map((skill, i) => (
                                                                <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold bg-primary/10 text-primary">
                                                                    {skill}
                                                                    <button onClick={() => removeSkill(i)} className="hover:text-red-400 transition-colors"><X className="w-3 h-3" /></button>
                                                                </span>
                                                            ))}
                                                            {resumeData.skills.length === 0 && <p className="text-[11px] font-bold uppercase tracking-widest opacity-20 py-2" style={{ color: t.text }}>No skills added yet</p>}
                                                        </div>
                                                        <form onSubmit={(e) => { e.preventDefault(); addSkill(e.target.skill.value); e.target.reset(); }} className="flex gap-2">
                                                            <Input name="skill" className="h-10 flex-1 rounded-xl bg-white/5 border-white/10 text-sm" style={{ color: t.text }} placeholder="e.g. React, Python, Leadership" />
                                                            <Button type="submit" size="sm" className="h-10 px-4 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-[12px] font-black">Add</Button>
                                                        </form>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )
                        })}

                        {/* ── Custom Sections ── */}
                        {(resumeData.customSections || []).map((cs) => {
                            const isActive = activeSection === cs.id
                            return (
                                <motion.div key={cs.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="rounded-[1.75rem] border overflow-hidden transition-all duration-500"
                                    style={{ background: isActive ? t.activeCardBg : t.cardBg, borderColor: isActive ? 'rgba(120,100,255,0.25)' : t.cardBorder }}
                                >
                                    <button
                                        onClick={() => setActiveSection(isActive ? null : cs.id)}
                                        className="w-full flex items-center gap-4 p-5 text-left"
                                    >
                                        <div className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: isActive ? 'rgba(120,100,255,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isActive ? 'rgba(120,100,255,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
                                            <BookOpen className="w-5 h-5" style={{ color: isActive ? '#8b7cf8' : 'rgba(255,255,255,0.3)' }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-black text-[15px] tracking-tight truncate" style={{ color: t.h1 }}>{cs.title || 'Custom Section'}</div>
                                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5 opacity-30" style={{ color: t.text }}>{isActive ? 'Currently Editing' : 'Click to Expand'}</div>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${isActive ? 'rotate-90' : ''}`} style={{ color: t.textMuted }} />
                                    </button>

                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-5 pb-5 space-y-4 border-t" style={{ borderColor: t.cardBorder }}>
                                                    {/* Section name edit */}
                                                    <div className="flex gap-2 pt-4">
                                                        <Input
                                                            value={cs.title}
                                                            className="h-10 flex-1 rounded-xl bg-white/5 border-white/10 text-sm font-bold"
                                                            style={{ color: t.text }}
                                                            placeholder="Section name"
                                                            onChange={(e) => renameCustomSection(cs.id, e.target.value)}
                                                        />
                                                        <button
                                                            onClick={() => deleteCustomSection(cs.id)}
                                                            className="h-10 px-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-1.5 text-[12px] font-black"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" /> Delete Section
                                                        </button>
                                                    </div>

                                                    {/* Sub-entries */}
                                                    {cs.entries.map((entry, ei) => (
                                                        <div key={ei} className="rounded-2xl border p-4 space-y-3 relative" style={{ background: t.inputBg, borderColor: t.inputBorder }}>
                                                            <button onClick={() => removeCustomEntry(cs.id, ei)} className="absolute top-3 right-3 h-7 w-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all"><X className="w-3.5 h-3.5" /></button>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <div className="space-y-1">
                                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Title</label>
                                                                    <Input value={entry.title} className="h-10 rounded-xl bg-white/5 border-white/10 text-sm" style={{ color: t.text }} onChange={(e) => updateCustomEntry(cs.id, ei, 'title', e.target.value)} placeholder="e.g. Project name" />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Subtitle</label>
                                                                    <Input value={entry.subtitle} className="h-10 rounded-xl bg-white/5 border-white/10 text-sm" style={{ color: t.text }} onChange={(e) => updateCustomEntry(cs.id, ei, 'subtitle', e.target.value)} placeholder="e.g. Tech stack / role" />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Period / Date</label>
                                                                <Input value={entry.period} className="h-10 rounded-xl bg-white/5 border-white/10 text-sm" style={{ color: t.text }} onChange={(e) => updateCustomEntry(cs.id, ei, 'period', e.target.value)} placeholder="e.g. Mar 2024" />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-1" style={{ color: t.text }}>Description</label>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {cs.entries.length === 0 && (
                                                        <div className="text-center py-6 rounded-2xl bg-white/5 border border-dashed border-white/10">
                                                            <Plus className="w-4 h-4 opacity-20 mx-auto mb-1" />
                                                            <p className="text-[11px] font-bold uppercase tracking-widest opacity-20" style={{ color: t.text }}>No entries yet</p>
                                                        </div>
                                                    )}

                                                    <Button onClick={() => addCustomEntry(cs.id)} variant="outline" size="sm" className="w-full h-10 rounded-xl text-[12px] font-black border-white/10 gap-2" style={{ background: t.inputBg, color: t.text }}>
                                                        <Plus className="w-4 h-4" /> Add Entry
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )
                        })}

                        {/* ── Add Section ── */}
                        {showAddSection ? (
                            <form
                                onSubmit={(e) => { e.preventDefault(); if (addingSectionName.trim()) { addCustomSection(addingSectionName.trim()); setAddingSectionName(''); setShowAddSection(false); } }}
                                className="flex gap-2"
                            >
                                <Input
                                    autoFocus
                                    value={addingSectionName}
                                    onChange={(e) => setAddingSectionName(e.target.value)}
                                    placeholder="Section name (e.g. Projects, Certifications)"
                                    className="h-11 flex-1 rounded-xl bg-white/5 border-white/10 text-sm"
                                    style={{ color: t.text }}
                                />
                                <Button type="submit" size="sm" className="h-11 px-4 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white text-[12px] font-black">Add</Button>
                                <button type="button" onClick={() => setShowAddSection(false)} className="h-11 w-11 flex items-center justify-center rounded-xl hover:bg-white/5 transition-all" style={{ color: t.textMuted }}><X className="w-4 h-4" /></button>
                            </form>
                        ) : (
                            <button
                                onClick={() => setShowAddSection(true)}
                                className="w-full h-12 rounded-2xl border border-dashed flex items-center justify-center gap-2 text-[12px] font-black uppercase tracking-widest transition-all hover:bg-primary/5 hover:border-primary/30 hover:text-primary"
                                style={{ borderColor: t.cardBorder, color: t.textMuted }}
                            >
                                <Plus className="w-4 h-4" /> Add Section
                            </button>
                        )}

                    </div>
                </div>

                {/* Right Side: PDF Live Preview */}
                <div className="flex-1 hidden lg:flex overflow-y-auto relative p-16 items-start justify-center scrollbar-hide">
                    <GridBackground className="opacity-[0.1] dark:opacity-[0.05]" />
                    <AmbientOrb className="bottom-[-10%] right-[-10%]" size="500px" color="rgba(124, 124, 255, 0.08)" />

                    {/* Zoom & Page Controls */}
                    <div className="fixed right-10 bottom-10 flex items-center gap-1.5 backdrop-blur-3xl p-2 rounded-[1.25rem] shadow-2xl border z-20 group"
                        style={{ background: t.headerBg, borderColor: t.headerBorder }}>
                        <button className="h-9 w-9 flex items-center justify-center rounded-xl transition-all hover:bg-primary/20 hover:text-primary opacity-40 hover:opacity-100" style={{ color: t.text }}>-</button>
                        <div className="h-9 px-4 flex items-center justify-center text-[11px] font-black uppercase tracking-widest min-w-[5rem]" style={{ color: t.text }}>100% Zoom</div>
                        <button className="h-9 w-9 flex items-center justify-center rounded-xl transition-all hover:bg-primary/20 hover:text-primary opacity-40 hover:opacity-100" style={{ color: t.text }}>+</button>
                    </div>

                    {/* The Resume A4 Paper */}
                    <motion.div
                        key={templateId}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={cn(
                            "w-[8.5in] min-h-[11in] bg-white shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] text-black shrink-0 relative mb-32 group",
                            templateId === 'academic' ? 'p-[1.2in]' : 'p-[0.75in]'
                        )}>

                        <div className="absolute inset-0 border-8 border-transparent group-hover:border-primary/5 transition-all pointer-events-none" />

                        <ResumeLayout templateId={templateId} data={resumeData} />
                    </motion.div>
                </div>
            </main>
        </div>
    )
}

const cn = (...classes) => classes.filter(Boolean).join(' ')
