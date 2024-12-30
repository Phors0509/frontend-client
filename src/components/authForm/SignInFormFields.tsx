"use client";
import React from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { PasswordInput } from "./PasswordInput";
import { FormField } from "./FormField";
import { SignInData } from "@/utils/types/auth";
import { CardFooter } from "../ui/card";
import { useRouter } from "next/navigation";

interface FormFieldsProps {
  form: any;
  onSubmit: (data: SignInData) => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export function SignInFormFields({ form, onSubmit, isLoading, error }: FormFieldsProps) {
  const router = useRouter();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField isLoading={isLoading} form={form} name="email" label="Email" placeholder="name@example.com" type="email" />
        <PasswordInput form={form} isCf={false} />
        {error && ( <div className="text-red-500 text-sm mt-2">{error}</div> )}
        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isLoading} >
          {isLoading && ( <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> )}
          Sign In
        </Button>
      </form>
      <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-muted-foreground text-center">
                {"Don't have an account? "}
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => router.push("/signup")}
                >
                  Create account
                </Button>
              </div>
            </CardFooter>
    </Form>
  );
}