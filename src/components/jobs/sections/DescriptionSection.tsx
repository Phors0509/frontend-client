import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Jobs } from "@/utils/types/form-type";
import { InputList } from "@/components/ui/InputList";

interface DescriptionSectionProps {
  formData: Jobs;
  errors: Record<string, string | null>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBenefitsChange: (newBenefits: string[]) => void;
  handleRequiredExperienceChange: (newExperiences: string[]) => void;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  formData,
  errors,
  handleChange,
  handleBenefitsChange,
  handleRequiredExperienceChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <div className="space-y-2 w-2/4">
          <Label htmlFor="required_experience">Required Experience</Label>
          <InputList
          list={formData.required_experience || []}
          onListChange={handleRequiredExperienceChange}
          placeholder="Add required experience"
        />
          {errors.required_experience && (
            <p className="text-sm text-red-500">{errors.required_experience}</p>
          )}
        </div>

        <div className="space-y-2 w-2/4">
        <Label htmlFor="benefit">Benefits</Label>
        <InputList
          list={formData.benefit || []}
          onListChange={handleBenefitsChange}
          placeholder="Add required experience"
        />
          {errors.benefit && (
            <p className="text-sm text-red-500">{errors.benefit}</p>
          )}
        </div>

      </div>

      <div className="space-y-2">
        <Label htmlFor="requirement">Requirements</Label>
        <Textarea
          id="requirement"
          name="requirement"
          value={formData.requirement || ""}
          onChange={handleChange}
          placeholder="Enter job requirements"
          className="min-h-[100px] font-medium border focus:border-orange-400 focus:border-none"
        />
        {errors.requirement && (
          <p className="text-sm text-red-500">{errors.requirement}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Enter job description"
          className="min-h-[100px] border focus:border-orange-400 font-medium "
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>
    </div>
  );
};

export default DescriptionSection;
