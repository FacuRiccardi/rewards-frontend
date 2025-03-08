import { Coins } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface PointsBalanceProps {
  points?: number
}

export function PointsBalance({ points }: PointsBalanceProps) {
  return (
    <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
      <Coins className="h-4 w-4 text-amber-500" />
      {points !== undefined ? (
        <span className="font-semibold text-amber-900">{points.toLocaleString()} points</span>
      ) : (
        <Skeleton className="h-4 w-24" />
      )}
    </div>
  )
} 