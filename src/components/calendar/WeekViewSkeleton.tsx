import { Skeleton } from "@/components/ui/skeleton";

export const WeekViewSkeleton = () => (
  <div className="grid grid-cols-8 gap-1">
    {/* Time column */}
    <div className="space-y-6 pr-2">
      {Array.from({ length: 24 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-16" />
      ))}
    </div>

    {/* Days columns */}
    {Array.from({ length: 7 }).map((_, dayIndex) => (
      <div key={dayIndex} className="space-y-2">
        <Skeleton className="h-6 w-full mb-4" /> {/* Day header */}
        {Array.from({ length: 4 }).map((_, eventIndex) => (
          <Skeleton 
            key={eventIndex} 
            className="h-20 w-full" 
            style={{ opacity: Math.random() > 0.7 ? 1 : 0 }}
          />
        ))}
      </div>
    ))}
  </div>
);