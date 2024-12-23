import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

export function TableSkeleton() {

  return (
    <div className="w-full float-end  border m-2 p-2 rounded-md">
      <div className="flex items-center py-4 justify-between">
        <Skeleton className="h-7 w-[200px]" />
        <Skeleton className="h-10 w-[60px]" />
      </div>
      <div className="rounded-md border">
        <Table className="overflow-hidden">
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index} className="w-full">
                <TableCell>
                  <Skeleton className="h-2 w-2" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[150px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[80px]" />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div>
          <Skeleton className="h-5 w-[150px]" />
        </div>
        <div className="flex gap-2">
        <Skeleton className="h-8 w-[80px]" />
        <Skeleton className="h-8 w-[80px]" />
        </div>
      </div>
    </div>
  )
}