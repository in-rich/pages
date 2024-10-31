"use client";

import css from "./password-update-page.module.css";

import { FC, useCallback, useState } from "react";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { confirmPasswordReset } from "firebase/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormButton, FormInput } from "@/components/form";
import { ErrorPage, PageWrapper, SuccessPage } from "@/components/layout";
import { FirebaseAuth } from "@/lib";
import { ZodSchemaType } from "@/typings";

interface passwordUpdatePageProps {
  email: string;
  oobCode: string;
}

const UpdatePasswordSchema = z
  .object({
    password: z.string().min(6, "Password is required.").max(256, "Password cannot be more than 256 characters long"),
    passwordConfirmation: z
      .string()
      .min(6, "Password confirmation is required.")
      .max(256, "Password cannot be more than 256 characters long"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"],
  });

export const PasswordUpdatePage: FC<passwordUpdatePageProps> = ({ oobCode }) => {
  const form = useForm<ZodSchemaType<typeof UpdatePasswordSchema>>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { password: "", passwordConfirmation: "" },
    resolver: zodResolver(UpdatePasswordSchema),
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = useCallback(
    async (data: ZodSchemaType<typeof UpdatePasswordSchema>) => {
      try {
        setIsProcessing(true);
        await confirmPasswordReset(FirebaseAuth, oobCode, data.password);
        setSuccess(true);
      } catch (error) {
        if ((error as FirebaseError)?.code == "auth/weak-password") {
          setErrorMessage("Password is too weak");
        } else {
          setError(true);
        }
      }

      setIsProcessing(false);
    },
    [oobCode],
  );

  if (error) return <ErrorPage title={"An error has occurred"} />;

  if (success) return <SuccessPage title={"Password update"} subTitle={"Your password has been updated"} />;

  return (
    <PageWrapper>
      <h1>Password update</h1>

      <form className={css.form} onSubmit={form.handleSubmit(onSubmit)}>
        <span className={css.subtitle}>Please enter your new password</span>

        <FormInput
          label="Password"
          form={form.register("password")}
          error={form.formState.errors.password}
          disabled={isProcessing}
          required
        />
        <FormInput
          label="Password confirmation"
          form={form.register("passwordConfirmation")}
          error={form.formState.errors.passwordConfirmation}
          disabled={isProcessing}
          required
        />

        {errorMessage != "" && <p className={css.redText}>{errorMessage}</p>}

        <FormButton type="submit" disabled={isProcessing}>
          Submit
        </FormButton>
      </form>
    </PageWrapper>
  );
};
