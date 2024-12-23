import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Jobs } from "@/utils/types/form-type";
import { MultiSelect } from "@/components/multi-select";
import {
  scheduleOption,
  typeJobOptions,
  workTypeOptions,
} from "@/utils/types/JobDetails-type";

interface JobDetailsProps {
  formData: Jobs;
  errors: Record<string, string | null>;
  handleArrayChange: (selected: string[], fieldName: string) => void;
  handleChangeNum: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({
  formData,
  errors,
  handleArrayChange,
  handleChangeNum,
}) => {
  console.log("JobDetails -> formData");
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="type">Job Type</Label>
          <MultiSelect
            options={typeJobOptions}
            onValueChange={(selected) => handleArrayChange(selected, "type")}
            defaultValue={formData.type || []}
            placeholder="Select job type"
            variant="inverted"
            className="bg-gray-100 dark:bg-gray-800"
          />
          {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="schedule">Schedule</Label>
          <MultiSelect
            options={scheduleOption}
            onValueChange={(selected) =>
              handleArrayChange(selected, "schedule")
            }
            defaultValue={formData.schedule || []}
            placeholder="Select schedule"
            variant="inverted"
            className="bg-gray-100 dark:bg-gray-800"
          />
          {errors.schedule && (
            <p className="text-sm text-red-500">{errors.schedule}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="workMode">Work Mode</Label>
          <MultiSelect
            options={workTypeOptions}
            onValueChange={(selected) =>
              handleArrayChange(selected, "workMode")
            }
            defaultValue={formData.workMode || []}
            placeholder="Select work mode"
            variant="inverted"
            className="bg-gray-100 dark:bg-gray-800"
          />
          {errors.workMode && (
            <p className="text-sm text-red-500">{errors.workMode}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="job_opening">Job Openings</Label>
          <Input
            type="number"
            id="job_opening"
            name="job_opening"
            value={formData.job_opening || ""}
            onChange={handleChangeNum}
            placeholder="Number of positions"
            className={
              "w-full p-1 pl-3 rounded-md border font-medium min-h-10 h-auto placeholder-gray-400 placeholder:pl-2 focus:placeholder-white"
            }
          />
          {errors.job_opening && (
            <p className="text-sm text-red-500">{errors.job_opening}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
