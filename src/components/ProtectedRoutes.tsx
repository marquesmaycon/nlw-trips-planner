import { useAuth } from "../hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
  const user = useAuth()
  return !user ? <Navigate to="/auth/login" replace /> : <Outlet />
}

export default ProtectedRoutes
