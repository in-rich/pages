import css from "./error-page.module.css";

import Error from "@/assets/icons/error.svg";

import { FC, ReactNode } from "react";

import { PageWrapper } from "./common";

export const ErrorPage: FC<{ title: ReactNode }> = ({ title }) => (
  <PageWrapper>
    <h1>{title}</h1>
    <Error className={css.error} />
  </PageWrapper>
);
