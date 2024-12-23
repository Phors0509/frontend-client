import * as React from "react";

import { cn } from "@/lib/utils";


export interface DateInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, type = "date",value, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          value={value}
          className={cn(
            "flex w-full rounded-md border border-gray-200 bg-transparent px-3 h-[38px] py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

DateInput.displayName = "DateInput";

export { DateInput };
