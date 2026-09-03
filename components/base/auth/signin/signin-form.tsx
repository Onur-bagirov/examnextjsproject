"use client";

import { cn } from "@/lib/utils";
import { Field,FieldDescription,FieldError,FieldGroup,FieldLabel,} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SigninFormSchema, signinFormSchema } from "./signin-form.schema";

export function SigninForm(
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
    } = useForm<SigninFormSchema>(
    {
        resolver: zodResolver(signinFormSchema),
        defaultValues: 
        {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SigninFormSchema) => 
    {
        try 
        {
            setServerError(null);
            console.log("Sign in with:", data);
            await new Promise((resolve) => setTimeout(resolve, 600));

            router.push("/");
            router.refresh();
        } 
        catch (error) 
        {
            console.error(error);
            setServerError("Email və ya şifrə yanlışdır.");
        }
    };

    return (
        <form className={cn("flex flex-col gap-2", className)} {...props} onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-5">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-extrabold text-white">
                        Welcome <span className="text-yellow-500">Back</span>
                    </h1>
                    <p className="text-sm text-gray-300">
                        Enter your email and password to sign in to your account.
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        variant="auth"
                        type="email"
                        placeholder="m@example.com"
                        {...register("email")}/>
                    {errors.email && <FieldError>{errors.email.message}</FieldError>}
                </Field>
                <Field>
                    <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Link href="/auth/forgot-password" className="text-xs font-semibold text-yellow-600 hover:text-yellow-700">
                            Forgot password?
                        </Link>
                    </div>
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
                </Field>
                {serverError && <FieldError>{serverError}</FieldError>}
                <Field>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-yellow-400 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-yellow-500 disabled:opacity-60">
                        {isSubmitting ? "Signing in..." : "SIGN IN"}
                    </button>
                </Field>
                <FieldDescription className="text-center  text-gray-300">
                    Do not have an account?{" "}
                    <Link href="/auth/signup" className="font-semibold text-white underline-offset-4 hover:underline">
                        Sign up
                    </Link>
                </FieldDescription>
            </FieldGroup>
        </form>
    );
}