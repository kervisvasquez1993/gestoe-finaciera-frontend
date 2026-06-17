import type { FormHTMLAttributes, ReactNode } from "react";
import type { Control, FieldErrors, FieldValues } from "react-hook-form";

import { FormContext } from "./form.context";

interface FormRootProps<
  T extends FieldValues,
> extends FormHTMLAttributes<HTMLFormElement> {
  control: Control<T>;
  errors: FieldErrors<T>;
  children: ReactNode;
}

export const FormRoot = <T extends FieldValues>({
  control,
  errors,
  children,
  className = "flex flex-col gap-4",
  ...props
}: FormRootProps<T>) => {
  return (
    <FormContext.Provider
      value={{
        control: control as unknown as Control<FieldValues>,
        errors: errors as FieldErrors<FieldValues>,
      }}
    >
      <form className={className} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
};
