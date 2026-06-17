import { FormRoot } from "./form-root";
import { FormField } from "./form-field";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export const Form = Object.assign(FormRoot, {
  Field: FormField,
  Error: FormError,
  Success: FormSuccess,
});
