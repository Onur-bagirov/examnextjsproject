"use client";

import { cn } from "@/lib/utils";
import { Field,FieldDescription,FieldError,FieldGroup,FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignupFormSchema, signupFormSchema } from "./signup-form.schema";
import { api } from "@/shared/api-instace";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export function SignupForm(
{
  className,
  ...props
}: 
React.ComponentProps<"form">) 
{
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  const t = useTranslations("auth.signup");
  const [serverError, setServerError] = useState<string | null>(null);

  const 
  {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = 
  useForm<SignupFormSchema>(
  {
    resolver: zodResolver(signupFormSchema),

    defaultValues: 
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignupWithGoogle = async () => 
  {
    try 
    {
      const result = await signIn("google", 
      {
        redirect: true,
        callbackUrl: `/${currentLocale}`,
      });

      if (result?.error) 
      {
        throw new Error(result.error);
      }
    } 
    catch (error) 
    {
      console.error(error);
      setServerError(t("errorGoogleSignup"));
    }
  };

  const onSubmit = async (data: SignupFormSchema) => {
    try 
    {
      setServerError(null);

      const response = await api.post("/api/users", 
      {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 409) 
      {
        setError("email", { message: response.data.error });
        return;
      }

      if (response.status !== 201) 
      {
        throw new Error(response.data.error || "Failed to create user");
      }

      router.push(`/${currentLocale}/auth/signin`);
      router.refresh();
    } 
    catch (error) 
    {
      console.error(error);
      setServerError(t("errorNetwork"));
    }
  };

  return (
    <form className={cn("flex flex-col gap-2", className)} {...props} onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-white">
            {t("title")} <span className="text-yellow-500">{t("titleHighlight")}</span>
          </h1>
          <p className="text-sm text-gray-300">
            {t("description")}
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">{t("fullName")}</FieldLabel>
          <Input
            id="name"
            variant="auth"
            type="text"
            placeholder={t("fullNamePlaceholder")}
            {...register("name")}/>
            
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
          <Input
            id="email"
            variant="auth"
            type="email"
            placeholder={t("emailPlaceholder")}
            {...register("email")}/>
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
          <Input
            id="password"
            variant="auth"
            type="password"
            placeholder={t("passwordPlaceholder")}
            {...register("password")}/>

          {errors.password && 
          (
            <FieldError>{errors.password.message}</FieldError>
          )}
          <FieldDescription className="text-gray-400">
            {t("passwordRequirements")}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">{t("confirmPassword")}</FieldLabel>
          <Input
            id="confirm-password"
            variant="auth"
            type="password"
            placeholder={t("confirmPasswordPlaceholder")}
            {...register("confirmPassword")}/>

          {errors.confirmPassword && 
          (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </Field>
        {serverError && <FieldError>{serverError}</FieldError>}
        <Field>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-yellow-400 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-yellow-500 disabled:opacity-60">
            {isSubmitting ? t("signingUp") : t("signupButton")}
          </button>
        </Field>
        <span className="text-sm text-gray-300 text-center">
          {t("orContinueWith")}
        </span>
        <Field>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSignupWithGoogle}
            className="w-full flex items-center justify-center gap-3 rounded-lg bg-white hover:bg-gray-100 py-3 text-sm font-bold text-gray-900 transition-all border-2 border-white hover:border-gray-200 disabled:opacity-60 shadow-md hover:shadow-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="14" fill="#EA4335" fontWeight="bold">G</text>
            </svg>
            {t("googleSignup")}
          </button>
          <FieldDescription className="text-center text-gray-300">
            {t("haveAccount")}{" "}
            <Link href={`/${currentLocale}/auth/signin`} className="font-semibold text-white underline-offset-4 hover:underline">
              {t("signin")}
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}