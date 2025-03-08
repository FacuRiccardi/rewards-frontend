import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Redemption } from "@/store/contexts/types"

interface RedemptionsTableProps {
  redemptions: Redemption[]
  isLoading: boolean
}

export function RedemptionsTable({ redemptions, isLoading }: RedemptionsTableProps) {
  if (!isLoading && redemptions.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No redemptions yet</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Item
            </TableHead>
            <TableHead className="max-md:w-[30%]">
              Description
            </TableHead>
            <TableHead>
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {redemptions.map((redemption) => (
            <TableRow key={redemption.id}>
              <TableCell className="font-medium px-3">{redemption.rewardTitle}</TableCell>
              <TableCell className="max-md:truncate">{redemption.rewardSubtitle}</TableCell>
              <TableCell>
                <span className="md:hidden">
                  {new Date(redemption.redeemedAt).toLocaleDateString()}
                </span>
                <span className="hidden md:block">
                  {new Date(redemption.redeemedAt).toLocaleString()}
                </span>
              </TableCell>
            </TableRow>
          ))}
          { isLoading && [...Array(3)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}