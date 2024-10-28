import css from "./form-input.module.css";

import { ReactNode } from "react";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface FormInputProps<TFieldName extends string = string> {
  label?: ReactNode;
  form: UseFormRegisterReturn<TFieldName>;
  disabled?: boolean;
  error?: FieldError | undefined;
  placeholder?: string;
  required?: boolean;
}

export const FormInput = <TFieldName extends string = string>({
  label,
  form,
  disabled,
  error,
  placeholder,
  required,
}: FormInputProps<TFieldName>) => (
  <label className={css.label} data-required={required}>
    {label && <span className={css.labelText}>{label}</span>}
    <input {...form} disabled={disabled} placeholder={placeholder} />
    {error && <span className={css.error}>{error.message}</span>}
  </label>
);
