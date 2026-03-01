import { useMemo } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { ArrowLeft, Download, Share2, Globe, Printer } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useTheme } from "../context/ThemeContext"
import { motion } from "framer-motion"
import { ResumeLayout } from "../components/resume/TemplateLayouts"
import { templates } from "../data/templates"

const palette = {
    dark: {
        headerBg: "rgba(12, 10, 28, 0.72)",
        headerBorder: "rgba(130, 110, 255, 0.15)",
        pageBg: "#090A10",
        text: "rgba(235,232,255,0.92)",
        textMuted: "rgba(170,160,215,0.5)",
        btnBg: "rgba(255,255,255,0.03)",
        btnBorder: "rgba(255,255,255,0.08)",
    },
    light: {
        headerBg: "rgba(255, 255, 255, 0.82)",
        headerBorder: "rgba(0, 0, 0, 0.05)",
        pageBg: "#F0F2F5",
        text: "#1A1040",
        textMuted: "rgba(80, 70, 130, 0.5)",
        btnBg: "white",
        btnBorder: "rgba(0,0,0,0.08)",
    },
}

export default function Preview() {
    const { resolvedTheme } = useTheme()
    const [searchParams] = useSearchParams()
    const t = palette[resolvedTheme] || palette.dark

    const templateId = searchParams.get('template') || 'minimalist'
    const selectedTemplate = useMemo(() =>
        templates.find(temp => temp.id === templateId) || templates[0]
        , [templateId])

    // Mock data (in a real app, this would come from global state or API)
    const resumeData = {
        name: 'Jane Doe',
        role: 'Senior Product Designer',
        email: 'jane@example.com',
        phone: '+1 (555) 123-4567',
        summary: 'Award-winning product designer with 8+ years of experience in enterprise SaaS. Passionate about creating intuitive, accessible, and beautiful user interfaces that solve complex business problems.',
        experience: [
            {
                company: 'Google',
                role: 'Senior UI UX Designer',
                period: '2020 - Present',
                desc: 'Lead designer for Google Workspace core collaboration features, directing a team of 4 junior designers. Increased daily active user engagement by 25% through a complete intuitive redesign of the flow.'
            },
            {
                company: 'Stripe',
                role: 'Product Designer',
                period: '2017 - 2020',
                desc: 'Designed the new dashboard experience for Stripe Connect, focusing on complex financial data visualization. Collaborated closely with engineering and product teams to ship highly requested features.'
            }
        ],
        education: [
            {
                school: 'Rhode Island School of Design',
                degree: 'BFA in Industrial Design',
                period: '2013 - 2017'
            }
        ],
        skills: ['Figma', 'React', 'Framer', 'Prototyping', 'User Research', 'CSS/HTML', 'Design Systems']
    }

    return (
        <div className="min-h-screen flex flex-col transition-colors duration-500" style={{ background: t.pageBg }}>
            {/* Top action bar */}
            <header className="h-16 border-b flex items-center justify-between px-6 sticky top-0 z-20 transition-all duration-500"
                style={{ background: t.headerBg, borderColor: t.headerBorder, backdropFilter: "blur(24px)" }}>

                <Link to="/templates" className="transition-colors flex items-center gap-1.5 text-sm font-semibold group" style={{ color: t.textMuted }}>
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> <span className="hidden sm:inline">Back to Gallery</span>
                </Link>

                <div className="flex items-center gap-2 lg:gap-3">
                    <Button variant="outline" size="sm" className="rounded-xl h-10 px-4 border-opacity-30" style={{ background: t.btnBg, borderColor: t.btnBorder, color: t.text }}>
                        <Share2 className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Share Preview</span>
                    </Button>
                    <Button size="sm" className="h-10 px-6 rounded-xl shadow-xl shadow-primary/20 font-bold">
                        <Download className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Download PDF</span>
                    </Button>
                </div>
            </header>

            {/* Document View */}
            <main className="flex-1 overflow-y-auto py-12 px-6 flex flex-col items-center scrollbar-hide">
                <div className="flex items-center gap-3 mb-8 px-4 py-2 rounded-2xl border bg-white/5 dark:bg-black/20" style={{ borderColor: t.headerBorder }}>
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: t.textMuted }}>Live Preview Mode</span>
                    <div className="h-3 w-px bg-white/10 mx-1" />
                    <div className="text-[10px] font-black uppercase tracking-widest px-2" style={{ color: t.text }}>{selectedTemplate.name}</div>
                </div>

                <motion.div
                    key={templateId}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`w-full max-w-[8.5in] min-h-[11in] bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] text-black relative mb-24 ${templateId === 'academic' ? 'p-[1.2in]' : 'p-[0.75in]'}`}>

                    {/* Floating Controls for PDF */}
                    <div className="absolute -left-16 top-0 hidden xl:flex flex-col gap-3">
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-white border-slate-200 shadow-xl text-slate-400 hover:text-primary hover:border-primary transition-all">
                            <Printer className="w-5 h-5" />
                        </Button>
                    </div>

                    <ResumeLayout templateId={templateId} data={resumeData} />
                </motion.div>
            </main>
        </div>
    )
}
