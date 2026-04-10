import { z } from "zod";

// 🔐 LOGIN VALIDATION
export const loginSchema = z.object({
    email: z.string().email("Invalid email ❌"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// 🧑‍🎓 STUDENT VALIDATION
export const studentSchema = z.object({
    admissionNo: z.string().optional(),
    sec: z.string().optional(),
    name: z.string().min(1, "Name required"),
    class: z.string().min(1, "Class required"),
    roll: z.string().min(1, "Roll required"),
    father: z.string().optional(),
    mother: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    blood: z.string().optional(),
    school: z.string().optional(),
    tag: z.string().optional(),
});