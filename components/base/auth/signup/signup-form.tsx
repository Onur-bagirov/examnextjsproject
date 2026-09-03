"use client";

import { cn } from "@/lib/utils";
import { Field,FieldDescription,FieldError,FieldGroup,FieldLabel,} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignupFormSchema, signupFormSchema } from "./signup-form.schema";

export function SignupForm(
{
    className,
    ...props
}: React.ComponentProps<"form">) 
{
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const 
    {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormSchema>(
    {
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: "",
            password: "",
            birthDate: "",
        },
    });

    const onSubmit = async (data: SignupFormSchema) => 
    {
        try 
        {
            setServerError(null);
            console.log("Sign up with:", data);
            await new Promise((resolve) => setTimeout(resolve, 600));

            router.push("/auth/signin");
            router.refresh();
        } 
        catch (error) 
        {
            console.error(error);
            setServerError("Qeydiyyat zamanı xəta baş verdi. Yenidən cəhd edin.");
        }
    };

    return (
        <form className={cn("flex flex-col gap-2", className)} {...props} onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-5">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-extrabold text-white">
                        Create <span className="text-yellow-500">Account</span>
                    </h1>
                    <p className="text-sm text-gray-300">
                        Fill in your details below to join Burger Hut.
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        variant="auth"
                        type="email"
                        placeholder="name@gmail.com"
                        {...register("email")}/>

                    {errors.email && <FieldError>{errors.email.message}</FieldError>}
                    <FieldDescription className="text-gray-400">
                        Only Gmail addresses are accepted.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        variant="auth"
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}/>
                    {errors.password && 
                    (
                        <FieldError>{errors.password.message}</FieldError>
                    )}
                    <FieldDescription className="text-gray-400">
                        Must be at least 6 characters long.
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel htmlFor="birthDate">Date of Birth</FieldLabel>
                    <Input
                        id="birthDate"
                        variant="auth"
                        type="date"
                        {...register("birthDate")}/>
                    {errors.birthDate && 
                    (
                        <FieldError>{errors.birthDate.message}</FieldError>
                    )}
                </Field>
                {serverError && <FieldError>{serverError}</FieldError>}
                <Field>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-yellow-400 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-yellow-500 disabled:opacity-60">
                        {isSubmitting ? "Creating account..." : "SIGN UP"}
                    </button>
                </Field>
                <FieldDescription className="text-center text-gray-300">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="font-semibold text-white underline-offset-4 hover:underline">
                        Sign in
                    </Link>
                </FieldDescription>
            </FieldGroup>
        </form>
    );
}