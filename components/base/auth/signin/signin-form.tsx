"use client";

import { cn } from "@/lib/utils";
import { Field,FieldDescription,FieldError,FieldGroup,FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { SigninFormSchema, signinFormSchema } from "./signin-form.schema";
import { useTranslations } from "next-intl";

export function SigninForm(
{
  className,
  ...props
}: 
React.ComponentProps<"form">) 
{
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  const [serverError, setServerError] = useState<string | null>(null);
  const t = useTranslations("auth.signin");

  const 
  {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = 
  useForm<SigninFormSchema>(
  {
    resolver: zodResolver(signinFormSchema),
    defaultValues: 
    {
      email: "",
      password: "",
    },
  });

  const handleSigninWithGoogle = async () => {
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
      setServerError(t("errorGoogleLogin"));
    }
  };

  const onSubmit = async (data: SigninFormSchema) => {
    try 
    {
      setServerError(null);
      const result = await signIn("credentials", 
      {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) 
      {
        throw new Error(result.error);
      }

      router.push(`/${currentLocale}`);
      router.refresh();
    } 
    catch (error) 
    {
      console.error(error);
      setServerError(t("errorInvalidCredentials"));
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
          <p className="text-xs text-gray-400 mt-2">
            {t("demo")}
          </p>
        </div>
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
        </Field>
        {serverError && <FieldError>{serverError}</FieldError>}
        <Field>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-yellow-400 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-yellow-500 disabled:opacity-60">
            {isSubmitting ? t("signingIn") : t("signinButton")}
          </button>
        </Field>
        <span className="text-sm text-gray-300 text-center">
          {t("orContinueWith")}
        </span>
        <Field>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSigninWithGoogle}
            className="w-full rounded-lg bg-white py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-100 disabled:opacity-60">
            {t("googleSignin")}
          </button>
          <FieldDescription className="text-center text-gray-300">
            {t("noAccount")}{" "}
            <Link href={`/${currentLocale}/auth/signup`} className="font-semibold text-white underline-offset-4 hover:underline">
              {t("signup")}
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}