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

  constructor(message = "A transação não existe") {
    super(message);
  }
}

export class TransactionCategoryInvalidError extends DomainError {
  readonly code = "TRANSACTION_CATEGORY_INVALID";

  constructor(message = "A categoria não existe ou não pertence ao usuário") {
    super(message);
  }
}
