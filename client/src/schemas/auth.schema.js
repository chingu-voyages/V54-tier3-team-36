import {z} from "zod";

export const loginSchema = z.object({
    email: z
        .string({required_error: "Email is required"})
        .email("Invalid email format"),
    password: z
        .string({required_error: "Password is required"})
        .min(4, "Must be at least 4 characters"),
});

export const signupSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(4, "Must be at least 4 characters"),
        age: z.enum(["<5", "5-8", "9-12", "13-17", "18+"], {
            errorMap: () => ({ message: "Please select your age" }),
        }),
        consent: z.boolean().optional(), // we'll refine below
    })
    .refine(
        (data) => data.age === "18+" || data.consent === true,
        {
            path: ["consent"],
            message: "Parent/Guardian consent is required for minors",
        }
    );




