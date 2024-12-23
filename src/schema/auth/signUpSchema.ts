import { z } from "zod";

export const FormSchema = z.object({
    username: z
        .string()
        .max(50)
        .email({ message: "This is not a valid email" }),
    password: z.string().min(8).max(50),
    rememberMe: z.boolean().optional()
    
})