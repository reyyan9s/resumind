import { Link } from "react-router-dom"
import { ArrowRight, Search, Sparkles, Filter, Calendar, Clock } from "lucide-react"
import { Container } from "../components/layout/Container"
import { Section } from "../components/layout/Section"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { useTheme } from "../context/ThemeContext"

const articles = [
    {
        title: "How to Write a Resume That Stands Out in 2026",
        excerpt: "Learn the core strategies for bypassing Applicant Tracking Systems and catching a recruiter's eye within 6 seconds.",
        category: "Career Advice",
        readTime: "5 min read",
        slug: "how-to-write-resume",
        date: "Feb 24, 2026"
    },
    {
        title: "10 Most Common Resume Mistakes to Avoid",
        excerpt: "Are you making these subtle but fatal errors on your resume? Here's what hiring managers instantly reject.",
        category: "Guides",
        readTime: "7 min read",
        slug: "common-resume-mistakes",
        date: "Feb 18, 2026"
    },
    {
        title: "Tailoring Your Resume for Tech Startups",
        excerpt: "Startups look for different signals than corporate enterprise. Here's how to position yourself as an agile problem solver.",
        category: "Industry Specific",
        readTime: "4 min read",
        slug: "tailoring-tech-startups",
        date: "Jan 30, 2026"
    },
    {
        title: "The Ultimate Guide to Cover Letters",
        excerpt: "Yes, you still need a cover letter. But traditional ones don't work anymore. Try this modern approach instead.",
        category: "Job Search",
        readTime: "9 min read",
        slug: "cover-letter-guide",
        date: "Jan 12, 2026"
    },
]

const palette = {
    dark: {
        pageBg: "radial-gradient(ellipse 120% 80% at 50% -10%, #1a1040 0%, #0d0b16 40%, #080810 100%)",
        h1: "rgba(235,232,255,0.97)",
        sub: "rgba(180,170,230,0.55)",
        cardBg: "rgba(22,18,50,0.45)",
        cardBorder: "rgba(130,110,255,0.12)",
        cardShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(160,140,255,0.08)",
        cardHighlight: "linear-gradient(90deg, transparent, rgba(160,140,255,0.15), transparent)",
        text: "rgba(235,232,255,0.92)",
        dateText: "rgba(170,160,215,0.45)",
        inputBg: "rgba(255,255,255,0.03)",
        inputBorder: "rgba(255,255,255,0.08)",
        catBtnBg: "rgba(120,100,255,0.08)",
        catBtnActive: "rgba(120,100,255,0.2)",
    },
    light: {
        pageBg: "linear-gradient(180deg, #f5f3ff 0%, #eee8ff 30%, #faf9ff 60%, #ffffff 100%)",
        h1: "#1a1040",
        sub: "rgba(80,70,130,0.6)",
        cardBg: "rgba(255,255,255,0.7)",
        cardBorder: "rgba(120,100,255,0.12)",
        cardShadow: "0 4px 24px rgba(100,80,200,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
        cardHighlight: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
        text: "#1a1040",
        dateText: "rgba(80,70,130,0.4)",
        inputBg: "rgba(255,255,255,0.8)",
        inputBorder: "rgba(0,0,0,0.06)",
        catBtnBg: "rgba(120,100,255,0.05)",
        catBtnActive: "rgba(120,100,255,0.15)",
    },
}

export default function Blog() {
    const { resolvedTheme } = useTheme()
    const t = palette[resolvedTheme] || palette.dark

    return (
        <Section className="min-h-screen relative transition-colors duration-500" style={{ background: t.pageBg }}>
            <Container className="pt-12 pb-24 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary">
                            <Sparkles className="w-3.5 h-3.5" /> Growth & Insights
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-5" style={{ color: t.h1 }}>
                            Career Advice & Resources
                        </h1>
                        <p className="text-lg leading-relaxed" style={{ color: t.sub }}>
                            Expert guides, tips, and insights to help you land your dream job faster.
                        </p>
                    </div>

                    <div className="flex gap-3 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-80">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" style={{ color: t.text }} />
                            <Input className="pl-10 h-11 rounded-xl transition-all shadow-sm"
                                style={{ background: t.inputBg, borderColor: t.inputBorder, color: t.text }}
                                placeholder="Search articles..." />
                        </div>
                        <Button variant="outline" size="sm" className="h-11 w-11 p-0 rounded-xl" style={{ background: t.inputBg, borderColor: t.inputBorder, color: t.text }}>
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex gap-2.5 mb-12">
                    <button className="px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 border"
                        style={{ background: "var(--color-primary)", color: "white", borderColor: "var(--color-primary)" }}>
                        All Articles
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articles.map((article, i) => (
                        <Link key={i} to={`/blog/${article.slug}`} className="group h-full flex flex-col">
                            <div className="flex-1 rounded-[2rem] p-8 relative overflow-hidden transition-all duration-500 group-hover:y-[-6px] group-hover:shadow-2xl"
                                style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: "blur(24px)", boxShadow: t.cardShadow }}>
                                <div className="absolute top-0 inset-x-0 h-px transition-opacity opacity-0 group-hover:opacity-100" style={{ background: t.cardHighlight }} />

                                <div className="flex flex-col h-full">
                                    <div className="flex items-center gap-3 mb-6 text-[10px] font-bold uppercase tracking-widest text-primary">
                                        <span className="px-2 py-0.5 rounded-md bg-primary/10">{article.category}</span>
                                        <span className="opacity-20">•</span>
                                        <span className="flex items-center gap-1.5 opacity-60" style={{ color: t.text }}><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                                    </div>

                                    <h2 className="text-2xl font-semibold tracking-tight mb-4 group-hover:text-primary transition-colors leading-[1.3]" style={{ color: t.h1 }}>
                                        {article.title}
                                    </h2>

                                    <p className="text-[15px] leading-relaxed mb-auto" style={{ color: t.sub }}>
                                        {article.excerpt}
                                    </p>

                                    <div className="mt-8 flex items-center justify-between pt-6 border-t" style={{ borderColor: t.cardBorder }}>
                                        <div className="flex items-center gap-2 text-sm opacity-60" style={{ color: t.dateText }}>
                                            <Calendar className="w-4 h-4" /> <span>{article.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                                            Read More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
