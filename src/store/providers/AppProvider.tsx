import { ReactNode } from "react"
import { UserProvider } from "./UserProvider"
import { RewardsProvider } from "./RewardsProvider"

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <UserProvider>
      <RewardsProvider>
        {children}
      </RewardsProvider>
    </UserProvider>
  )
} 