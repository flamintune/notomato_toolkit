import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './componets/AuthProvider'
import { lazy } from 'react'

const PublicServicePage = () => <div>Service Page</div>
const AboutUsPage = () => <div>About Us</div>
const LoginPage = lazy(() => import('./pages/login'))
const HomePage = () => <div>Home</div>
const UserHomePage = () => <div>User Home Page</div>
const UserProfile = () => <div>User Profile</div>
const Logout = () => <div>Logout</div>

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  return token ? children : <Navigate to={'/login'} replace />
}
//! 当路由不匹配不会触发
const RouteConfig = () => {
  const { token } = useAuth()
  return (
    <Router>
      <Routes>
        {/* Public routes no problem */}
        <Route path="/service" element={<PublicServicePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />

        {/* Non-authenticated user routes */}
        {!token && (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </>
        )}

        {/* Authenticated user routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Outlet />}>
            <Route index element={<UserHomePage />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Route>
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default RouteConfig
export { RouteConfig }
