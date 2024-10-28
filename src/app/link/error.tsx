"use client";

import { ErrorPage } from "@/components/layout";
import { usePromise } from "@/lib/hooks/promise";
import { ValidationPageMode, ValidationPageProps } from "@/typings";

const PAGE_TITLE: Record<string, string> = {
  [ValidationPageMode.VERIFY_EMAIL]: "Email verification failed",
  [ValidationPageMode.RESET_PASSWORD]: "Password update failed",
  "": "",
};

export default function Error({ searchParams }: ValidationPageProps) {
  const { data: mode } = usePromise(searchParams?.then((p) => p.mode));
  return <ErrorPage title={PAGE_TITLE[mode ?? ""]} />;
}
