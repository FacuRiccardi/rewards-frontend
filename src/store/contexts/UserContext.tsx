import { createContext, useContext } from "react"
import { User } from "./types"

interface UserContextType {
  user: User | null
  login: (username: string, password: string, onSuccess: () => void) => Promise<void>
  register: (name: string, username: string, password: string, onSuccess: () => void) => Promise<void>
  logout: () => Promise<void>
  updatePoints: (newPoints: number) => Promise<void>
  isLoading: boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}