import { ValidationError } from "../../domain/auth/errors";
import { DomainError } from "../../domain/shared/errors";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ValidationError) {
    return error.messages.join(", ");
  }
  if (error instanceof DomainError) {
    return error.message;
  }
  return "Ocurrió un error inesperado";
};
