import { useEffect } from "react"
import { WelcomeCard } from "@/components/common/WelcomeCard"
import { RewardList } from "@/components/common/RewardList"
import { useUser } from "@/store/contexts/UserContext"
import { useRewards } from "@/store/contexts/RewardsContext"

const Home = () => {
  const { user } = useUser()
  const { rewards, fetchRewards, isRewardsLoading, rewardsPagination, redeemReward, redeemLoading } = useRewards()

  useEffect(() => {
    if (rewards.length === 0) {
      fetchRewards()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <WelcomeCard userName={user?.name || ""} points={user?.points || 0} />
        <h2 className="text-3xl font-bold">Available Rewards</h2>
        <RewardList
          rewards={rewards}
          fetchRewards={() => fetchRewards(rewardsPagination.currentPage + 1)}
          isLoading={isRewardsLoading}
          showLoadButton={rewardsPagination.currentPage < rewardsPagination.totalPages}
          onRedeem={redeemReward}
          redeemLoading={redeemLoading}
        />
      </div>
    </main>
  )
}

export default Home