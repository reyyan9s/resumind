import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import {
    Sparkles, Target, Zap, Brain, FileText, TrendingUp,
    Users, CheckCircle, ArrowRight, Star
} from "lucide-react"
import { Button } from "../components/ui/Button"

const palette = {
    dark: {
        pageBg: "radial-gradient(ellipse 120% 60% at 50% -10%, #1a1040 0%, #0d0b16 40%, #080810 100%)",
        h1: "rgba(235,232,255,0.97)",
        sub: "rgba(180,170,230,0.55)",
        cardBg: "rgba(22,18,50,0.45)",
        cardBorder: "rgba(130,110,255,0.12)",
        cardShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(160,140,255,0.08)",
        text: "rgba(200,195,240,0.75)",
    },
    light: {
        pageBg: "linear-gradient(180deg, #f5f3ff 0%, #eee8ff 20%, #faf9ff 60%, #ffffff 100%)",
        h1: "#1a1040",
        sub: "rgba(80,70,130,0.6)",
        cardBg: "rgba(255,255,255,0.8)",
        cardBorder: "rgba(120,100,255,0.1)",
        cardShadow: "0 8px 32px rgba(100,80,200,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        text: "rgba(60,50,110,0.7)",
    },
}

const stats = [
    { value: "10x", label: "Faster Resume Building" },
    { value: "94%", label: "Interview Callback Rate" },
    { value: "50+", label: "Professional Templates" },
    { value: "200K+", label: "Resumes Created" },
]

const features = [
    {
        icon: Brain,
        title: "AI-Powered Writing",
        desc: "Our AI understands your experience and crafts compelling, keyword-rich content tailored to the job description — not generic filler.",
    },
    {
        icon: Target,
        title: "ATS Optimised",
        desc: "Every resume is scored against real Applicant Tracking Systems. We surface exactly what to fix so your resume reaches a human recruiter.",
    },
    {
        icon: Zap,
        title: "Built in Minutes",
        desc: "Stop spending hours tweaking margins. Our builder auto-formats everything — just fill in your details and export.",
    },
    {
        icon: TrendingUp,
        title: "Real-World Results",
        desc: "Users report 3× more interview calls within the first two weeks of switching to a Resumind-built resume.",
    },
    {
        icon: FileText,
        title: "Expert Templates",
        desc: "Designed by ex-recruiters from Google, Amazon, and Goldman Sachs — templates that actually get noticed.",
    },
    {
        icon: Users,
        title: "For Every Career Stage",
        desc: "Whether you're a fresh graduate or a seasoned executive, Resumind adapts to your experience level and industry.",
    },
]

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }

export default function About() {
    const { resolvedTheme } = useTheme()
    const t = palette[resolvedTheme] || palette.dark

    return (
        <div className="min-h-screen transition-colors duration-500" style={{ background: t.pageBg }}>

            {/* Hero */}
            <section className="relative pt-32 pb-24 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,100,255,0.12) 0%, transparent 70%)"
                }} />

                <motion.div {...fadeUp} className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-[10px] font-black uppercase tracking-[0.25em] bg-primary/10 text-primary border border-primary/20">
                        <Sparkles className="w-3.5 h-3.5 fill-current" /> Our Story
                    </div>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-8" style={{ color: t.h1 }}>
                        We believe your resume{" "}
                        <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
                            should open doors,
                        </span>{" "}
                        not close them.
                    </h1>
                    <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: t.sub }}>
                        Resumind is an AI-powered resume builder designed to help you land more interviews, faster.
                        We combine intelligent writing assistance, ATS optimisation, and stunning design to give you
                        the unfair advantage in a competitive job market.
                    </p>
                    <Link to="/signup">
                        <Button className="h-14 px-10 rounded-2xl text-base font-black shadow-2xl shadow-primary/30 transition-all hover:scale-105 inline-flex items-center gap-3">
                            Start Building Free <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* Stats */}
            <section className="py-20 px-4">
                <motion.div {...fadeUp} className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            className="rounded-[2rem] p-8 text-center"
                            style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: "blur(20px)", boxShadow: t.cardShadow }}
                        >
                            <p className="text-4xl font-black bg-gradient-to-br from-primary to-violet-400 bg-clip-text text-transparent mb-2">{s.value}</p>
                            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: t.sub }}>{s.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Mission */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className="rounded-[2.5rem] p-12 lg:p-16 relative overflow-hidden"
                        style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: "blur(24px)", boxShadow: t.cardShadow }}>
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
                            style={{ background: "radial-gradient(circle, rgba(124,100,255,0.6) 0%, transparent 70%)" }} />
                        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
                            <div className="flex-shrink-0">
                                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                    <Target className="w-8 h-8 text-primary" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-black tracking-tight mb-6" style={{ color: t.h1 }}>Our Mission</h2>
                                <p className="text-base leading-relaxed mb-6" style={{ color: t.text }}>
                                    The average recruiter spends just <span className="font-bold text-primary">7 seconds</span> reviewing a resume.
                                    Most people spend hours crafting theirs — and still get ignored. We built Resumind to close that gap.
                                </p>
                                <p className="text-base leading-relaxed mb-6" style={{ color: t.text }}>
                                    Our AI doesn't just rephrase your bullet points. It understands industry-specific language, aligns your
                                    experience with what hiring managers are actually looking for, and ensures your resume clears every
                                    Applicant Tracking System standing between you and a human conversation.
                                </p>
                                <p className="text-base leading-relaxed" style={{ color: t.text }}>
                                    We want every job seeker — from a student applying for their first internship to a director targeting
                                    a C-suite role — to walk into every interview with total confidence, knowing their resume did the
                                    heavy lifting.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: t.h1 }}>
                            Everything you need to land the interview
                        </h2>
                        <p className="text-base max-w-xl mx-auto" style={{ color: t.sub }}>
                            Resumind is more than a document editor. It's your personal career strategist.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => {
                            const Icon = f.icon
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="rounded-[2rem] p-8 group hover:-translate-y-1 transition-all duration-500"
                                    style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: "blur(20px)", boxShadow: t.cardShadow }}
                                >
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 transition-all group-hover:scale-110 group-hover:bg-primary group-hover:border-primary">
                                        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="font-black text-lg mb-3" style={{ color: t.h1 }}>{f.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: t.text }}>{f.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-20 px-4">
                <motion.div {...fadeUp} className="max-w-4xl mx-auto rounded-[3rem] p-12 lg:p-16 text-center relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, rgba(100,80,255,0.15) 0%, rgba(140,100,255,0.08) 100%)", border: "1px solid rgba(120,100,255,0.2)", backdropFilter: "blur(24px)" }}>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120,100,255,0.15) 0%, transparent 70%)" }} />
                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-1 mb-6">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4" style={{ color: t.h1 }}>
                            Ready to clear your next interview?
                        </h2>
                        <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: t.sub }}>
                            Join over 200,000 professionals who've used Resumind to land roles at top companies worldwide.
                            Build your first resume for free — no credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/signup">
                                <Button className="h-14 px-10 rounded-2xl text-base font-black shadow-2xl shadow-primary/30 transition-all hover:scale-105 inline-flex items-center gap-3">
                                    Get Started Free <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link to="/templates">
                                <Button variant="outline" className="h-14 px-10 rounded-2xl text-base font-black border-primary/20 bg-primary/5 transition-all hover:scale-105 hover:bg-primary/10" style={{ color: t.h1 }}>
                                    View Templates
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

        </div>
    )
}
