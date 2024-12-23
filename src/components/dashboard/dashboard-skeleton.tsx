import { Skeleton } from "@/components/ui/skeleton";

function DashboardSkeleton() {
  return (
    <div className="flex w-full float-right gap-6 mt-[31px]">
      {/* Left Section */}
      <div className="w-2/3">
        <div className="flex flex-col w-full float-right h-auto gap-[32px]">
          {/* Card Skeletons */}
          <div className="flex w-full h-[130px] gap-[20px]">
            <Skeleton className="w-1/3 flex flex-col h-[130px] p-[10px]" />
            <Skeleton className="w-1/3 flex flex-col h-[130px] p-[10px]" />
            <Skeleton className="w-1/3 flex flex-col h-[130px] p-[10px]" />
          </div>

          {/* Chart and JobList Skeleton */}
          <div className="w-full flex flex-col gap-[32px]">
            <Skeleton className="w-full h-[300px]" /> {/* Chart Placeholder */}
            <Skeleton className="w-full h-[200px]" /> {/* Job List Placeholder */}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col w-1/3 gap-[32px]">
        {/* Event Card Skeleton */}
        <Skeleton className="w-full h-[130px] rounded-lg" />
        
        {/* Pie Chart Skeleton */}
        <Skeleton className="w-full h-[600px]" />
      </div>
    </div>
  );
}

export default DashboardSkeleton;