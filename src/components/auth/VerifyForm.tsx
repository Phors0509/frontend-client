import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Suspense, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "../ui/icons";
import { OtpSchema } from "@/schema/auth/otpSchema";

function VerifyFormContent() {
  const { verifyCode, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const contactQuery = searchParams.get("contact");
  const contactMethodQuery = searchParams.get("method");

  const form = useForm<z.infer<typeof OtpSchema>>({
    defaultValues: {
      code: "",
    },
  });

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  async function onSubmit() {
    const otpCode = otp.join("");
    try {
      if (!contactMethodQuery || !contactQuery) {
        throw new Error("Invalid contact method or query");
      } else {
        await verifyCode({
          email: contactMethodQuery === "email" ? (contactQuery ?? "") : "",
          phone_number:
            contactMethodQuery === "phone" ? (contactQuery ?? "") : "",
          code: otpCode,
        });
      }
    } catch (error: any) {
      console.error("Verification error:", error.message); // Debugging
      form.setError("root", {
        message: error.message || "Verification failed",
      });
    }
  }

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input box if a digit is entered
    if (value.length === 1 && index < otp.length - 1) {
      const nextSibling = document.getElementById(`otp-input-${index + 1}`);
      if (nextSibling) {
        nextSibling.focus();
      }
    }
  };

  return (
      <Card className="w-[400px] m-auto mt-[50px] shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>
            Enter the verification code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex justify-center gap-2 mb-4">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <Controller
                      key={index}
                      name="code"
                      control={form.control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          id={`otp-input-${index}`}
                          type="text"
                          maxLength={1}
                          value={otp[index]}
                          onChange={(e) =>
                            handleOtpChange(e.target.value, index)
                          }
                          className="w-12 h-12 text-xl font-semibold text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryCam"
                        />
                      )}
                    />
                  ))}
              </div>

              {form.formState.errors.root && (
                <div className="text-sm font-medium text-destructive">
                  {form.formState.errors.root.message}
                </div>
              )}

              <Button variant={"orange"} type="submit" className="w-full transition duration-200 ease-in-out" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Verify Email
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}

export default function VerifyForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyFormContent />
    </Suspense>
  );
}
