import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { XCircle, Plus, MoreVertical, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BenefitsInputProps {
  benefits: string[];
  handleBenefitsChange: (benefits: string[]) => void;
}

const BenefitsInput = ({ benefits, handleBenefitsChange }: BenefitsInputProps) => {
  const [newBenefit, setNewBenefit] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);

  const addBenefit = () => {
    if (newBenefit.trim()) {
      const updatedBenefits = [...benefits, newBenefit.trim()];
      handleBenefitsChange(updatedBenefits);
      setNewBenefit("");
    }
  };

  const removeBenefit = (indexToRemove: number) => {
    const updatedBenefits = benefits.filter((_, index) => index !== indexToRemove);
    handleBenefitsChange(updatedBenefits);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addBenefit();
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="w-full flex flex-wrap gap-2 min-h-[2.5rem] p-2 border rounded-md relative">
        {benefits.map((benefit, index) => (
          <Badge
            key={index}
            className="flex items-center gap-1 bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            {benefit}
            <XCircle
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeBenefit(index)}
            />
          </Badge>
        ))}

        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild >
            <Button variant="outline" size="icon">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn("w-full bg-white border shadow-md p-2")} align="start" sideOffset={10}>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Add a benefit..."
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 w-[25rem]"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  addBenefit();
                  setPopoverOpen(false);
                }}
                disabled={!newBenefit.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default BenefitsInput;
