import { z } from "zod";

export const signupFormSchema = z.object(
{
    email: z.string().email({ message: "Invalid email address" })
        .refine((value) => value.toLowerCase().endsWith("@gmail.com"), {
            message: "Only Gmail addresses are accepted (e.g. name@gmail.com)",
        }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    birthDate: z.string().min(1, { message: "Date of birth is required" })
    .refine((value) => !Number.isNaN(new Date(value).getTime()), 
        {
            message: "Invalid date",
        })
        .refine((value) => new Date(value) <= new Date(), 
        {
            message: "Date of birth cannot be in the future",
        })
        .refine(
            (value) => 
            {
                const birth = new Date(value);
                const age =
                    (Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
                return age >= 13;
            },
            { message: "You must be at least 13 years old" }
        ),
});

export type SignupFormSchema = z.infer<typeof signupFormSchema>;