import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden">
      {/* Cover Image Skeleton */}
      <div className="relative">
        <Skeleton className="h-48 w-full" />
        
        {/* Profile Image Skeleton */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <Skeleton className="w-32 h-32 rounded-full border-4 border-white" />
        </div>
      </div>

      {/* Profile Info Skeleton */}
      <div className="text-center mt-20 mb-8">
        <Skeleton className="h-8 w-48 mx-auto mb-2" />
        <Skeleton className="h-4 w-24 mx-auto" />
      </div>

      <div className="px-6 pb-8">
        <div className="text-center mb-8">
          <Skeleton className="h-6 w-24 mx-auto mb-4" />
          <Skeleton className="h-20 w-full max-w-2xl mx-auto" />
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact Info Skeletons */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-40" />
            </div>

            {/* Social Links Skeletons */}
            <div className="flex flex-col space-y-4">
              <div className="flex justify-end space-x-4">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
              <div className="flex flex-col space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}