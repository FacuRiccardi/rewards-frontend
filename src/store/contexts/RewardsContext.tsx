import { createContext, useContext } from "react"
import { Reward, Redemption, Pagination } from "./types"

interface RewardsContextType {
  rewards: Reward[]
  redemptions: Redemption[]
  rewardsPagination: Pagination
  redemptionsPagination: Pagination
  redeemReward: (rewardId: number) => Promise<void>
  fetchRewards: (page?: number, limit?: number) => Promise<void>
  fetchRedemptions: (page?: number, limit?: number) => Promise<void>
  cleanRewards: () => void
  isRewardsLoading: boolean
  isRedemptionsLoading: boolean
  redeemLoading: number | null
}

export const RewardsContext = createContext<RewardsContextType | undefined>(undefined)

export function useRewards() {
  const context = useContext(RewardsContext)
  if (context === undefined) {
    throw new Error("useRewards must be used within a RewardsProvider")
  }
  return context
}