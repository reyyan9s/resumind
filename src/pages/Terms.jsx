import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"
import { ScrollText } from "lucide-react"

const palette = {
    dark: {
        pageBg: "radial-gradient(ellipse 120% 60% at 50% -10%, #1a1040 0%, #0d0b16 40%, #080810 100%)",
        h1: "rgba(235,232,255,0.97)",
        sub: "rgba(180,170,230,0.55)",
        cardBg: "rgba(22,18,50,0.45)",
        cardBorder: "rgba(130,110,255,0.12)",
        cardShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(160,140,255,0.08)",
        text: "rgba(200,195,240,0.75)",
        heading: "rgba(220,215,255,0.9)",
        divider: "rgba(130,110,255,0.1)",
    },
    light: {
        pageBg: "linear-gradient(180deg, #f5f3ff 0%, #eee8ff 20%, #faf9ff 60%, #ffffff 100%)",
        h1: "#1a1040",
        sub: "rgba(80,70,130,0.6)",
        cardBg: "rgba(255,255,255,0.8)",
        cardBorder: "rgba(120,100,255,0.1)",
        cardShadow: "0 8px 32px rgba(100,80,200,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        text: "rgba(60,50,110,0.75)",
        heading: "#1a1040",
        divider: "rgba(120,100,255,0.08)",
    },
}

const sections = [
    {
        title: "1. Acceptance of Terms",
        content: "By creating an account or using Resumind, you confirm that:",
        bullets: [
            "You are at least 13 years old",
            "You agree to comply with these Terms",
            "You will use the platform responsibly and legally",
        ],
    },
    {
        title: "2. Description of Service",
        content: "Resumind provides AI-powered tools to help users:",
        bullets: [
            "Create resumes",
            "Improve formatting and content",
            "Generate AI suggestions for career documents",
        ],
        after: "The platform is provided \"as is\" and may evolve over time.",
    },
    {
        title: "3. User Accounts",
        content: "You agree to:",
        bullets: [
            "Provide accurate and truthful information",
            "Keep your login credentials secure",
            "Be responsible for all activity under your account",
        ],
        after: "We reserve the right to suspend or terminate accounts that violate these Terms.",
    },
    {
        title: "4. User Responsibilities",
        content: "You agree NOT to:",
        bullets: [
            "Upload false, misleading, or illegal content",
            "Use Resumind for spam, fraud, or abusive purposes",
            "Attempt to hack, reverse-engineer, or disrupt the platform",
        ],
    },
    {
        title: "5. AI Disclaimer",
        content: "Resumind uses AI to generate resume suggestions. While we aim for high-quality outputs, we do not guarantee job interviews, job offers, or career outcomes.",
        after: "All AI-generated content should be reviewed and edited by users before use.",
        highlight: true,
    },
    {
        title: "6. Intellectual Property",
        bullets: [
            "The Resumind platform, design, and technology are owned by Resumind.",
            "Users retain ownership of their personal resume content.",
            "You grant us permission to process your content solely to provide the service.",
        ],
    },
    {
        title: "7. Subscription & Payments (Future Plans)",
        content: "If premium plans are introduced:",
        bullets: [
            "Pricing will be clearly displayed before purchase",
            "Subscriptions may auto-renew unless cancelled",
            "Refund policies will be stated separately",
        ],
    },
    {
        title: "8. Account Termination",
        content: "We may suspend or terminate accounts if users:",
        bullets: [
            "Violate these Terms",
            "Engage in abusive, illegal, or harmful activity",
            "Attempt to exploit or misuse the AI system",
        ],
        after: "Users may delete their accounts at any time.",
    },
    {
        title: "9. Limitation of Liability",
        content: "To the maximum extent permitted by law, Resumind shall not be liable for:",
        bullets: [
            "Job rejections or hiring outcomes",
            "Loss of opportunities or income",
            "Errors in AI-generated content",
            "Service interruptions or technical issues",
        ],
        after: "Use of the platform is at your own risk.",
    },
    {
        title: "10. Modifications to Service",
        content: "We reserve the right to:",
        bullets: [
            "Update features",
            "Modify pricing (with notice)",
            "Temporarily or permanently discontinue parts of the service",
        ],
    },
    {
        title: "11. Governing Law",
        content: "These Terms shall be governed by the laws of India, without regard to conflict of law principles.",
    },
    {
        title: "12. Contact Information",
        content: "For questions regarding these Terms:",
        after: "Resumind Support\nEmail: reyyansayyed2@gmail.com",
    },
]

export default function Terms() {
    const { resolvedTheme } = useTheme()
    const t = palette[resolvedTheme] || palette.dark

    return (
        <div className="min-h-screen transition-colors duration-500" style={{ background: t.pageBg }}>

            {/* Hero */}
            <section className="relative pt-32 pb-16 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,100,255,0.10) 0%, transparent 70%)"
                }} />
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-3xl mx-auto relative z-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-[10px] font-black uppercase tracking-[0.25em] bg-primary/10 text-primary border border-primary/20">
                        <ScrollText className="w-3.5 h-3.5" /> Terms & Conditions
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6" style={{ color: t.h1 }}>
                        Fair Rules,{" "}
                        <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
                            Transparent Terms
                        </span>
                    </h1>
                    <p className="text-base" style={{ color: t.sub }}>Last Updated: 01/03/2026</p>
                </motion.div>
            </section>

            {/* Content */}
            <section className="pb-24 px-4">
                <div className="max-w-3xl mx-auto">

                    {/* Intro */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="rounded-[2rem] p-8 mb-8"
                        style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: "blur(20px)", boxShadow: t.cardShadow }}
                    >
                        <p className="text-sm leading-relaxed" style={{ color: t.text }}>
                            Welcome to Resumind, an AI-powered resume builder platform. By accessing or using Resumind,
                            you agree to these Terms & Conditions ("Terms").
                        </p>
                        <p className="text-sm leading-relaxed mt-4 font-semibold" style={{ color: t.heading }}>
                            If you do not agree, please do not use the service.
                        </p>
                    </motion.div>

                    {/* Sections */}
                    <div className="space-y-6">
                        {sections.map((sec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="rounded-[2rem] p-8"
                                style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: "blur(20px)", boxShadow: t.cardShadow }}
                            >
                                <h2 className="text-lg font-black mb-5" style={{ color: t.heading }}>{sec.title}</h2>
                                <div className="space-y-4">
                                    {sec.content && (
                                        <p className="text-sm leading-relaxed" style={{ color: t.text }}>{sec.content}</p>
                                    )}
                                    {sec.bullets && (
                                        <ul className="space-y-2">
                                            {sec.bullets.map((b, j) => (
                                                <li key={j} className="flex items-start gap-3 text-sm" style={{ color: t.text }}>
                                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {sec.after && (
                                        <p className={`text-sm leading-relaxed whitespace-pre-line ${sec.highlight ? "font-bold text-amber-500" : ""}`}
                                            style={!sec.highlight ? { color: t.text } : {}}>
                                            {sec.after}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}
