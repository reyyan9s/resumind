import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import {
    ArrowRight, CheckCircle2, Sparkles, FileText, Download,
    LayoutTemplate, Layers, Zap, MousePointer2, Clock, Globe, Shield
} from "lucide-react"
import { Container } from "../components/layout/Container"
import { useTheme } from "../context/ThemeContext"
import { GridBackground, DotBackground, AmbientOrb, FloatingElement, GlassPanel } from "../components/ui/DecorativeElements"

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 26 } }
}
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
}

/* ─── Palette objects ─── */
const palette = {
    dark: {
        pageBg: "radial-gradient(ellipse 120% 80% at 50% -10%, #1a1040 0%, #0d0b16 40%, #080810 100%)",
        heroSpotlight: "radial-gradient(ellipse at center, rgba(120,100,255,0.18) 0%, rgba(80,60,200,0.06) 40%, transparent 70%)",
        vignette: "radial-gradient(ellipse 140% 100% at 50% 50%, transparent 30%, rgba(4,3,12,0.7) 100%)",
        bottomFade: "linear-gradient(to bottom, transparent, rgba(8,8,16,0.8))",
        h1: "rgba(235,232,255,0.97)",
        h1Gradient: "linear-gradient(135deg, #c4b8ff 0%, #a590ff 40%, #7c6ae8 100%)",
        desc: "rgba(180,170,230,0.55)",
        ctaPrimaryBg: "linear-gradient(135deg, #8b7cf8 0%, #6d5ce7 100%)",
        ctaGhostBorder: "rgba(255,255,255,0.08)",
        ctaGhostColor: "rgba(200,195,230,0.7)",
        mockupShadow: "rgba(80,60,220,0.18)",
        panelBg: "rgba(20,16,42,0.65)",
        panelBorder: "rgba(140,120,255,0.18)",
        panelShadow: "0 0 0 1px rgba(255,255,255,0.04) inset, 0 50px 120px -20px rgba(0,0,0,0.9), 0 0 80px rgba(100,80,255,0.08)",
        featSectionBg: "linear-gradient(180deg, rgba(8,8,16,0) 0%, rgba(10,8,22,0.8) 100%)",
        cardBg: "rgba(22,18,50,0.55)",
        cardBorder: "rgba(130,110,255,0.12)",
        cardShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(160,140,255,0.08)",
        cardLabel: "rgba(160,150,210,0.55)",
    },
    light: {
        pageBg: "linear-gradient(180deg, #f5f3ff 0%, #eee8ff 30%, #faf9ff 60%, #ffffff 100%)",
        heroSpotlight: "radial-gradient(ellipse at center, rgba(120,100,255,0.06) 0%, rgba(100,80,220,0.02) 40%, transparent 70%)",
        vignette: "none",
        bottomFade: "linear-gradient(to bottom, transparent, rgba(250,249,255,0.5))",
        h1: "#1a1040",
        h1Gradient: "linear-gradient(135deg, #6d5ce7 0%, #8b7cf8 50%, #a590ff 100%)",
        desc: "rgba(80,70,130,0.6)",
        ctaPrimaryBg: "linear-gradient(135deg, #7c6ae8 0%, #6356d8 100%)",
        ctaGhostBorder: "rgba(100,80,200,0.15)",
        ctaGhostColor: "rgba(80,60,160,0.7)",
        mockupShadow: "rgba(120,100,220,0.12)",
        panelBg: "rgba(255,255,255,0.7)",
        panelBorder: "rgba(120,100,255,0.12)",
        panelShadow: "0 0 0 1px rgba(120,100,255,0.06) inset, 0 32px 80px rgba(100,80,200,0.1), 0 0 40px rgba(120,100,255,0.04)",
        featSectionBg: "linear-gradient(180deg, rgba(250,249,255,0) 0%, rgba(245,243,255,0.8) 100%)",
        cardBg: "rgba(255,255,255,0.7)",
        cardBorder: "rgba(120,100,255,0.1)",
        cardShadow: "0 4px 24px rgba(100,80,200,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
        cardLabel: "rgba(80,70,130,0.55)",
    },
}

export default function Landing() {
    const { scrollYProgress } = useScroll()
    const heroMockupY = useTransform(scrollYProgress, [0, 0.6], [0, 60])
    const { resolvedTheme } = useTheme()
    const t = palette[resolvedTheme] || palette.dark

    return (
        <div className="flex flex-col min-h-screen relative selection:bg-indigo-400/30 overflow-hidden font-sans transition-colors duration-500"
            style={{ background: t.pageBg }}>

            <div className="bg-noise fixed inset-0 pointer-events-none z-50 transition-opacity duration-700" style={{ opacity: resolvedTheme === "dark" ? 0.04 : 0.02 }} />

            {/* ── HERO ── */}
            <section className="relative pt-32 pb-24 lg:pt-52 lg:pb-40 overflow-hidden">
                <GridBackground className="opacity-[0.3] dark:opacity-[0.15]" />
                <AmbientOrb className="top-[-10%] left-[-5%]" color="rgba(124, 124, 255, 0.12)" />
                <AmbientOrb className="bottom-[10%] right-[-5%]" color="rgba(180, 100, 255, 0.08)" delay={2} />

                <Container className="relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
                        {/* Left Copy */}
                        <motion.div variants={stagger} initial="hidden" animate="show" className="lg:w-[48%] flex flex-col items-start text-left">
                            <motion.div variants={fadeUp}
                                className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-all hover:scale-105"
                                style={{ background: "rgba(120,100,255,0.08)", border: "1px solid rgba(120,100,255,0.25)", color: "rgba(180,165,255,0.9)" }}>
                                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                                <span>Future of Recruiting</span>
                            </motion.div>

                            <motion.h1 variants={fadeUp} className="text-6xl lg:text-[5rem] font-bold tracking-tight mb-6 leading-[1.02] text-glow" style={{ color: t.h1 }}>
                                Career docs,<br />
                                <span className="inline-block" style={{ WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", backgroundImage: t.h1Gradient }}>
                                    perfected by&nbsp;AI.
                                </span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="text-[18px] mb-12 max-w-md leading-relaxed opacity-80" style={{ color: t.desc }}>
                                Design a stunning, ATS-optimized resume in minutes. No formatting struggles — just pure focus on your achievements.
                            </motion.p>

                            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Link to="/builder" className="inline-flex items-center justify-center h-14 px-10 rounded-2xl font-bold text-[15px] transition-all duration-300 hover:scale-[1.05] shadow-2xl shadow-primary/30 bg-primary text-white">
                                    Start Building Free <ArrowRight className="ml-2 w-4.5 h-4.5" />
                                </Link>
                                <Link to="/templates" className="inline-flex items-center justify-center h-14 px-10 rounded-2xl font-bold text-[15px] transition-all duration-300 hover:bg-white/5 group border border-white/10 dark:border-white/5 backdrop-blur-xl"
                                    style={{ color: t.ctaGhostColor }}>
                                    View Gallery <LayoutTemplate className="ml-2 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right Mockup */}
                        <div className="lg:w-[52%] w-full relative group">
                            <AmbientOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="500px" color="rgba(120,100,255,0.2)" />

                            <motion.div initial={{ opacity: 0, rotateY: 10, rotateX: 5, x: 40 }} animate={{ opacity: 1, rotateY: -10, rotateX: 6, x: 0 }}
                                transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.2 }} style={{ y: heroMockupY, perspective: 1200 }} className="relative z-10 mx-auto w-full max-w-[640px] transform-gpu">
                                <div className="absolute inset-x-20 -bottom-10 h-20 rounded-full blur-[40px] pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-700" style={{ background: t.mockupShadow }} />

                                <GlassPanel intensity="high" className="overflow-hidden flex flex-col p-0" style={{ border: `1px solid ${t.panelBorder}`, boxShadow: t.panelShadow }}>
                                    <div className="h-12 flex items-center px-5 gap-2.5 bg-white/5 dark:bg-black/30 border-b border-white/5">
                                        <div className="flex gap-2">
                                            {["#FF5F57", "#FFBD44", "#27C93F"].map((c, i) => (
                                                <div key={i} className="w-3 h-3 rounded-full opacity-60" style={{ background: c }} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex h-[380px] lg:h-[480px]">
                                        <div className="w-[32%] flex flex-col gap-3 p-5 bg-white/5 dark:bg-black/20 border-r border-white/5">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className={`h-11 w-full rounded-xl flex items-center px-3.5 gap-3 transition-all duration-500 ${i === 1 ? "bg-primary/20 border border-primary/30" : "bg-white/5 dark:bg-black/10 border border-transparent"}`}>
                                                    <div className={`w-4 h-4 rounded-lg ${i === 1 ? "bg-primary shadow-[0_0_10px_rgba(124,124,255,0.5)]" : "bg-white/10"}`} />
                                                    <div className="h-2 w-16 rounded-full bg-white/10" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex-1 flex items-start justify-center p-8 relative overflow-hidden bg-black/5 dark:bg-black/40">
                                            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[80px] pointer-events-none animate-pulse-subtle" />
                                            <div className="w-[85%] h-full bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] rounded-sm p-8 relative z-10">
                                                <div className="h-6 w-36 rounded-sm bg-slate-200 mb-8" />
                                                <div className="space-y-4">
                                                    <div className="h-2 w-full rounded-full bg-slate-100" />
                                                    <div className="h-2 w-11/12 rounded-full bg-slate-100" />
                                                    <div className="h-2 w-4/5 rounded-full bg-slate-50 mb-10" />
                                                    <div className="h-4 w-24 rounded-sm bg-primary/20" />
                                                    <div className="h-2 w-full rounded-full bg-slate-100" />
                                                    <div className="h-2 w-5/6 rounded-full bg-slate-50" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </GlassPanel>

                                {/* Decorative Badges */}
                                <FloatingElement delay={0} duration={7} className="absolute -right-12 top-24 z-20">
                                    <GlassPanel className="px-5 py-4 flex items-center gap-4 bg-black/60 dark:bg-indigo-950/40 backdrop-blur-3xl border-white/20">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(124,124,255,0.3)]">
                                            <Sparkles className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70 mb-0.5">AI Insights</p>
                                            <p className="text-[14px] font-bold text-white">ATS Score: 98%</p>
                                        </div>
                                    </GlassPanel>
                                </FloatingElement>

                                <FloatingElement delay={1} duration={9} className="absolute -left-10 bottom-24 z-20">
                                    <GlassPanel className="px-5 py-3.5 flex items-center gap-3.5 bg-black/60 dark:bg-indigo-950/40 backdrop-blur-3xl border-white/20">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-8 w-8 rounded-full border-2 border-indigo-900 bg-indigo-500 overflow-hidden shadow-xl" />
                                            ))}
                                        </div>
                                        <p className="text-[13px] font-bold text-white">Live Editing</p>
                                    </GlassPanel>
                                </FloatingElement>
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── STATS / SOCIAL PROOF ── */}
            <section className="py-20 relative border-y border-white/5 overflow-hidden">
                <DotBackground className="opacity-[0.2] dark:opacity-[0.1]" />
                <Container className="relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center items-center opacity-70">
                        {[
                            { label: "Resumes Built", value: "250K+" },
                            { label: "Job-Ready Rate", value: "94%" },
                            { label: "Avg. Salary Bump", value: "22%" },
                            { label: "Users Worldwide", value: "100K+" },
                        ].map((stat, i) => (
                            <div key={i} className="group">
                                <h4 className="text-3xl font-bold mb-1 transition-colors group-hover:text-primary leading-tight" style={{ color: t.h1 }}>{stat.value}</h4>
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40 leading-relaxed" style={{ color: t.h1 }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── FEATURES ── */}
            <section className="py-24 lg:py-36 relative" style={{ background: t.featSectionBg }}>
                <GridBackground className="mask-fade-bottom scale-150 rotate-12 opacity-[0.15] dark:opacity-[0.1]" />
                <Container className="relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight" style={{ color: t.h1 }}>Tools that disappear<br />into the background</h2>
                            <p className="text-[17px] leading-relaxed opacity-60" style={{ color: t.desc }}>Every step of the resume process, meticulously refined. Quiet, fast, and remarkably capable.</p>
                        </motion.div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { col: "md:col-span-2", icon: FileText, title: "Real-time Visual Engine", desc: "Type on the left, watch your document render live on the right. Zero latency, perfect fidelity.", tag: "Core" },
                            { col: "", icon: Download, title: "Instant Export", desc: "Pixel-perfect A4 PDF rendered on demand. Zero formatting headaches.", tag: "PDF" },
                            { col: "", icon: MousePointer2, title: "Smart Interaction", desc: "Drag and drop sections with intuitive layout controls.", tag: "Editor" },
                            { col: "md:col-span-2", icon: Sparkles, title: "AI Content Tuning", desc: "Let fine-tuned AI suggest metric-driven bullet points matched exactly to your target role.", tag: "AI Agent" },
                        ].map((f, i) => (
                            <motion.div key={i} whileHover={{ y: -8 }}
                                className={`${f.col} group rounded-[2.5rem] p-10 relative overflow-hidden transition-all duration-500`}
                                style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: "blur(32px)", boxShadow: t.cardShadow }}>
                                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/5 blur-[60px] group-hover:bg-primary/10 transition-colors" />
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg mb-6 text-[9px] font-black uppercase tracking-[0.15em] bg-white/5 dark:bg-black/20 border border-white/5" style={{ color: t.cardLabel }}>
                                        {f.tag}
                                    </div>
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                        <f.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3" style={{ color: t.h1 }}>{f.title}</h3>
                                    <p className="text-sm leading-relaxed opacity-50" style={{ color: t.desc }}>{f.desc}</p>
                                </div>
                                <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                                    <ArrowRight className="w-5 h-5 text-primary" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── SECURITY / TRUST ── */}
            <section className="py-24 relative overflow-hidden">
                <Container className="relative z-10">
                    <GlassPanel className="p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12" style={{ background: t.panelBg, border: `1px solid ${t.panelBorder}`, boxShadow: t.panelShadow }}>
                        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <div className="h-16 w-16 bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center mb-8 border border-emerald-500/20 text-emerald-500">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-5" style={{ color: t.h1 }}>Your data is private. Period.</h2>
                            <p className="text-[16px] leading-relaxed opacity-60 mb-8" style={{ color: t.desc }}>We don't train our models on your resumes. Your personal information is encrypted and never sold to third parties.</p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-500/80"><CheckCircle2 className="w-4 h-4" /> GDPR Compliant</div>
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-500/80"><CheckCircle2 className="w-4 h-4" /> 256-bit Encryption</div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                            {[
                                { icon: Globe, label: "Global Servers", value: "99.9% Uptime" },
                                { icon: Clock, label: "Fast Loading", value: "< 200ms" },
                                { icon: Zap, label: "Direct Export", value: "No Wait" },
                                { icon: Layers, label: "Versioning", value: "Autosave" },
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-indigo-100/90 dark:bg-indigo-400/20 border border-indigo-200/50 dark:border-indigo-400/30 backdrop-blur-md transition-all duration-300 hover:bg-indigo-200/80 dark:hover:bg-indigo-400/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 group">
                                    <item.icon className="w-5 h-5 text-indigo-700 dark:text-indigo-300 mb-3 group-hover:scale-110 transition-transform" />
                                    <p className="text-[10px] uppercase font-black tracking-widest mb-1 opacity-80" style={{ color: resolvedTheme === 'dark' ? '#c7d2fe' : '#1e1b4b' }}>{item.label}</p>
                                    <p className="text-sm font-bold font-mono" style={{ color: resolvedTheme === 'dark' ? '#ffffff' : '#000000' }}>{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </GlassPanel>
                </Container>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="py-40 lg:py-60 relative overflow-hidden flex items-center justify-center" style={{ background: t.ctaSectionBg }}>
                <GridBackground className="opacity-[0.2] dark:opacity-[0.1]" />
                <AmbientOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="600px" color="rgba(124, 124, 255, 0.15)" />
                <Container className="relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8" style={{ color: t.h1 }}>Build your narrative.</h2>
                        <p className="text-[18px] mb-12 max-w-sm mx-auto opacity-50" style={{ color: t.desc }}>Rethink how you present your career. Structured, elegant, and profoundly clear.</p>
                        <Link to="/signup" className="inline-flex items-center justify-center h-15 px-14 rounded-2xl font-bold text-[16px] transition-all duration-300 hover:scale-[1.05] shadow-[0_20px_60px_rgba(124,124,255,0.4)] bg-primary text-white">
                            Get Started — Free <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </motion.div>
                </Container>
            </section>
        </div>
    )
}
