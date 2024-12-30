import { Skeleton } from "@/components/ui/skeleton";

export const ToolbarSkeleton = () => (
  <div className="flex justify-between items-center p-4">
    <div className="flex gap-2">
      <Skeleton className="h-9 w-24" /> {/* Navigation buttons */}
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-9 w-24" />
    </div>
    <Skeleton className="h-9 w-40" /> {/* Current view label */}
    <div className="flex gap-2">
      <Skeleton className="h-9 w-24" /> {/* View options */}
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-9 w-24" />
    </div>
  </div>
);