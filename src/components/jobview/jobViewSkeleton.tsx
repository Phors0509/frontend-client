import { JobDescriptionSkeleton } from "../skeletons/jobDescriptionSkeleton";
import { JobDetailSkeleton } from "../skeletons/jobDetailSkeleton";
import { JobHeaderSkeleton } from "../skeletons/jobHeaderSkeleton";
import { JobOverviewSkeleton } from "../skeletons/jobOverviewSkeleton";


export const JobViewSkeleton = () => (
  <div className="p-6">
    <JobHeaderSkeleton />
    <div className="flex flex-col gap-4 sm:flex-col sm:gap-6 xl:flex-row xl:gap-6">
      <div className="w-full xl:w-1/3 space-y-6 text-[16px]">
        <JobOverviewSkeleton />
      </div>
      <div className="w-full bg-white text-[16px] rounded-lg mb-2 shadow-md xl:w-2/3">
        <JobDescriptionSkeleton />
        <JobDetailSkeleton />
      </div>
    </div>
  </div>
);