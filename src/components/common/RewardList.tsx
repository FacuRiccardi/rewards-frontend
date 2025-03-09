import RewardCard from "./RewardCard"
import { Button } from "@/components/ui/button"
import { Reward } from "@/store/contexts/types"

interface RewardListProps {
  fetchRewards: () => void
  isLoading: boolean
  showLoadButton: boolean
  rewards: Reward[]
  onRedeem: (id: number) => void
  redeemLoading: number | null
}

export function RewardList({ rewards, fetchRewards, isLoading, showLoadButton, onRedeem, redeemLoading }: RewardListProps) {

  console.log('rewards on rewards list', rewards, typeof rewards)

  return (
    <div className="w-full flex-col justify-center">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            onRedeem={() => onRedeem(reward.id)}
            isLoading={redeemLoading === reward.id}
            disabled={ !!redeemLoading }
          />
        ))}
        { isLoading && (
          [...Array(3)].map((_, index) => (
            <RewardCard key={index} />
          )))
        }
      </div>
      {
        !isLoading && showLoadButton && (
          <div className="flex justify-center pt-6">
            <Button onClick={fetchRewards} className="w-full bg-amber-300 hover:bg-amber-500 text-black">Load more</Button>
          </div>
        )
      }
    </div>
  )
}