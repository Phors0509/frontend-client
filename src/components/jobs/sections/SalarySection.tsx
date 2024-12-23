import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Jobs } from '@/utils/types/form-type';

interface SalarySectionProps {
  formData: Jobs;
  errors: Record<string, string | null>;
  handleChangeNum: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SalarySection: React.FC<SalarySectionProps> = ({
  formData,
  errors,
  handleChangeNum,
}) => {
  console.log("SalarySection -> formData");
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="min_salary">Minimum Salary</Label>
        <Input
          type="number"
          id="min_salary"
          name="min_salary"
          value={formData.min_salary || ""}
          onChange={handleChangeNum}
          placeholder="$"
          className={"w-full p-1 rounded-md border font-medium min-h-10 h-auto placeholder-gray-400 placeholder:pl-2 focus:placeholder-white pl-3"}

        />
        {errors.min_salary && (
          <p className="text-sm text-red-500">{errors.min_salary}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="max_salary">Maximum Salary</Label>
        <Input
          type="number"
          id="max_salary"
          name="max_salary"
          value={formData.max_salary || ""}
          onChange={handleChangeNum}
          placeholder="$"
          className={"w-full p-1 rounded-md border font-medium min-h-10 h-auto placeholder-gray-400 placeholder:pl-2 focus:placeholder-white pl-3"}

        />
        {errors.max_salary && (
          <p className="text-sm text-red-500">{errors.max_salary}</p>
        )}
      </div>
    </div>
  );
};

export default SalarySection;