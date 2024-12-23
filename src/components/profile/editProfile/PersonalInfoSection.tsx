import React from "react";
import type { ProfileData } from "../../../utils/types/profile";
import { Input } from "@/components/ui/input";

interface PersonalInfoSectionProps {
  formData?: ProfileData | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PersonalInfoSection({
  formData,
  onChange,
}: PersonalInfoSectionProps) {
  return (
    <>
    <div className="grid grid-cols-1">
      <div>
        <label className="block text-sm font-medium dark:text-gray-400 text-gray-700">Company Name </label>
        <Input
          type="text"
          name="name"
          value={formData?.name}
          onChange={onChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
        />
      </div>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
    <div>
        <label className="block text-sm font-medium dark:text-gray-400 text-gray-700">Email Address </label>
        <Input
          type="email"
          name="email"
          value={formData?.email}
          onChange={onChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
        />
      </div>
      <div>
          <label className="block text-sm font-medium dark:text-gray-400 text-gray-700">Employee Count  </label>
          <Input
            type="number"
            name="employee_count"
            value={formData?.employee_count}
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
    </div>
    </>
  );
}
