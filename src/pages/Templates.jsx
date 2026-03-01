import { useState, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container } from "../components/layout/Container"
import { Section } from "../components/layout/Section"
import { Button } from "../components/ui/Button"
import { Search, Sparkles, Filter, Layout, ArrowRight } from "lucide-react"
import { Input } from "../components/ui/Input"
import { useTheme } from "../context/ThemeContext"
import { GridBackground, DotBackground, AmbientOrb, GlassPanel } from "../components/ui/DecorativeElements"
import { motion } from "framer-motion"
import { templates } from "../data/templates"
import { ResumeLayout } from "../components/resume/TemplateLayouts"

const mockPreviewData = {
    name: "Alex Jensen",
    role: "Senior Software Engineer",
    email: "alex.jensen@example.com",
    phone: "+1 (555) 000-0000",
    summary: "Strategic and results-driven Software Engineer with 8+ years of experience in building high-performance web applications and distributed systems.",
    experience: [
        {
            role: "Principal Engineer",
            company: "TechFlow Systems",
            period: "2020 - Present",
            desc: "Leading architectural evolution of core platform services."
        },
        {
            role: "Senior Developer",
            company: "CloudScale AI",
            period: "2017 - 2020",
            desc: "Developed highly available microservices using React and Node.js."
        }
    ],
    education: [
        {
            school: "Stanford University",
            degree: "M.S. in Computer Science",
            period: "2015 - 2017"
        }
    ],
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"]
};

const palette = {
    dark: {
        pageBg: "radial-gradient(ellipse 120% 80% at 50% -10%, #1a1040 0%, #0d0b16 40%, #080810 100%)",
        h1: "rgba(235,232,255,0.97)",
        sub: "rgba(180,170,230,0.55)",
        cardBg: "rgba(22,18,50,0.4)",
        cardBorder: "rgba(130,110,255,0.12)",
        previewBg: "rgba(30,22,60,0.5)",
        text: "rgba(235,232,255,0.9)",
        badgeBg: "rgba(120,100,255,0.1)",
        badgeText: "rgba(190,180,255,0.85)",
        inputBg: "rgba(255,255,255,0.03)",
        inputBorder: "rgba(255,255,255,0.08)",
    },
    light: {
        pageBg: "linear-gradient(180deg, #f5f3ff 0%, #eee8ff 30%, #faf9ff 60%, #ffffff 100%)",
        h1: "#1a1040",
        sub: "rgba(80,70,130,0.6)",
        cardBg: "rgba(255,255,255,0.6)",
        cardBorder: "rgba(120,100,255,0.1)",
        previewBg: "rgba(248,246,255,0.9)",
        text: "#1a1040",
        badgeBg: "rgba(120,100,255,0.08)",
        badgeText: "rgba(100,80,200,0.8)",
        inputBg: "rgba(255,255,255,0.8)",
        inputBorder: "rgba(0,0,0,0.06)",
    },
}

export default function Templates() {
    const { resolvedTheme } = useTheme()
    const navigate = useNavigate()
    const t = palette[resolvedTheme] || palette.dark
    const [searchQuery, setSearchQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("All Designs")

    const categories = ["All Designs", "Professional", "Creative", "Minimal", "Executive"]

    const filteredTemplates = useMemo(() => {
        return templates.filter(template => {
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.category.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = activeCategory === "All Designs" || template.category === activeCategory
            return matchesSearch && matchesCategory
        })
    }, [searchQuery, activeCategory])

    const handleUseDesign = (templateId) => {
        navigate(`/builder?template=${templateId}`)
    }

    return (
        <Section className="min-h-screen relative transition-colors duration-500 overflow-hidden" style={{ background: t.pageBg }}>
            <GridBackground className="opacity-[0.2] dark:opacity-[0.1]" />
            <AmbientOrb className="top-[-5%] left-[-5%]" color="rgba(120, 100, 255, 0.12)" />
            <AmbientOrb className="bottom-[10%] right-[-5%]" color="rgba(180, 100, 255, 0.08)" delay={2} />

            <Container className="pt-20 pb-24 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-20 px-4">
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-6 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:scale-105"
                        style={{ background: "rgba(120,100,255,0.08)", border: "1px solid rgba(120,100,255,0.2)", color: "rgba(124,124,255,0.9)" }}>
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        <span>{templates.length}+ Handcrafted Layouts</span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-glow" style={{ color: t.h1 }}>
                        Resume Templates
                    </h1>
                    <p className="text-[17px] leading-relaxed opacity-60 max-w-2xl" style={{ color: t.sub }}>
                        Stand out with a modern, beautifully crafted resume template suitable for any industry. ATS-friendly, highly customizable, and focused on your career narrative.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 mb-16 items-center justify-between px-4">
                    <div className="flex gap-3 overflow-x-auto w-full lg:w-auto pb-4 lg:pb-0 scrollbar-hide">
                        {categories.map((cat) => (
                            <Button key={cat}
                                onClick={() => setActiveCategory(cat)}
                                variant={activeCategory === cat ? "primary" : "outline"} size="sm"
                                className={`rounded-xl h-11 px-7 font-bold text-[13px] ${activeCategory !== cat ? "border-white/10 dark:border-white/5" : ""}`}
                                style={activeCategory !== cat ? { background: t.inputBg, color: t.text } : {}}>
                                {cat}
                            </Button>
                        ))}
                    </div>

                    <div className="flex w-full lg:w-[400px] gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 opacity-30" style={{ color: t.text }} />
                            <Input className="pl-12 h-12 rounded-2xl bg-white/5 dark:bg-black/20 border-white/10 dark:border-white/5 transition-all focus:ring-primary/20"
                                style={{ color: t.text }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search handcrafted designs..." />
                        </div>
                        <Button variant="outline" size="sm" className="h-12 w-12 p-0 rounded-2xl border-white/10 dark:border-white/5" style={{ background: t.inputBg, color: t.text }}>
                            <Filter className="w-4.5 h-4.5" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-4">
                    {filteredTemplates.map((template, i) => (
                        <motion.div key={template.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="group flex flex-col">
                            <div className="aspect-[1/1.414] mb-6 rounded-[1.75rem] overflow-hidden relative transition-all duration-700 transform group-hover:-translate-y-3 group-hover:shadow-[0_40px_80px_-20px_rgba(124,124,255,0.4)]"
                                style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: "blur(40px)" }}>

                                <div className="absolute inset-x-5 top-5 bottom-5 pointer-events-none rounded-xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-700 group-hover:scale-[1.02] group-hover:rotate-1 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex flex-col justify-start">
                                    <svg viewBox="0 0 800 1000" className="w-full h-full object-cover origin-top bg-white" preserveAspectRatio="xMidYTop slice">
                                        <foreignObject x="0" y="0" width="800" height="1132">
                                            <div className="w-[800px] h-[1132px] p-12 bg-white" xmlns="http://www.w3.org/1999/xhtml">
                                                <ResumeLayout templateId={template.id} data={mockPreviewData} />
                                            </div>
                                        </foreignObject>
                                    </svg>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10" />
                                </div>

                                <div className="absolute inset-0 bg-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <Button
                                        onClick={() => handleUseDesign(template.id)}
                                        className="w-full h-13 rounded-2xl shadow-2xl font-black text-[15px] bg-primary text-white">
                                        Use Design
                                    </Button>
                                    <Link to={`/preview?template=${template.id}`} className="w-full">
                                        <Button variant="outline" className="w-full h-13 rounded-2xl bg-white/10 text-white border-white/20 hover:bg-white/20 font-bold backdrop-blur-xl">
                                            Live Preview
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-2">
                                <div>
                                    <h3 className="font-bold text-lg mb-0.5 transition-colors group-hover:text-primary" style={{ color: t.text }}>
                                        {template.name}
                                    </h3>
                                    <p className="text-[11px] font-black uppercase tracking-[0.15em] opacity-30" style={{ color: t.text }}>
                                        {template.tag}
                                    </p>
                                </div>
                                <div className="h-8 w-8 rounded-full border border-white/5 flex items-center justify-center bg-white/5 transition-transform group-hover:translate-x-1 group-hover:bg-primary/10 group-hover:border-primary/20">
                                    <ArrowRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:text-primary" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {filteredTemplates.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-xl font-bold opacity-30" style={{ color: t.text }}>No templates found matching your criteria.</p>
                        </div>
                    )}
                </div>

            </Container>
        </Section>
    )
}
