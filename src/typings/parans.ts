export enum ValidationPageMode {
  VERIFY_EMAIL = "verifyEmail",
  RESET_PASSWORD = "resetPassword",
}

export interface ValidationPageProps {
  searchParams: Promise<{
    oobCode?: string;
    mode?: string;
  }>;
}
