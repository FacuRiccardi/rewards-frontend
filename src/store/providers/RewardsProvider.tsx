import { ReactNode, useState } from "react"
import { toast } from "sonner"
import { RewardsContext } from "../contexts/RewardsContext"
import { Reward, Redemption, Pagination } from "../contexts/types"
import { useUser } from "../contexts/UserContext"
import { apiFetch } from "../../lib/apiFetch"
import { getItem, setItem, removeItem } from "../../lib/localstorage"
interface RewardsProviderProps {
  children: ReactNode
}

export function RewardsProvider({ children }: RewardsProviderProps) {
  const { user, updatePoints } = useUser()
  const [rewards, setRewards] = useState<Reward[]>(getItem('rewards') || [])
  const [rewardsPagination, setRewardsPagination] = useState<Pagination>(getItem('rewardsPagination') || {
    currentPage: 0,
    totalPages: 0
  })
  const [redemptions, setRedemptions] = useState<Redemption[]>(getItem('redemptions') || [])
  const [redemptionsPagination, setRedemptionsPagination] = useState<Pagination>(getItem('redemptionsPagination') || {
    currentPage: 0,
    totalPages: 0
  })
  const [isRewardsLoading, setIsRewardsLoading] = useState(false)
  const [isRedemptionsLoading, setIsRedemptionsLoading] = useState(false)
  const [redeemLoading, setRedeemLoading] = useState<number | null>(null)

  const fetchRewards = async (page?: number, limit?: number) => {
    try {
      setIsRewardsLoading(true)
      const { rewards: _rewards, pagination: _pagination } = await apiFetch(`/users/rewards?page=${page || rewardsPagination.currentPage + 1}&limit=${limit || 12}`, {
        method: 'POST',
        body: JSON.stringify({ username: user!.username, password: user!.password }),
      })

      setRewards([...rewards, ..._rewards])
      setRewardsPagination(_pagination)
      setItem('rewards', [...rewards, ..._rewards])
      setItem('rewardsPagination', _pagination)
    } catch (error) {
      toast.error('Error fetching rewards, please reload the page')
    } finally {
      setIsRewardsLoading(false)
    }
  }

  const fetchRedemptions = async (page?: number, limit?: number) => {
    try {
      setIsRedemptionsLoading(true)
      const { redemptions: _redemptions, pagination: _pagination } = await apiFetch(`/users/redemptions?page=${page || redemptionsPagination.currentPage + 1}&limit=${limit || 12}`, {
        method: 'POST',
        body: JSON.stringify({ username: user!.username, password: user!.password }),
      })
      setRedemptions([...redemptions, ..._redemptions])
      setRedemptionsPagination(_pagination)
      setItem('redemptions', [...redemptions, ..._redemptions])
      setItem('redemptionsPagination', _pagination)
    } catch (error) {
      toast.error('Error fetching redemptions, please reload the page')
    } finally {
      setIsRedemptionsLoading(false)
    }
  }

  const redeemReward = async (rewardId: number) => {
    try {
      setRedeemLoading(rewardId)

      const { points, redemption } = await apiFetch('/users/redeem', {
        method: 'POST',
        body: JSON.stringify({ username: user!.username, password: user!.password, reward_id: rewardId })
      })

      setRedemptions(prev => [redemption, ...prev])
      updatePoints(points)
      toast.success('Reward redeemed successfully')
      setItem('redemptions', [redemption, ...redemptions])
    } catch (error) {
      toast.error('Error redeeming reward, please try again')
    } finally {
      setRedeemLoading(null)
    }
  }

  const cleanRewards = async () => {
    setRewards([])
    setRewardsPagination({
      currentPage: 0,
      totalPages: 0
    })
    setRedemptions([])
    setRedemptionsPagination({
      currentPage: 0,
      totalPages: 0
    })
    removeItem('rewards')
    removeItem('rewardsPagination')
    removeItem('redemptions')
    removeItem('redemptionsPagination')
  }

  return (
    <RewardsContext.Provider
      value={{
        rewards,
        redemptions,
        rewardsPagination,
        redemptionsPagination,
        redeemReward,
        fetchRewards,
        fetchRedemptions,
        cleanRewards,
        isRewardsLoading,
        isRedemptionsLoading,
        redeemLoading
      }}
    >
      {children}
    </RewardsContext.Provider>
  )
}