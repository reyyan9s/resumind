import { Link, useParams, Navigate } from "react-router-dom"
import { ArrowLeft, Share2, Bookmark, Clock, Calendar, Sparkles } from "lucide-react"
import { Container } from "../components/layout/Container"
import { Button } from "../components/ui/Button"
import { useTheme } from "../context/ThemeContext"

const palette = {
    dark: {
        pageBg: "radial-gradient(ellipse 120% 80% at 50% -10%, #1a1040 0%, #0d0b16 40%, #080810 100%)",
        headerBg: "rgba(22,18,50,0.45)",
        headerBorder: "rgba(130,110,255,0.12)",
        h1: "rgba(235,232,255,0.97)",
        sub: "rgba(180,170,230,0.55)",
        text: "rgba(235,232,255,0.92)",
        metaText: "rgba(170,160,215,0.45)",
        divider: "rgba(130,110,255,0.15)",
        proseText: "rgba(190,185,220,0.85)",
        asideBg: "rgba(22,18,50,0.55)",
        asideBorder: "rgba(130,110,255,0.12)",
        quoteBg: "rgba(120,100,255,0.05)",
        quoteBorder: "rgba(120,100,255,0.4)",
    },
    light: {
        pageBg: "linear-gradient(180deg, #f5f3ff 0%, #eee8ff 30%, #faf9ff 60%, #ffffff 100%)",
        headerBg: "rgba(255,255,255,0.7)",
        headerBorder: "rgba(120,100,255,0.12)",
        h1: "#1a1040",
        sub: "rgba(80,70,130,0.6)",
        text: "#1a1040",
        metaText: "rgba(80,70,130,0.45)",
        divider: "rgba(120,100,255,0.15)",
        proseText: "#2d2060",
        asideBg: "rgba(255,255,255,0.8)",
        asideBorder: "rgba(120,100,255,0.12)",
        quoteBg: "rgba(120,100,255,0.04)",
        quoteBorder: "rgba(120,100,255,0.5)",
    },
}

const ARTICLES = {
    "how-to-write-resume": {
        title: "How to Write a Resume That Stands Out in 2026",
        category: "Career Advice",
        readTime: "5 min read",
        date: "Feb 24, 2026",
        author: "Sarah Jenkins",
        authorRole: "Career Strategist at Resumind",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=2670",
        lead: "The job market has evolved significantly. Attention spans are shorter, Applicant Tracking Systems (ATS) are smarter, and the competition is fierce.",
        toc: ["Formatting is King", "Focus on Impact", "Tailor Your Keywords"],
        body: (t) => (
            <>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>1. Formatting is King</h2>
                <p>Before a human ever reads your resume, it will likely be parsed by an ATS. Complex multi-column layouts, graphics, and unusual fonts will scramble the parser. Keep your format clean, simple, and standard.</p>
                <ul>
                    <li>Use standard fonts (Inter, Arial, Helvetica).</li>
                    <li>Stick to a single-column layout if possible.</li>
                    <li>Use standard section headers (Experience, Education).</li>
                </ul>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>2. Focus on Impact</h2>
                <p>"Responsible for managing social media" means nothing. "Increased social media engagement by 45% over 6 months through data-driven content strategies" means you know how to drive results.</p>
                <blockquote style={{ background: t.quoteBg, borderColor: t.quoteBorder, color: t.h1, borderLeftWidth: '4px', fontStyle: 'italic', padding: '1.5rem 2rem', borderRadius: '1rem' }}>
                    "Resumes that quantify achievements are 40% more likely to result in an interview callback in 2026."
                </blockquote>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>3. Tailor Your Keywords</h2>
                <p>Mirror the language used in the job description. If they ask for "Client Relations" but your resume says "Customer Service," change it. It shows you've read the description and helps you pass ATS filtering.</p>
            </>
        ),
    },
    "common-resume-mistakes": {
        title: "10 Most Common Resume Mistakes to Avoid",
        category: "Guides",
        readTime: "7 min read",
        date: "Feb 18, 2026",
        author: "James Carter",
        authorRole: "Senior Recruiter, ex-Google",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2670",
        lead: "Are you making these subtle but fatal errors on your resume? Here's exactly what hiring managers instantly reject — and how to fix them.",
        toc: ["Generic Objectives", "Missing Metrics", "Too Many Pages", "Spelling Errors", "Wrong File Format"],
        body: (t) => (
            <>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>1. Using a Generic Objective Statement</h2>
                <p>"Seeking a challenging role in a dynamic organisation…" — every hiring manager has read this a thousand times. Replace it with a sharp, tailored 2-line professional summary focused on your value.</p>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>2. No Metrics or Numbers</h2>
                <p>Bullet points without results are just job descriptions. Quantify everything you can: revenue generated, users onboarded, error rates reduced, or projects delivered on time.</p>
                <blockquote style={{ background: t.quoteBg, borderColor: t.quoteBorder, color: t.h1, borderLeftWidth: '4px', fontStyle: 'italic', padding: '1.5rem 2rem', borderRadius: '1rem' }}>
                    "If you can't measure it, a recruiter won't value it."
                </blockquote>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>3. Cramming onto Multiple Pages</h2>
                <p>Unless you have 10+ years of highly relevant experience, keep it to one page. Recruiters spend an average of 7 seconds per resume — give them your best, not all of it.</p>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>4. Spelling & Grammar Errors</h2>
                <p>A single typo can discard an otherwise perfect resume. Run Grammarly, read it backwards, and have someone else proofread it. Every time.</p>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>5. Sending as a .docx to an ATS</h2>
                <p>Always send PDF unless the application explicitly asks for Word format. PDFs preserve your formatting across all systems and look exactly as intended.</p>
            </>
        ),
    },
    "tailoring-tech-startups": {
        title: "Tailoring Your Resume for Tech Startups",
        category: "Industry Specific",
        readTime: "4 min read",
        date: "Jan 30, 2026",
        author: "Priya Mehta",
        authorRole: "Talent Lead at early-stage startups",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2670",
        lead: "Startups look for very different signals than corporate enterprise. Here's how to position yourself as the agile, high-ownership problem solver they need.",
        toc: ["Show Ownership", "Highlight Speed", "Skip Corporate Jargon"],
        body: (t) => (
            <>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>1. Show Ownership, Not Just Contribution</h2>
                <p>Startups need people who own outcomes. Instead of "contributed to product launch," say "led the end-to-end launch of feature X that acquired 3,000 users in week one." Ownership language signals startup DNA.</p>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>2. Highlight Speed & Adaptability</h2>
                <p>Startup environments move fast. Mention times you shipped under pressure, pivoted a strategy mid-sprint, or wore multiple hats simultaneously. Speed and flexibility are valued over perfection.</p>
                <blockquote style={{ background: t.quoteBg, borderColor: t.quoteBorder, color: t.h1, borderLeftWidth: '4px', fontStyle: 'italic', padding: '1.5rem 2rem', borderRadius: '1rem' }}>
                    "Startup founders want to know: will this person figure it out or wait to be told what to do?"
                </blockquote>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>3. Strip the Corporate Jargon</h2>
                <p>"Synergised cross-functional stakeholders to leverage core competencies…" — this will get you laughed out of a Series A interview. Use plain, confident language that shows real results.</p>
            </>
        ),
    },
    "cover-letter-guide": {
        title: "The Ultimate Guide to Cover Letters",
        category: "Job Search",
        readTime: "9 min read",
        date: "Jan 12, 2026",
        author: "Marcus Webb",
        authorRole: "Head of Talent Acquisition",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2670",
        lead: "Yes, you still need a cover letter. But traditional ones don't work anymore. Here's the modern approach that actually gets you noticed.",
        toc: ["Why Cover Letters Still Matter", "The Hook Formula", "Personalisation at Scale", "Keep It to 3 Paragraphs"],
        body: (t) => (
            <>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>1. Why Cover Letters Still Matter</h2>
                <p>60% of hiring managers say a great cover letter can get a candidate shortlisted even when the resume is average. It's your chance to show personality, intent, and cultural fit — none of which a resume can convey alone.</p>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>2. The Hook Formula</h2>
                <p>Ditch "I am applying for the position of…" and open with impact. Lead with an insight about the company, a shared mission, or a bold result you've achieved. You have 3 seconds to earn the next sentence.</p>
                <blockquote style={{ background: t.quoteBg, borderColor: t.quoteBorder, color: t.h1, borderLeftWidth: '4px', fontStyle: 'italic', padding: '1.5rem 2rem', borderRadius: '1rem' }}>
                    "The goal of the first line is to make them read the second line. That's it."
                </blockquote>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>3. Personalisation at Scale</h2>
                <p>You don't need a fully unique cover letter for every job. Build a strong base and swap out the company name, one specific achievement, and their core mission statement. That's enough to feel personal without costing you hours.</p>
                <h2 className="text-xl font-bold mt-10 mb-3 !mt-10" style={{ color: t.h1 }}>4. Keep It to 3 Paragraphs</h2>
                <p>Hook → Why you're the perfect fit (with proof) → Why this specific company excites you. Done. Anything beyond 250 words risks not being read at all.</p>
            </>
        ),
    },
}

export default function BlogArticle() {
    const { slug } = useParams()
    const { resolvedTheme } = useTheme()
    const t = palette[resolvedTheme] || palette.dark

    const article = ARTICLES[slug]
    if (!article) return <Navigate to="/blog" replace />

    return (
        <div className="min-h-screen relative transition-colors duration-500" style={{ background: t.pageBg }}>
            {/* Header */}
            <header className="relative overflow-hidden border-b" style={{ background: t.headerBg, borderColor: t.headerBorder, backdropFilter: "blur(24px)" }}>
                <Container className="py-16 md:py-24 max-w-4xl relative z-10">
                    <Link to="/blog" className="inline-flex items-center text-sm font-medium transition-colors mb-10 group" style={{ color: t.metaText }}>
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" /> Back to Resources
                    </Link>

                    <div className="flex items-center gap-3 mb-6 text-[10px] font-bold uppercase tracking-widest text-primary">
                        <span className="px-2 py-0.5 rounded-md bg-primary/10">{article.category}</span>
                        <span className="opacity-20">•</span>
                        <span className="flex items-center gap-1.5" style={{ color: t.metaText }}><Clock className="w-4 h-4" /> {article.readTime}</span>
                        <span className="opacity-20">•</span>
                        <span className="flex items-center gap-1.5" style={{ color: t.metaText }}><Calendar className="w-4 h-4" /> {article.date}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-12" style={{ color: t.h1 }}>
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-between py-8 border-t" style={{ borderColor: t.divider }}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-accent rotate-3" />
                            <div>
                                <p className="font-semibold text-sm" style={{ color: t.h1 }}>{article.author}</p>
                                <p className="text-xs opacity-60" style={{ color: t.metaText }}>{article.authorRole}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="rounded-xl opacity-60 hover:opacity-100"><Share2 className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="rounded-xl opacity-60 hover:opacity-100"><Bookmark className="w-4 h-4" /></Button>
                        </div>
                    </div>
                </Container>
            </header>

            <Container className="py-16 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-16 relative">
                    <article className="lg:w-2/3 prose prose-lg prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary max-w-none prose-img:rounded-3xl"
                        style={{ color: t.proseText }}>
                        <p className="lead text-2xl font-medium mb-10 leading-relaxed" style={{ color: t.h1 }}>{article.lead}</p>
                        <img src={article.image} alt={article.title} className="w-full h-[400px] object-cover mb-12 shadow-2xl rounded-3xl" />
                        {article.body(t)}
                        <div className="bg-primary/5 border-l-4 border-primary p-8 rounded-r-2xl my-12" style={{ background: t.quoteBg, borderColor: 'var(--color-primary)' }}>
                            <div className="flex items-center gap-2 text-primary font-bold mb-3 uppercase tracking-widest text-xs">
                                <Sparkles className="w-4 h-4" /> Pro Tip
                            </div>
                            <p className="m-0 text-[15px] font-medium" style={{ color: t.h1 }}>Use the Resumind AI Assistant to analyze your target job description and automatically suggest high-impact bullet points.</p>
                        </div>
                    </article>

                    <aside className="lg:w-1/3 hidden lg:block">
                        <div className="sticky top-24 space-y-8">
                            <div className="rounded-[2rem] p-8 border" style={{ background: t.asideBg, borderColor: t.asideBorder, backdropFilter: "blur(24px)" }}>
                                <h3 className="font-semibold text-lg mb-6" style={{ color: t.h1 }}>Table of Contents</h3>
                                <nav className="flex flex-col gap-4 text-sm font-medium">
                                    {article.toc.map((item, i) => (
                                        <span key={i} className={i === 0 ? "text-primary hover:opacity-80 transition-opacity cursor-pointer" : "opacity-60 hover:opacity-100 transition-opacity cursor-pointer"} style={i !== 0 ? { color: t.text } : {}}>
                                            {i + 1}. {item}
                                        </span>
                                    ))}
                                </nav>
                            </div>

                            <div className="rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20"
                                style={{ background: "linear-gradient(135deg, #7c6ae8 0%, #6356d8 100%)" }}>
                                <div className="relative z-10 text-center">
                                    <h3 className="font-bold text-2xl mb-3">Build the future.</h3>
                                    <p className="text-white/80 text-sm mb-8 leading-relaxed">Stop guessing. Use our AI-powered builder and handcrafted templates today.</p>
                                    <Link to="/signup">
                                        <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-xl h-12 font-bold shadow-lg">Start for Free</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </Container>
        </div>
    )
}
