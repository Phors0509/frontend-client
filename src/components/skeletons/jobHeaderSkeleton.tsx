import { Skeleton } from "@/components/ui/skeleton";

export const JobHeaderSkeleton = () => (
  <div className="flex justify-between items-center mb-8">
    <Skeleton className="h-8 w-48" />
    <div className="flex gap-2">
      <Skeleton className="h-10 w-32" />
    </div>
  </div>
);