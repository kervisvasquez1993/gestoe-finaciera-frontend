import { createContext, useContext } from "react";
import type { Control, FieldErrors, FieldValues } from "react-hook-form";

interface FormContextValue {
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error("Form.* debe usarse dentro de <Form>");
  }
  return ctx;
};
