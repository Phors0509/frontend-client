import { Skeleton } from "@/components/ui/skeleton";

export const JobDescriptionSkeleton = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <Skeleton className="h-7 w-40" />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-16 w-full" />
    </div>
  </div>
);
