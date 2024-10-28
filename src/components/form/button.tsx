import css from "./button.module.css";

import { ComponentProps, FC } from "react";

import Link from "next/link";

export const FormButton: FC<ComponentProps<"button">> = ({ className, ...props }) => (
  <button className={`${css.button} ${className || ""}`} {...props} />
);

export const FormButtonLink: FC<ComponentProps<typeof Link>> = ({ className, ...props }) => (
  <Link className={`${css.button} ${className || ""}`} {...props} />
);
