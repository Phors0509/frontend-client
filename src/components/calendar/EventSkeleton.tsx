import { Skeleton } from "@/components/ui/skeleton";

export const EventSkeleton = () => (
  <div className="p-4 space-y-4">
    <Skeleton className="h-6 w-3/4" /> {/* Event title */}
    <div className="space-y-2">
      <Skeleton className="h-4 w-1/2" /> {/* Time */}
      <Skeleton className="h-4 w-1/3" /> {/* Location */}
    </div>
  </div>
);