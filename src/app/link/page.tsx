import React from "react";

import { applyActionCode, verifyPasswordResetCode } from "firebase/auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SuccessPage } from "@/components/layout";
import { FirebaseAuth, FirebaseConfig } from "@/lib/firebase";
import { ValidationPageMode, ValidationPageProps } from "@/typings";

import { PasswordUpdatePage } from "./password-update-page";

const PAGE_TITLE: Record<string, string> = {
  [ValidationPageMode.VERIFY_EMAIL]: "Verify my email",
  [ValidationPageMode.RESET_PASSWORD]: "Update my password",
  "": "",
};

export const generateMetadata = async ({ searchParams }: ValidationPageProps): Promise<Metadata> => {
  return {
    title: PAGE_TITLE[(await searchParams).mode ?? ""],
    robots: { index: false, follow: false },
  };
};

const Page = async ({ searchParams }: ValidationPageProps) => {
  const oobCode = (await searchParams).oobCode ?? "";
  const mode = (await searchParams).mode ?? "";

  if (!oobCode || !mode) {
    return null;
  }

  switch (mode) {
    case ValidationPageMode.VERIFY_EMAIL: {
      await applyActionCode(FirebaseAuth, oobCode).catch((err) => {
        throw new Error(
          `Email validation failed with code "${oobCode}": ${typeof err == "string" ? err : err.message}` +
            `Firebase Config: ${JSON.stringify(FirebaseConfig)}`,
        );
      });

      return <SuccessPage title={"Email confirmed!"} subTitle={"You can now log in to inrich"} />;
    }
    case ValidationPageMode.RESET_PASSWORD: {
      const email = await verifyPasswordResetCode(FirebaseAuth, oobCode).catch((err) => {
        throw new Error(
          `Password reset failed with code "${oobCode}": ${typeof err == "string" ? err : err.message}` +
            `Firebase Config: ${JSON.stringify(FirebaseConfig)}`,
        );
      });

      return <PasswordUpdatePage email={email} oobCode={oobCode} />;
    }
    default: {
      notFound();
    }
  }
};

export default Page;
