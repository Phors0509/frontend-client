import { z } from "zod";
export const jobFormSchema = z
  .object({
    title: z.string().min(1, "company name is required"),
    position: z.string().min(1, "job category is required"),
    type: z.array(z.string()).min(1, "select at least one job type"),
    schedule: z.array(z.string()).min(1, "select at least one schedule"),
    workMode: z.array(z.string()).min(1, "select at least one workMode"),
    job_opening: z
      .number()
      .min(1, "must be at least 0")
      .nonnegative("job openings are required"),
    createdAt: z.string().min(1, "post date is required"),
    deadline: z
      .string()
      .min(1, "Deadline is required")
      .refine(
        (dateStr) => {
          const date = new Date(dateStr);
          return !isNaN(date.getTime()) && date > new Date(); // Ensure it's a valid date and in the future
        },
        { message: "Deadline must be a valid future date" }
      ),
    description: z.string().min(1, "description is required"),
    address: z.string().min(1, "description is required"),
    location: z.string().min(1, "description is required"),
    benefit: z.array(z.string()).min(1, "select at least one benefit"),
    required_experience:
      z.array(z.string()).min(1, "select at least one required experience"),
    requirement: z.string().min(1, "requirement is required"),
    min_salary: z
      .number()
      .min(1, "min_salary is required")
      .nonnegative("Minimum salary must be a positive number"),
    max_salary: z
      .number()
      .min(1, "max_salary is required")
      .nonnegative("Maximum salary must be a positive number"),
  })
  .refine((data) => data.max_salary > data.min_salary, {
    message: "Maximum salary must be greater than minimum salary",
    path: ["max_salary"], // Attach the error to max_salary
  });
