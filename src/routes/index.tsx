import { Routes, Route, Navigate } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"
import AuthLayout from "@/layouts/AuthLayout"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Redemptions from "@/pages/Redemptions"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/redemptions" element={<Redemptions />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
} 