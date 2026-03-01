import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppLayout } from "./components/layout/AppLayout"
import { PublicLayout } from "./components/layout/PublicLayout"
import { ProtectedRoute } from "./components/layout/ProtectedRoute"
import { ScrollToTop } from "./components/layout/ScrollToTop"
import { useAuth } from "./context/AuthContext"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Builder from "./pages/Builder"
import Templates from "./pages/Templates"
import Settings from "./pages/Settings"
import Blog from "./pages/Blog"
import BlogArticle from "./pages/BlogArticle"
import Preview from "./pages/Preview"
import About from "./pages/About"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"

// Redirect logged-in users away from auth pages
function AuthRoute({ children }) {
  const { currentUser } = useAuth()
  if (currentUser) return <Navigate to="/dashboard" replace />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>

        {/* Auth Routes — redirect if already logged in */}
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />

        {/* Authenticated App Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          {/* Fullscreen authenticated routes */}
          <Route path="/builder" element={<Builder />} />
          <Route path="/preview" element={<Preview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
