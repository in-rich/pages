"use client";

import { Suspense } from "react";

import { useSearchParams } from "next/navigation";

import { LoadingPage } from "@/components/layout";
import { ValidationPageMode } from "@/typings";

const PAGE_TITLE: Record<string, string> = {
  [ValidationPageMode.VERIFY_EMAIL]: "Email validation",
  [ValidationPageMode.RESET_PASSWORD]: "Password update",
  "": "",
};

const RenderLoading = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  return <LoadingPage title={PAGE_TITLE[mode ?? ""]} />;
};

export default function Loading() {
  return (
    <Suspense>
      <RenderLoading />
    </Suspense>
  );
}
