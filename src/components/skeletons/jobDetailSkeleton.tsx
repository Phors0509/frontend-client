import { Skeleton } from "@/components/ui/skeleton";

const JobDetailRowSkeleton = () => (
  <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-200">
    <Skeleton className="h-5 w-32" />
    <Skeleton className="h-5 w-48" />
  </div>
);

export const JobDetailSkeleton = () => (
  <div className="p-6">
    <Skeleton className="h-7 w-36 mb-6" />
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <JobDetailRowSkeleton key={i} />
      ))}
    </div>
    <div className="mt-6 flex justify-between items-center">
      <Skeleton className="h-5 w-32" />
    </div>
  </div>
);
