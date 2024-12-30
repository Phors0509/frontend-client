"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { signInSchema } from "@/lib/validations/authValidations";
import { useState } from "react";
import { FormWrapper } from "../authForm/FormWrapper";
import { SignInFormFields } from "../authForm/SignInFormFields";

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInFormValues) {
    try {
      setIsLoading(true);
      await signIn(data);
      setIsLoading(false);
    } catch (error: any) {
      form.setError("root", {
        message: error.response.data.message || "Invalid credentials",
      });
    }
  }

  return (
    <FormWrapper title="Sign In" description="Enter your email and password to sign in to your account">
      <SignInFormFields form={form} onSubmit={onSubmit} isLoading={isLoading} />
    </FormWrapper>
  );
}
