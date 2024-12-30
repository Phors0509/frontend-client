import React from "react";
import {
  FormControl,
  FormField as UIFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  min?: number;
  rightElement?: React.ReactNode;
  isLoading?: boolean;
}

export function FormField({
  form,
  name,
  label,
  placeholder,
  type = "text",
  min,
  rightElement,
  isLoading
}: FormFieldProps) {
  return (
    <UIFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={type}
                min={min}
                placeholder={placeholder}
                className="w-full p-1 rounded-md border font-medium min-h-10 h-auto placeholder-gray-400 placeholder:pl-2 pl-3"
                disabled={isLoading}
              />
              {rightElement && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {rightElement}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}