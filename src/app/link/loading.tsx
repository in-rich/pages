"use client";

import { LoadingPage } from "@/components/layout";
import { usePromise } from "@/lib/hooks/promise";
import { ValidationPageMode, ValidationPageProps } from "@/typings";

const PAGE_TITLE: Record<string, string> = {
  [ValidationPageMode.VERIFY_EMAIL]: "Email validation",
  [ValidationPageMode.RESET_PASSWORD]: "Password update",
  "": "",
};

export default function Loading({ searchParams }: ValidationPageProps) {
  const { data: p } = usePromise(searchParams);
  return <LoadingPage title={PAGE_TITLE[p?.mode ?? ""]} />;
}
