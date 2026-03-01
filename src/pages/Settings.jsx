import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Moon, Sun, Monitor, Save, Trash2, Smartphone, Sparkles, User, Shield, Loader2, Check } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { updateProfile, deleteUser } from "firebase/auth"
import { auth } from "../lib/firebase"
import { upsertUserProfile, getUserProfile } from "../lib/resumeService"

const palette = {
    dark: {
        h1: "rgba(235,232,255,0.97)",
        sub: "rgba(180,170,230,0.55)",
        cardBg: "rgba(22,18,50,0.45)",
        cardBorder: "rgba(130,110,255,0.12)",
        cardShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(160,140,255,0.08)",
        inputBg: "rgba(255,255,255,0.03)",
        inputBorder: "rgba(255,255,255,0.08)",
        text: "rgba(235,232,255,0.92)",
        divider: "rgba(130,110,255,0.1)",
        dangerBg: "rgba(220,38,38,0.05)",
        dangerBorder: "rgba(220,38,38,0.2)",
    },
    light: {
        h1: "#1a1040",
        sub: "rgba(80,70,130,0.6)",
        cardBg: "rgba(255,255,255,0.72)",
        cardBorder: "rgba(120,100,255,0.12)",
        cardShadow: "0 4px 24px rgba(100,80,200,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
        inputBg: "rgba(0,0,0,0.03)",
        inputBorder: "rgba(0,0,0,0.06)",
        text: "#1a1040",
        divider: "rgba(120,100,255,0.1)",
        dangerBg: "rgba(220,38,38,0.03)",
        dangerBorder: "rgba(220,38,38,0.1)",
    },
}

export default function Settings() {
    const { theme: currentTheme, setTheme, resolvedTheme } = useTheme()
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const t = palette[resolvedTheme] || palette.dark

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [saving, setSaving] = useState(false)
    const [savedProfile, setSavedProfile] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [deleting, setDeleting] = useState(false)

    // Populate from current user
    useEffect(() => {
        if (!currentUser) return
        // Try Firestore profile first, fall back to Auth displayName
        getUserProfile(currentUser.uid).then(profile => {
            if (profile) {
                setFirstName(profile.firstName || "")
                setLastName(profile.lastName || "")
            } else {
                const parts = (currentUser.displayName || "").split(" ")
                setFirstName(parts[0] || "")
                setLastName(parts.slice(1).join(" ") || "")
            }
        })
    }, [currentUser])

    async function handleSaveProfile(e) {
        e.preventDefault()
        if (!currentUser) return
        setSaving(true)
        try {
            const displayName = `${firstName} ${lastName}`.trim()
            await updateProfile(auth.currentUser, { displayName })
            await upsertUserProfile(currentUser.uid, { firstName, lastName, displayName, email: currentUser.email })
            setSavedProfile(true)
            setTimeout(() => setSavedProfile(false), 2500)
        } catch (err) {
            console.error("Save profile error:", err)
        } finally {
            setSaving(false)
        }
    }

    async function handleDeleteAccount() {
        if (!deleteConfirm) {
            setDeleteConfirm(true)
            return
        }
        setDeleting(true)
        try {
            await deleteUser(auth.currentUser)
            await logout()
            navigate("/")
        } catch (err) {
            console.error("Delete account error:", err)
            // Likely needs re-auth — show helpful message
            alert("For security, please sign out and sign back in before deleting your account.")
            setDeleteConfirm(false)
        } finally {
            setDeleting(false)
        }
    }

    const AppearanceButton = ({ value, label, icon: Icon }) => (
        <button
            onClick={() => setTheme(value)}
            className={`flex-1 min-w-[120px] flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 ${currentTheme === value ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105' : 'hover:border-primary/40'}`}
            style={currentTheme !== value ? { background: t.inputBg, borderColor: t.inputBorder } : {}}
        >
            <Icon className={`w-6 h-6 mb-3 ${currentTheme === value ? 'text-primary' : ''}`} style={currentTheme !== value ? { color: t.text } : {}} />
            <span className={`text-sm font-bold ${currentTheme === value ? 'text-primary' : ''}`} style={currentTheme !== value ? { color: t.text } : {}}>{label}</span>
        </button>
    )

    return (
        <div className="px-6 md:px-8 lg:px-10 max-w-4xl mx-auto w-full space-y-10 pb-20 transition-colors duration-500">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary">
                    <Smartphone className="w-3.5 h-3.5" /> Preferences
                </div>
                <h1 className="text-3xl font-semibold tracking-tight" style={{ color: t.h1 }}>Settings</h1>
                <p className="text-sm mt-1.5" style={{ color: t.sub }}>Manage your account preferences and customize your workspace.</p>
            </div>

            {/* Profile Section */}
            <form onSubmit={handleSaveProfile} className="rounded-[2rem] overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow, backdropFilter: "blur(24px)" }}>
                <div className="p-8 lg:p-10 border-b" style={{ borderColor: t.divider }}>
                    <div className="flex items-center gap-3 mb-2">
                        <User className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-semibold" style={{ color: t.h1 }}>Profile Information</h2>
                    </div>
                    <p className="text-sm opacity-60" style={{ color: t.sub }}>Update your name and primary contact email.</p>
                </div>
                <div className="p-8 lg:p-10 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest pl-1" style={{ color: t.sub }}>First name</label>
                            <Input value={firstName} onChange={e => setFirstName(e.target.value)} className="h-12 rounded-xl" style={{ background: t.inputBg, borderColor: t.inputBorder, color: t.text }} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest pl-1" style={{ color: t.sub }}>Last name</label>
                            <Input value={lastName} onChange={e => setLastName(e.target.value)} className="h-12 rounded-xl" style={{ background: t.inputBg, borderColor: t.inputBorder, color: t.text }} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest pl-1" style={{ color: t.sub }}>Email address</label>
                        <Input type="email" value={currentUser?.email || ""} readOnly className="h-12 rounded-xl opacity-60 cursor-not-allowed" style={{ background: t.inputBg, borderColor: t.inputBorder, color: t.text }} />
                        <p className="text-[11px] pl-1 opacity-40" style={{ color: t.sub }}>Email cannot be changed here.</p>
                    </div>
                </div>
                <div className="p-6 bg-black/5 dark:bg-white/5 flex justify-end">
                    <Button
                        type="submit"
                        disabled={saving}
                        className={`rounded-xl h-11 px-8 font-bold gap-2 shadow-xl shadow-primary/20 transition-all hover:scale-105 flex items-center ${savedProfile ? 'bg-emerald-500 hover:scale-100' : ''}`}
                    >
                        {saving ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : savedProfile ? <Check className="w-4.5 h-4.5" /> : <Save className="w-4.5 h-4.5" />}
                        {saving ? "Saving..." : savedProfile ? "Saved!" : "Save Changes"}
                    </Button>
                </div>
            </form>

            {/* Appearance Section */}
            <div className="rounded-[2rem] overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow, backdropFilter: "blur(24px)" }}>
                <div className="p-8 lg:p-10 border-b" style={{ borderColor: t.divider }}>
                    <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-semibold" style={{ color: t.h1 }}>Appearance</h2>
                    </div>
                    <p className="text-sm opacity-60" style={{ color: t.sub }}>Choose how Resumind looks on your screen.</p>
                </div>
                <div className="p-8 lg:p-10">
                    <div className="flex flex-wrap gap-4 lg:gap-6">
                        <AppearanceButton value="light" label="Light Mode" icon={Sun} />
                        <AppearanceButton value="dark" label="Dark Mode" icon={Moon} />
                        <AppearanceButton value="system" label="System" icon={Monitor} />
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-[2rem] overflow-hidden relative" style={{ background: t.cardBg, border: `1px solid ${t.dangerBorder}`, boxShadow: t.cardShadow, backdropFilter: "blur(24px)" }}>
                <div className="absolute top-0 inset-x-0 h-1 bg-red-500/50" />
                <div className="p-8 lg:p-10 border-b" style={{ borderColor: t.divider }}>
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-5 h-5 text-red-500" />
                        <h2 className="text-xl font-semibold text-red-500">Danger Zone</h2>
                    </div>
                    <p className="text-sm opacity-60" style={{ color: t.sub }}>Critical actions related to your account.</p>
                </div>
                <div className="p-8 lg:p-10">
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between p-6 rounded-2xl" style={{ background: t.dangerBg, border: `1px solid ${t.dangerBorder}` }}>
                        <div>
                            <h4 className="font-bold text-red-500 text-sm mb-1">Delete Account</h4>
                            <p className="text-xs leading-relaxed max-w-sm" style={{ color: t.sub }}>
                                {deleteConfirm
                                    ? "⚠️ Click again to permanently delete. This cannot be undone."
                                    : "Permanently delete your account and all associated resumes. This cannot be undone."}
                            </p>
                        </div>
                        <Button
                            type="button"
                            onClick={handleDeleteAccount}
                            disabled={deleting}
                            variant="outline"
                            className={`border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-xl h-11 px-6 font-bold gap-2 transition-all hover:scale-105 active:scale-95 flex items-center ${deleteConfirm ? 'bg-red-500/10 border-red-500/60' : ''}`}
                        >
                            {deleting ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <Trash2 className="w-4.5 h-4.5" />}
                            {deleteConfirm ? "Confirm Delete" : "Delete Account"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
