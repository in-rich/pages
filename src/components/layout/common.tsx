import css from "./common.module.css";

import { FC, ReactNode } from "react";

export const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <main className={css.wrapper}>{children}</main>;
};
