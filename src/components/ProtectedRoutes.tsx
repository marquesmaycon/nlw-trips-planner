import { useAuth } from "../hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
  const user = useAuth()
  return user ? <Outlet /> : <Navigate to="/auth/login" replace />
}

export default ProtectedRoutes
