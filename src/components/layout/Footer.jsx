import { Link } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext"

const palette = {
    dark: {
        bg: "rgba(8,6,18,1)",
        borderTop: "rgba(130,110,255,0.08)",
        logoBg: "linear-gradient(135deg, #8b7cf8, #6d5ce7)",
        logoShadow: "0 2px 8px rgba(120,100,248,0.3)",
        brandName: "rgba(225,220,255,0.95)",
        tagline: "rgba(160,150,210,0.5)",
        heading: "rgba(210,205,255,0.85)",
        link: "rgba(150,140,200,0.55)",
        linkHover: "rgba(180,170,240,0.85)",
        divider: "rgba(130,110,255,0.06)",
        copy: "rgba(130,120,180,0.45)",
    },
    light: {
        bg: "#faf9ff",
        borderTop: "rgba(120,100,255,0.08)",
        logoBg: "linear-gradient(135deg, #8b7cf8, #6d5ce7)",
        logoShadow: "0 2px 8px rgba(120,100,248,0.2)",
        brandName: "#1a1040",
        tagline: "rgba(80,70,130,0.55)",
        heading: "#1a1040",
        link: "rgba(80,70,130,0.5)",
        linkHover: "rgba(100,80,200,0.85)",
        divider: "rgba(120,100,255,0.06)",
        copy: "rgba(80,70,130,0.4)",
    },
}

export function Footer() {
    const { resolvedTheme } = useTheme()
    const t = palette[resolvedTheme] || palette.dark

    return (
        <footer
            className="pt-16 pb-8 transition-colors duration-500"
            style={{
                background: t.bg,
                borderTop: `1px solid ${t.borderTop}`,
            }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <Link to="/" className="flex items-center gap-2">
                            <img
                                src="/logo.png"
                                alt="Resumind Logo"
                                className="h-44 w-auto"
                            />
                        </Link>
                        <p className="text-sm leading-6 max-w-xs" style={{ color: t.tagline }}>
                            Meticulously crafted AI-powered resumes that stand out. Land your dream job with minimal effort.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6" style={{ color: t.heading }}>Product</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {[
                                        { to: "/templates", label: "Templates" },
                                        { to: "/dashboard", label: "Dashboard" },
                                    ].map(({ to, label }) => (
                                        <li key={to}>
                                            <Link
                                                to={to}
                                                className="text-sm leading-6 transition-colors duration-200"
                                                style={{ color: t.link }}
                                                onMouseEnter={e => (e.target.style.color = t.linkHover)}
                                                onMouseLeave={e => (e.target.style.color = t.link)}
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6" style={{ color: t.heading }}>Resources</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {[
                                        { to: "/blog", label: "Blog" },
                                        { to: "/blog/guide", label: "Expert Guides" },
                                    ].map(({ to, label }) => (
                                        <li key={to}>
                                            <Link
                                                to={to}
                                                className="text-sm leading-6 transition-colors duration-200"
                                                style={{ color: t.link }}
                                                onMouseEnter={e => (e.target.style.color = t.linkHover)}
                                                onMouseLeave={e => (e.target.style.color = t.link)}
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6" style={{ color: t.heading }}>Company</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {[
                                        { to: "/about", label: "About" },
                                        { to: "/privacy", label: "Privacy" },
                                        { to: "/terms", label: "Terms" },
                                    ].map(({ to, label }) => (
                                        <li key={label}>
                                            <Link
                                                to={to}
                                                className="text-sm leading-6 transition-colors duration-200"
                                                style={{ color: t.link }}
                                                onMouseEnter={e => (e.target.style.color = t.linkHover)}
                                                onMouseLeave={e => (e.target.style.color = t.link)}
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="mt-16 pt-8 sm:mt-20 lg:mt-24 flex items-center justify-between"
                    style={{ borderTop: `1px solid ${t.divider}` }}
                >
                    <p className="text-xs leading-5" style={{ color: t.copy }}>
                        &copy; {new Date().getFullYear()} Resumind, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
