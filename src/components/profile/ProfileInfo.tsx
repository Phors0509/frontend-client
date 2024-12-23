import React from 'react';
import { Mail, Building2 } from 'lucide-react';
import { LocationInfo } from './LocationInfo';
import { ProfileData } from '@/utils/types/profile';

interface ProfileInfoProps {
  data?: ProfileData | null;
}

export function ProfileInfo({ data }: ProfileInfoProps) {
  return (
    <div className="mt-5">
      <div className="text-center mb-8">
      <div className="mt-4 text-gray-600 max-w-2xl mx-auto prose list-item" dangerouslySetInnerHTML={{ __html: data?.description || 'No description available' }} />
      </div>
      <div className="py-7 bg-slate-100 dark:bg-black  w-full px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center text-gray-600 dark:text-white">
              <Mail className="w-4 h-4 mr-2" />
              <span>{data?.email}</span>
            </div>
            {data?.role === "company" && (
              <div className="flex items-center text-gray-600 dark:text-white">
                <Building2 className="w-4 h-4 mr-2" />
                <span>{data?.employee_count} Employees</span>
              </div>
            )}
            <LocationInfo location={data?.location} />
          </div>
        </div>
      </div>
    </div>
  );
}
