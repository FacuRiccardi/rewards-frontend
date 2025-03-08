import { Card, CardContent } from "@/components/ui/card"
import { PointsBalance } from "./PointsBalance"

interface WelcomeCardProps {
  userName: string
  points: number
}

export function WelcomeCard({ userName, points }: WelcomeCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-semibold">Welcome back, {userName}! 👋</h3>
            <p className="text-gray-500">Here's your current balance:</p>
          </div>
          <PointsBalance points={points} />
        </div>
      </CardContent>
    </Card>
  )
} 