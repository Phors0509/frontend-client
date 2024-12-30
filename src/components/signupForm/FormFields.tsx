import React from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { PasswordInput } from "./PasswordInput";
import { FormField } from "./FormField";
import { SignUpData } from "@/utils/types/auth";

interface FormFieldsProps {
  form: any;
  onSubmit: (data: SignUpData) => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export function FormFields({ form, onSubmit, isLoading, error }: FormFieldsProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center justify-between gap-4">
            <div className="w-full">
                <FormField isLoading={isLoading} form={form} name="sur_name" label="First Name" placeholder="Enter your first name"/>
            </div>
            <div className="w-full">
                <FormField isLoading={isLoading} form={form} name="last_name" label="Last Name" placeholder="Enter your last name" />
            </div>
        </div>
        <FormField isLoading={isLoading} form={form} name="email" label="Email" placeholder="name@example.com" type="email" />
        <FormField isLoading={isLoading} form={form} name="contact.phone_number" label="Contact Number" placeholder="Enter alternative contact number" />
        <FormField isLoading={isLoading} form={form} name="employee_count" label="Number of Employees" type="number" min={1} />
        <PasswordInput form={form} />
        {error && ( <div className="text-red-500 text-sm mt-2">{error}</div> )}
        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isLoading} >
          {isLoading && ( <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> )}
          Create Account
        </Button>
      </form>
    </Form>
  );
}