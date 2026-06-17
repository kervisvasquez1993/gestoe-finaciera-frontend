import { Controller } from "react-hook-form";
import type { InputHTMLAttributes } from "react";

import { useFormContext } from "./form.context";
import { Input } from "../input";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

export const FormField = ({ name, label, ...props }: FormFieldProps) => {
  const { control, errors } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input {...field} {...props} id={name} label={label} error={error} />
      )}
    />
  );
};
