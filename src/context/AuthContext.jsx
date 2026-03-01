import { createContext, useContext, useEffect, useState } from "react"
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithRedirect,
    getRedirectResult,
    signOut,
    updateProfile,
} from "firebase/auth"
import { auth, googleProvider } from "../lib/firebase"
import { upsertUserProfile } from "../lib/resumeService"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let authReady = false
        let redirectReady = false

        function markReady() {
            if (authReady && redirectReady) setLoading(false)
        }

        // Handle result coming back from Google redirect
        getRedirectResult(auth)
            .then(async (result) => {
                if (result?.user) {
                    const user = result.user
                    const nameParts = (user.displayName || "").split(" ")
                    await upsertUserProfile(user.uid, {
                        firstName: nameParts[0] || "",
                        lastName: nameParts.slice(1).join(" ") || "",
                        displayName: user.displayName || "",
                        email: user.email || "",
                    })
                }
            })
            .catch(console.error)
            .finally(() => {
                redirectReady = true
                markReady()
            })

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            authReady = true
            markReady()
        })
        return unsubscribe
    }, [])

    async function signInWithEmail(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    async function signUpWithEmail(email, password, firstName, lastName) {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        const displayName = `${firstName} ${lastName}`.trim()
        // Update Auth profile
        await updateProfile(result.user, { displayName })
        // Create Firestore profile doc
        await upsertUserProfile(result.user.uid, {
            firstName,
            lastName,
            displayName,
            email,
            createdAt: new Date().toISOString(),
        })
        return result
    }

    async function signInWithGoogle() {
        // Redirect flow — no popup, works in all browsers
        return signInWithRedirect(auth, googleProvider)
    }

    async function logout() {
        return signOut(auth)
    }

    const value = { currentUser, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, logout }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within AuthProvider")
    return context
}
