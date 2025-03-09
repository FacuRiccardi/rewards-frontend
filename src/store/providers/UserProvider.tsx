import { ReactNode, useState } from "react"
import { toast } from "sonner"
import { UserContext } from "../contexts/UserContext"
import { User } from "../contexts/types"
import { apiFetch } from "../../lib/apiFetch"
import { getItem, setItem, removeItem } from "../../lib/localstorage"

interface UserProviderProps {
  children: ReactNode
  onLoginSuccess?: () => Promise<void>
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(getItem('user'))
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [registerError, setRegisterError] = useState<string | null>(null)

  const login = async (username: string, password: string, onSuccess: () => void) => {
    try {
      setIsLoading(true)

      const { user, error } = await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })

      if (error) {
        setLoginError(error)
      } else {
        setUser(user)
        setItem('user', user)
        setLoginError(null)
        onSuccess()
      }
    } catch(error) {
      toast.error('Error registering')
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name:string, username: string, password: string, onSuccess: () => void) => {
    try {
      setIsLoading(true)

      const { user, error } = await apiFetch('/register', {
        method: 'POST',
        body: JSON.stringify({ name, username, password }),
      })


      if (error) {
        setRegisterError(error)
      } else {
        setUser(user)
        setItem('user', user)
        setRegisterError(null)
        onSuccess()
      }
    } catch(error) {
        toast.error('Error registering')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setUser(null)
    removeItem('user')
  }

  const updatePoints = async (newPoints: number) => {
    if (user) {
      setUser({ ...user, points: newPoints })
    }
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout, updatePoints, isLoading, loginError, registerError }}>
      {children}
    </UserContext.Provider>
  )
}