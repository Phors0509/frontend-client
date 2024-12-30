import { Skeleton } from "@/components/ui/skeleton";

export const CalendarSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 dark:bg-gray-700 bg-gray-300" /> {/* Today button */}
          <Skeleton className="h-9 w-20 dark:bg-gray-700 bg-gray-300" /> {/* Back button */}
          <Skeleton className="h-9 w-20 dark:bg-gray-700 bg-gray-300" /> {/* Next button */}
        </div>
        <Skeleton className="h-9 w-40 dark:bg-gray-700 bg-gray-300" /> {/* Month/Year */}
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 dark:bg-gray-700 bg-gray-300" /> {/* Month view */}
          <Skeleton className="h-9 w-24 dark:bg-gray-700 bg-gray-300" /> {/* Week view */}
          <Skeleton className="h-9 w-24 dark:bg-gray-700 bg-gray-300" /> {/* Day view */}
        </div>
      </div>

      {/* Calendar Grid Skeleton */}
      <div className="grid grid-cols-7 gap-1">
        {/* Week days header */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2 text-center">
            <Skeleton className="h-6 w-full dark:bg-gray-700 bg-gray-300" />
          </div>
        ))}

        {/* Calendar days - 6 weeks */}
        {Array.from({ length: 42 }).map((_, index) => (
          <div
            key={index}
            className="w-1/7 h-[110px] relative border dark:border-gray-600 border-gray-200"
          >
            <Skeleton className="h-6 w-6 absolute right-2 top-2 dark:bg-gray-700 bg-gray-300" />{" "}
            {/* Day number */}
          </div>
        ))}
      </div>
    </div>
  );
};
