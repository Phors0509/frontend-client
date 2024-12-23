"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUpSchema } from "@/lib/validations/authValidations";
import { Icons } from "../ui/icons";
import Image from "next/image";
import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

type SignUpFormValues = z.infer<typeof signUpSchema>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUpForm() {
  const { signUp, isLoading } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      sur_name: "",
      last_name: "",
      contact: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpFormValues) {
    let contactMethod = "";
    if (emailRegex.test(data.contact)) {
      contactMethod = "email";
    } else {
      contactMethod = "phone_number";
    }
    try {
      await signUp({
        ...data,
        email: contactMethod === "email" ? data.contact : "",
        phone_number: contactMethod === "phone_number" ? data.contact : "",
      });
    } catch (error: any) {
      form.setError("root", {
        message: error.message || "Something went wrong",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-black bg-gray-100 p-4">
    <div className="flex flex-col-reverse md:flex-row w-full md:w-3/4 lg:w-2/3 h-auto dark:bg-gray-700  bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="md:w-1/2 w-full justify-center flex items-center  md:h-auto">
          <Image
            className="w-full h-auto object-cover"
            src="/img/Job hunt-amico.png"
            alt="job image"
            width={800}
            height={800}
          />
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 w-full p-8 ">
          <Card className="w-full max-w-sm border-none dark:bg-gray-700">
            <CardHeader>
              <CardTitle className="text-3xl font-bold  text-gray-800 dark:text-white ">
                Create an Account
              </CardTitle>
              <CardDescription className="text-center">
                Fill in the details to start your journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-y-4"
                >
                  <FormField
                    control={form.control}
                    name="sur_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="First Name"
                            {...field}
                            disabled={isLoading}
                            className="border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Last Name"
                            {...field}
                            disabled={isLoading}
                            className="border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            {...field}
                            type="email"
                            disabled={isLoading}
                            className="border-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              disabled={isLoading}
                              placeholder="password"
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              disabled={isLoading}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                              {showPassword ? (
                                <EyeOpenIcon />
                              ) : (
                                <EyeClosedIcon />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              disabled={isLoading}
                              placeholder="password"
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              disabled={isLoading}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                              {showPassword ? (
                                <EyeOpenIcon />
                              ) : (
                                <EyeClosedIcon />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-orange-500 text-white hover:bg-orange-600"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create Account
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-600 dark:text-gray-400">Already have an account? </p>
              <Button variant="link" onClick={() => router.push("/signin")}>
                Sign in
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
