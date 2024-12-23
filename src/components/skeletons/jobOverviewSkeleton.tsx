import { Skeleton } from "@/components/ui/skeleton";

const JobOverviewRowSkeleton = () => (
  <div className="flex items-center justify-between py-3 border-b border-gray-200">
    <Skeleton className="h-5 w-24" />
    <Skeleton className="h-5 w-32" />
  </div>
);

export const JobOverviewSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <Skeleton className="h-6 w-32 mb-4" />
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <JobOverviewRowSkeleton key={i} />
    ))}
    <div className="mt-6 space-x-4">
      <Skeleton className="h-10 w-28 inline-block" />
      <Skeleton className="h-10 w-28 inline-block" />
    </div>
  </div>
);