import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Jobs } from '@/utils/types/form-type';

interface BasicInfoProps {
  formData: Jobs;
  errors: Record<string, string | null>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, errors, handleChange }) => {
  console.log("BasicInfo -> formData");
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title Job</Label>
        <Input
          id="title"
          placeholder="Enter job title"
          value={formData.title}
          name="title"
          onChange={handleChange}
          className={"w-full p-1 rounded-md border font-medium min-h-10 h-auto placeholder-gray-400 placeholder:pl-2 focus:placeholder-white pl-3"}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="position">Job Position</Label>
        <Input
          id="position"
          placeholder="Enter job position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className={"w-full p-1 rounded-md border font-medium min-h-10 h-auto placeholder-gray-400 placeholder:pl-2 focus:placeholder-white pl-3"}
        />
        {errors.position && (
          <p className="text-sm text-red-500">{errors.position}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;