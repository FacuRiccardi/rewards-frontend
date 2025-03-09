import { Card, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Reward } from "@/store/contexts/types"
import { Loader2 } from "lucide-react"

interface RewardCardProps {
  reward?: Reward
  onRedeem?: () => void
  isLoading?: boolean
  disabled?: boolean
}

export default function RewardCard({ reward, onRedeem, isLoading, disabled }: RewardCardProps) {
  return reward ? (
    <Card>
      <CardContent className="pt-1">
        <CardTitle className="text-xl">{reward.title}</CardTitle>
        <CardDescription>{reward.subtitle}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-semibold">{reward.price} points</span>
        <Button
          onClick={onRedeem}
          className="bg-amber-300 hover:bg-amber-500 text-black w-25"
          disabled={disabled}
        >
          { isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Redeem"
          )}
        </Button>
      </CardFooter>
    </Card>
  ) : (
    <Card>
      <CardContent className="pt-3">
        <CardTitle><Skeleton className="h-6 w-3/4 mb-2" /></CardTitle>
        <CardDescription><Skeleton className="h-4 w-full" /></CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-semibold"><Skeleton className="h-4 w-25" /></span>
        <Button
          onClick={onRedeem}
          className="bg-amber-300 hover:bg-amber-500 text-black w-25"
        >
          <Loader2 className="animate-spin" />
        </Button>
      </CardFooter>
    </Card>
  )
}