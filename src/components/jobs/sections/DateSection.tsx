import React from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Jobs } from '@/utils/types/form-type';

interface DateSectionProps {
  formData: Jobs;
  errors: Record<string, string | null>;
  createdAtDate: Date | undefined;
  deadlineDate: Date | undefined;
  handleDateChange: (field: string, date: Date | undefined) => void;
}

const DateSection: React.FC<DateSectionProps> = ({
  formData,
  errors,
  handleDateChange,
  createdAtDate,
  deadlineDate,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="createdAt">Post Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="none"
              className={cn(
                "w-full justify-start text-left font-normal ",
                !createdAtDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {createdAtDate ? (
                (format(new Date(formData.createdAt || ""), "PPP"))
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={createdAtDate}
              onSelect={(date) => handleDateChange('createdAt', date)}
            />
          </PopoverContent>
        </Popover>
        {errors.createdAt && (
          <p className="text-sm text-red-500">{errors.createdAt}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="none"
              className={cn(
                "w-full justify-start text-left font-normal",
                !deadlineDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {deadlineDate ? (
                format(deadlineDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={deadlineDate}
              onSelect={(date) => handleDateChange('deadline', date)}
            />
          </PopoverContent>
        </Popover>
        {errors.deadline && (
          <p className="text-sm text-red-500">{errors.deadline}</p>
        )}
      </div>
    </div>
  );
};

export default DateSection;