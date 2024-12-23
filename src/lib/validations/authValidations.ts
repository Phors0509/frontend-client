import * as z from "zod";

export const signUpSchema = z.object({
  sur_name: z
    .string()
    .nonempty({ message: "Surname is required" })
    .min(2, "First name must be at least 2 characters"),
  last_name: z
    .string()
    .nonempty({ message: "Lastname is required" })
    .min(2, "Last name must be at least 2 characters"),
  contact: z
    .string()
    .nonempty({ message: "Contact is required" })
    .refine(
      (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+855\d{8,9}$/;
        return emailRegex.test(val) || phoneRegex.test(val);
      },
      { message: "Must be a valid email or phone number starting with +855" }
    ),
  password: z
    .string()
    .nonempty({ message: "Password is required" }) // Ensure password is not empty
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z
    .string()
    .nonempty({ message: "Confirm password is required" }) // Ensure password is not empty
    .min(8, { message: "Confirm password must be at least 8 characters" })
    .max(50),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This will display the error under the confirmPassword field
  });

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const verifyCodeSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().min(6, "Verification code must be 6 characters").max(6),
});
