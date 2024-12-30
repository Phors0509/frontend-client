import * as z from "zod";

export const signUpSchema = z.object({
  sur_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: z.string(),
  contact: z.object({
    phone_number: z.string().min(10, "Contact phone number must be at least 10 digits"),
  }),
  employee_count: z.string().min(1, "Employee count is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const verifyCodeSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().min(6, "Verification code must be 6 characters").max(6),
});
