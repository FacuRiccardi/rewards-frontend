import { useEffect } from "react"
import { useRewards } from "@/store/contexts/RewardsContext"
import { RedemptionsTable } from "@/components/common/RedemptionsTable"
import { Button } from "@/components/ui/button"

const Redemptions = () => {
  const { redemptions, fetchRedemptions, isRedemptionsLoading, redemptionsPagination } = useRewards()

  useEffect(() => {
    if (redemptions.length === 0) {
      fetchRedemptions(0, 1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Redemption History</h1>
      <RedemptionsTable
        redemptions={redemptions}
        isLoading={isRedemptionsLoading}
      />
      {
        !isRedemptionsLoading && redemptionsPagination.currentPage < redemptionsPagination.totalPages && (
          <div className="flex justify-center">
            <Button onClick={() => fetchRedemptions(redemptionsPagination.currentPage + 1, 1)} className="w-full bg-amber-300 hover:bg-amber-500 text-black">Load more</Button>
          </div>
        )
      }
    </div>
  )
}

export default Redemptions