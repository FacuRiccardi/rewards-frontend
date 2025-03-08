import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "@/store/contexts/UserContext"

export function ProtectedRoute() {
  const { user } = useUser()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
} 