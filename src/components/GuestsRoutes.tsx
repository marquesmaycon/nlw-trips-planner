import { useAuth } from "../hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const GuestsRoutes = () => {
  const user = useAuth()
  return !user ? <Outlet /> : <Navigate to="/" replace />
}

export default GuestsRoutes
