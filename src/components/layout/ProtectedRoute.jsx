import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export function ProtectedRoute() {
    const { currentUser, loading } = useAuth()

    if (loading) return null // AuthProvider already blocks render while loading

    if (!currentUser) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
