import { ReactNode, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { User } from "../contexts/types"
import { apiFetch } from "../../lib/apiFetch"

interface UserProviderProps {
  children: ReactNode
  onLoginSuccess?: () => Promise<void>
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (username: string, password: string, onSuccess: () => void) => {
    try {
      setIsLoading(true)

      const { user } = await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })

      setUser(user)
      onSuccess()
    } catch(error) {
      console.error('Error logging in', error)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name:string, username: string, password: string, onSuccess: () => void) => {
    try {
      setIsLoading(true)

      const { user } = await apiFetch('/register', {
        method: 'POST',
        body: JSON.stringify({ name, username, password }),
      })

      setUser(user)
      onSuccess()
    } catch(error) {
      console.error('Error registering', error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setUser(null)
  }

  const updatePoints = async (newPoints: number) => {
    // Simulate API call delay
    await delay(800)
    if (user) {
      setUser({ ...user, points: newPoints })
    }
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout, updatePoints, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}