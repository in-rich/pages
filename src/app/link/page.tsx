import React from "react";

import { applyActionCode, verifyPasswordResetCode } from "firebase/auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SuccessPage } from "@/components/layout";
import { FirebaseAuth } from "@/lib/firebase";
import { ValidationPageMode, ValidationPageProps } from "@/typings";

import { PasswordUpdatePage } from "./password-update-page";

const PAGE_TITLE: Record<string, string> = {
  [ValidationPageMode.VERIFY_EMAIL]: "Verify my email",
  [ValidationPageMode.RESET_PASSWORD]: "Update my password",
  "": "",
};

export const generateMetadata = async ({ searchParams }: ValidationPageProps): Promise<Metadata> => {
  return {
    title: PAGE_TITLE[searchParams.mode ?? ""],
    robots: { index: false, follow: false },
  };
};

const Page = async ({ searchParams }: ValidationPageProps) => {
  const oobCode = searchParams.oobCode ?? "";

  switch (searchParams.mode) {
    case "verifyEmail":
      await applyActionCode(FirebaseAuth, oobCode).catch((err) => {
        throw new Error(`Email validation failed: ${typeof err == "string" ? err : err.message}`);
      });

      return <SuccessPage title={"Email confirmed!"} subTitle={"You can now log in to inrich"} />;
    case "resetPassword":
      const email = await verifyPasswordResetCode(FirebaseAuth, oobCode).catch((err) => {
        throw new Error(`Password update failed : ${typeof err == "string" ? err : err.message}`);
      });

      return <PasswordUpdatePage email={email} oobCode={oobCode} />;
    default:
      notFound();
  }
};

export default Page;
