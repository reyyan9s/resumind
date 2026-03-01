import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { AlertCircle, Loader2 } from "lucide-react"

const palette = {
    dark: {
        pageBg: "radial-gradient(ellipse 120% 80% at 50% -10%, #1a1040 0%, #0d0b16 40%, #080810 100%)",
        spotlight: "radial-gradient(ellipse at center, rgba(120,100,255,0.08) 0%, transparent 70%)",
        h1: "rgba(235,232,255,0.97)",
        sub: "rgba(180,170,230,0.55)",
        cardBg: "rgba(22,18,50,0.45)",
        cardBorder: "rgba(130,110,255,0.12)",
        cardShadow: "0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(160,140,255,0.08)",
        inputBg: "rgba(255,255,255,0.03)",
        inputBorder: "rgba(255,255,255,0.08)",
        divider: "rgba(130,110,255,0.1)",
        text: "rgba(235,232,255,0.9)",
    },
    light: {
        pageBg: "linear-gradient(180deg, #f5f3ff 0%, #eee8ff 30%, #faf9ff 60%, #ffffff 100%)",
        spotlight: "radial-gradient(ellipse at center, rgba(120,100,255,0.06) 0%, transparent 70%)",
        h1: "#1a1040",
        sub: "rgba(80,70,130,0.6)",
        cardBg: "rgba(255,255,255,0.72)",
        cardBorder: "rgba(120,100,255,0.12)",
        cardShadow: "0 24px 64px rgba(100,80,200,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
        inputBg: "rgba(255,255,255,0.8)",
        inputBorder: "rgba(0,0,0,0.06)",
        divider: "rgba(120,100,255,0.1)",
        text: "#1a1040",
    },
}

function getFirebaseError(code) {
    switch (code) {
        case "auth/email-already-in-use":
            return "An account with this email already exists."
        case "auth/weak-password":
            return "Password must be at least 6 characters."
        case "auth/invalid-email":
            return "Please enter a valid email address."
        case "auth/popup-closed-by-user":
            return "Google sign-in was cancelled."
        default:
            return "Something went wrong. Please try again."
    }
}

export default function Signup() {
    const { resolvedTheme } = useTheme()
    const t = palette[resolvedTheme] || palette.dark
    const { signUpWithEmail, signInWithGoogle } = useAuth()
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        if (!firstName || !email || !password) return
        setError("")
        setLoading(true)
        try {
            await signUpWithEmail(email, password, firstName, lastName)
            navigate("/dashboard")
        } catch (err) {
            setError(getFirebaseError(err.code))
        } finally {
            setLoading(false)
        }
    }

    async function handleGoogle() {
        setError("")
        setGoogleLoading(true)
        try {
            await signInWithGoogle() // triggers redirect — page navigates away
        } catch (err) {
            setError(getFirebaseError(err.code))
            setGoogleLoading(false)
        }
        // Don't set loading to false — page is redirecting away
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500" style={{ background: t.pageBg }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none" style={{ background: t.spotlight }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[460px] relative z-10"
            >
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2.5 group">
                        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center font-bold text-white shadow-xl transition-transform group-hover:scale-105">
                            R
                        </div>
                        <span className="text-2xl font-bold tracking-tight" style={{ color: t.h1 }}>Resumind</span>
                    </Link>
                </div>

                <div className="rounded-[2.25rem] p-8 lg:p-10 relative overflow-hidden"
                    style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: "blur(24px)", boxShadow: t.cardShadow }}>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold tracking-tight mb-2" style={{ color: t.h1 }}>Create an account</h2>
                        <p className="text-sm" style={{ color: t.sub }}>Start building your next resume today</p>
                    </div>

                    <div className="space-y-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogle}
                            disabled={googleLoading || loading}
                            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border-opacity-30"
                            style={{ background: t.inputBg, borderColor: t.inputBorder, color: t.text }}
                        >
                            {googleLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            )}
                            Sign up with Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" style={{ borderColor: t.divider }} />
                            </div>
                            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                                <span className="px-4" style={{ background: "transparent", color: t.sub }}>Or email</span>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium"
                            >
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wider pl-1" style={{ color: t.sub }}>First name</label>
                                    <Input
                                        type="text"
                                        placeholder="John"
                                        className="h-11 rounded-xl"
                                        style={{ background: t.inputBg, borderColor: t.inputBorder, color: t.text }}
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wider pl-1" style={{ color: t.sub }}>Last name</label>
                                    <Input
                                        type="text"
                                        placeholder="Doe"
                                        className="h-11 rounded-xl"
                                        style={{ background: t.inputBg, borderColor: t.inputBorder, color: t.text }}
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider pl-1" style={{ color: t.sub }}>Email address</label>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="h-11 rounded-xl"
                                    style={{ background: t.inputBg, borderColor: t.inputBorder, color: t.text }}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider pl-1" style={{ color: t.sub }}>Password</label>
                                <Input
                                    type="password"
                                    placeholder="Min. 6 characters"
                                    className="h-11 rounded-xl"
                                    style={{ background: t.inputBg, borderColor: t.inputBorder, color: t.text }}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading || googleLoading}
                                className="w-full h-12 text-sm font-bold mt-2 rounded-xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {loading ? "Creating account..." : "Create Account"}
                            </Button>
                        </form>
                    </div>

                    <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: t.divider }}>
                        <p className="text-sm" style={{ color: t.sub }}>
                            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
