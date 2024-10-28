import { FC, ReactNode } from "react";

import { FormButtonLink } from "@/components/form/button";

import { PageWrapper } from "./common";

export const SuccessPage: FC<{ title: ReactNode; subTitle?: ReactNode }> = ({ title, subTitle }) => (
  <PageWrapper>
    <h1>{title}</h1>
    {subTitle && <p>{subTitle}</p>}
    <FormButtonLink href="https://www.linkedin.com/in/ashley-morris-774753272/">Come back to LinkedIn</FormButtonLink>
  </PageWrapper>
);
