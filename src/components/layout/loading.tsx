import css from "./loading-page.module.css";

import Spinner from "@/assets/icons/spinner.svg";

import { FC, ReactNode } from "react";

import { PageWrapper } from "./common";

export const LoadingPage: FC<{ title: ReactNode }> = ({ title }) => (
  <PageWrapper>
    <h1>{title}</h1>
    <p>Please wait...</p>
    <Spinner className={css.spinner} />
  </PageWrapper>
);
