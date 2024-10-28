import { LoadingPage } from "@/components/layout";
import { ValidationPageMode, ValidationPageProps } from "@/typings";

const PAGE_TITLE: Record<string, string> = {
  [ValidationPageMode.VERIFY_EMAIL]: "Email validation",
  [ValidationPageMode.RESET_PASSWORD]: "Password update",
  "": "",
};

export default function Loading({ searchParams }: ValidationPageProps) {
  return <LoadingPage title={PAGE_TITLE[searchParams?.mode ?? ""]} />;
}
