import css from "./layout.module.css";

import { LayoutProps } from "@/typings";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={css.backgroundImage}>
      <div className={css.backgroundBlur}>{children}</div>
    </div>
  );
}
