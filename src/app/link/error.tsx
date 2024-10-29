"use client";

import { Suspense } from "react";

import { useSearchParams } from "next/navigation";

import { ErrorPage } from "@/components/layout";
import { ValidationPageMode } from "@/typings";

const PAGE_TITLE: Record<string, string> = {
  [ValidationPageMode.VERIFY_EMAIL]: "Email verification failed",
  [ValidationPageMode.RESET_PASSWORD]: "Password update failed",
  "": "",
};

const RenderError = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  return <ErrorPage title={PAGE_TITLE[mode ?? ""]} />;
};

export default function Error() {
  return (
    <Suspense>
      <RenderError />
    </Suspense>
  );
}
