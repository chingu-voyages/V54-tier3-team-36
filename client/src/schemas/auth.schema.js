import {z} from "zod";

export const loginSchema = z.object({
    email: z
        .string({required_error: "Email is required"})
        .email("Invalid email format"),
    password: z
        .string({required_error: "Password is required"})
        .min(4, "Must be at least 4 characters"),
});
