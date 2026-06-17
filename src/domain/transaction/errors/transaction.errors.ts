import { DomainError } from "../../shared/errors";

export class InvalidTransactionTypeError extends DomainError {
  readonly code = "INVALID_TRANSACTION_TYPE";
}

export class InvalidAmountError extends DomainError {
  readonly code = "INVALID_AMOUNT";
}

export class InvalidTransactionDescriptionError extends DomainError {
  readonly code = "INVALID_TRANSACTION_DESCRIPTION";
}

export class TransactionNotFoundError extends DomainError {
  readonly code = "TRANSACTION_NOT_FOUND";

  constructor(message = "La transacción no existe") {
    super(message);
  }
}

export class TransactionCategoryInvalidError extends DomainError {
  readonly code = "TRANSACTION_CATEGORY_INVALID";

  constructor(message = "La categoría no existe o no es del usuario") {
    super(message);
  }
}
