import { DomainError } from "../../shared/errors";

export class InvalidEmailError extends DomainError {
  readonly code = "INVALID_EMAIL";
}

export class InvalidPasswordError extends DomainError {
  readonly code = "INVALID_PASSWORD";
}

export class InvalidNameError extends DomainError {
  readonly code = "INVALID_NAME";
}

export class InvalidCredentialsError extends DomainError {
  readonly code = "INVALID_CREDENTIALS";

  constructor(message = "Credenciales inválidas") {
    super(message);
  }
}

export class EmailAlreadyExistsError extends DomainError {
  readonly code = "EMAIL_ALREADY_EXISTS";

  constructor(message = "El email ya está registrado") {
    super(message);
  }
}

export class ValidationError extends DomainError {
  readonly code = "VALIDATION_ERROR";
  readonly messages: string[];

  constructor(messages: string[]) {
    super(messages[0] ?? "Error de validación");
    this.messages = messages;
  }
}

export class UnexpectedError extends DomainError {
  readonly code = "UNEXPECTED_ERROR";

  constructor(message = "Ocurrió un error inesperado") {
    super(message);
  }
}
