import { ReactNode, useState } from "react"
import { toast } from "sonner"
import { RewardsContext } from "../contexts/RewardsContext"
import { Reward, Redemption, Pagination } from "../contexts/types"
import { useUser } from "../contexts/UserContext"
import { apiFetch } from "../../lib/apiFetch"
interface RewardsProviderProps {
  children: ReactNode
}

export function RewardsProvider({ children }: RewardsProviderProps) {
  const { user, updatePoints } = useUser()
  const [rewards, setRewards] = useState<Reward[]>([])
  const [rewardsPagination, setRewardsPagination] = useState<Pagination>({
    currentPage: 0,
    totalPages: 0
  })
  const [redemptions, setRedemptions] = useState<Redemption[]>([])
  const [redemptionsPagination, setRedemptionsPagination] = useState<Pagination>({
    currentPage: 0,
    totalPages: 0
  })
  const [isRewardsLoading, setIsRewardsLoading] = useState(false)
  const [isRedemptionsLoading, setIsRedemptionsLoading] = useState(false)
  const [redeemLoading, setRedeemLoading] = useState<number | null>(null)

  const fetchRewards = async (page?: number, limit?: number) => {
    try {
      setIsRewardsLoading(true)
      const { rewards: _rewards, pagination: _pagination, error } = await apiFetch(`/users/rewards?page=${page || rewardsPagination.currentPage + 1}&limit=${limit || 12}`, {
        method: 'POST',
        body: JSON.stringify({ username: user!.username, password: user!.password }),
      })

      if (error) {
        toast.error(error)
      } else {
        setRewards([...rewards, ..._rewards])
        setRewardsPagination(_pagination)
      }
    } catch (error) {
      toast.error('Error fetching rewards, please reload the page')
    } finally {
      setIsRewardsLoading(false)
    }
  }

  const fetchRedemptions = async (page?: number, limit?: number) => {
    try {
      setIsRedemptionsLoading(true)
      const { redemptions: _redemptions, pagination: _pagination, error } = await apiFetch(`/users/redemptions?page=${page || redemptionsPagination.currentPage + 1}&limit=${limit || 12}`, {
        method: 'POST',
        body: JSON.stringify({ username: user!.username, password: user!.password }),
      })

      if (error) {
        toast.error(error)
      } else {
        setRedemptions([...redemptions, ..._redemptions])
        setRedemptionsPagination(_pagination)
      }
    } catch (error) {
      toast.error('Error fetching redemptions, please reload the page')
    } finally {
      setIsRedemptionsLoading(false)
    }
  }

  const redeemReward = async (rewardId: number) => {
    try {
      setRedeemLoading(rewardId)

      const { points, redemption, error } = await apiFetch('/users/redeem', {
        method: 'POST',
        body: JSON.stringify({ username: user!.username, password: user!.password, reward_id: rewardId })
      })

      if (error) {  
        toast.error(error)
      } else {
        setRedemptions(prev => [redemption, ...prev])
        updatePoints(points)
      }
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