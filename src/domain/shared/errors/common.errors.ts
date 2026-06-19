import { DomainError } from "./domain.error";

export class ValidationError extends DomainError {
  readonly code = "VALIDATION_ERROR";
  readonly messages: string[];

  constructor(messages: string[]) {
    super(messages[0] ?? "Erro de validação");
    this.messages = messages;
  }
}

export class UnexpectedError extends DomainError {
  readonly code = "UNEXPECTED_ERROR";

  constructor(message = "Ocorreu um erro inesperado") {
    super(message);
  }
}
