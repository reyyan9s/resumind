import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"
import { Shield } from "lucide-react"

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
        title: "1. Information We Collect",
        subsections: [
            {
                subtitle: "1.1 Personal Information",
                content: "When you create an account or use Resumind, we may collect:",
                bullets: ["Full name", "Email address", "Login credentials (encrypted)", "Profile information you choose to provide"],
            },
            {
                subtitle: "1.2 Resume & User-Generated Content",
                content: "We collect and store the content you provide to generate resumes, including:",
                bullets: ["Education details", "Work experience", "Skills and achievements", "Contact information included in resume drafts", "Any additional content entered into the editor"],
                after: "This information is used solely to provide and improve our services.",
            },
            {
                subtitle: "1.3 Usage & Technical Data",
                content: "We may automatically collect:",
                bullets: ["Device type, browser, and operating system", "Pages visited and actions taken", "Time spent on features", "IP address (for security and analytics)"],
            },
            {
                subtitle: "1.4 Cookies & Tracking Technologies",
                content: "We use cookies and similar technologies to:",
                bullets: ["Maintain login sessions", "Remember user preferences (such as themes and templates)", "Analyze product usage to improve features"],
                after: "You can disable cookies in your browser settings, but some features may not function properly.",
            },
        ],
    },
    {
        title: "2. How We Use Your Information",
        content: "We use collected data to:",
        bullets: [
            "Generate AI-powered resumes and suggestions",
            "Save and manage your resume projects",
            "Improve product features and AI performance",
            "Provide customer support",
            "Send essential service-related updates",
            "Ensure security and prevent fraud or abuse",
        ],
        after: "We do NOT sell your personal resume data.",
        highlight: true,
    },
    {
        title: "3. AI Processing & Data Usage",
        content: "Resumind uses artificial intelligence to analyze and enhance resume content. Your provided data is processed only to:",
        bullets: ["Generate resume drafts", "Suggest improvements and formatting", "Personalize resume outputs"],
        after: "We do not sell, rent, or publicly share your personal resume content. We do not use your private resume data for advertising purposes.",
    },
    {
        title: "4. Data Storage & Security",
        content: "We implement industry-standard security measures, including:",
        bullets: ["Encrypted data storage", "Secure cloud infrastructure", "Access control and authentication safeguards"],
        after: "While we strive to protect your data, no online system can be guaranteed to be 100% secure.",
    },
    {
        title: "5. Sharing of Information",
        content: "We do not sell or rent your personal data. We may share limited data with trusted third-party providers strictly to operate our services, such as:",
        bullets: ["Payment processors (e.g., Stripe, Razorpay)", "Analytics providers (e.g., Google Analytics)", "Cloud hosting and infrastructure providers"],
        after: "These partners are required to maintain confidentiality and data security.",
    },
    {
        title: "6. Data Retention",
        content: "We retain your information only as long as necessary to:",
        bullets: ["Provide our services", "Maintain your account and resume history", "Comply with legal obligations"],
        after: "You may delete your account at any time to remove stored data.",
    },
    {
        title: "7. Your Rights & Choices",
        content: "You have the right to:",
        bullets: ["Access and edit your personal information", "Download your resume data", "Request deletion of your account and stored data"],
        after: "To request deletion, contact us at: reyyansayyed2@gmail.com",
    },
    {
        title: "8. International Data Transfers",
        content: "Resumind may store and process data on servers located outside your country. By using our platform, you consent to such transfers in accordance with applicable data protection laws.",
    },
    {
        title: "9. Children's Privacy",
        content: "Resumind is not intended for users under the age of 13. We do not knowingly collect personal data from children.",
    },
    {
        title: "10. Changes to This Policy",
        content: "We may update this Privacy Policy from time to time. We will notify users of material changes via email or platform notice.",
    },
    {
        title: "11. Contact Us",
        content: "If you have questions about this Privacy Policy, contact:",
        after: "Resumind Support\nEmail: reyyansayyed2@gmail.com",
    },
]

export default function Privacy() {
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
                        <Shield className="w-3.5 h-3.5" /> Privacy Policy
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6" style={{ color: t.h1 }}>
                        Your Privacy,<br />
                        <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
                            Our Responsibility
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
                            Welcome to Resumind ("we," "our," or "us"). Your privacy is extremely important to us.
                            This Privacy Policy explains how we collect, use, store, and protect your information when
                            you use our AI-powered resume builder platform.
                        </p>
                        <p className="text-sm leading-relaxed mt-4 font-semibold" style={{ color: t.heading }}>
                            By using Resumind, you agree to the practices described in this Privacy Policy.
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

                                {/* Flat section */}
                                {!sec.subsections && (
                                    <div className="space-y-4">
                                        {sec.content && <p className="text-sm leading-relaxed" style={{ color: t.text }}>{sec.content}</p>}
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
                                            <p className={`text-sm leading-relaxed mt-2 whitespace-pre-line ${sec.highlight ? "font-bold text-primary" : ""}`} style={!sec.highlight ? { color: t.text } : {}}>
                                                {sec.after}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Subsection section */}
                                {sec.subsections && (
                                    <div className="space-y-6">
                                        {sec.subsections.map((sub, j) => (
                                            <div key={j}>
                                                {j > 0 && <div className="border-t mb-6" style={{ borderColor: t.divider }} />}
                                                <h3 className="text-sm font-bold mb-3" style={{ color: t.heading }}>{sub.subtitle}</h3>
                                                {sub.content && <p className="text-sm leading-relaxed mb-3" style={{ color: t.text }}>{sub.content}</p>}
                                                {sub.bullets && (
                                                    <ul className="space-y-2 mb-3">
                                                        {sub.bullets.map((b, k) => (
                                                            <li key={k} className="flex items-start gap-3 text-sm" style={{ color: t.text }}>
                                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                                                {b}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {sub.after && <p className="text-sm leading-relaxed" style={{ color: t.text }}>{sub.after}</p>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
