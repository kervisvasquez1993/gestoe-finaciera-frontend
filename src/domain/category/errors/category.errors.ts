import { DomainError } from "../../shared/errors";

export class InvalidCategoryNameError extends DomainError {
  readonly code = "INVALID_CATEGORY_NAME";
}

export class CategoryNotFoundError extends DomainError {
  readonly code = "CATEGORY_NOT_FOUND";

  constructor(message = "A categoria não existe") {
    super(message);
  }
}

export class CategoryAlreadyExistsError extends DomainError {
  readonly code = "CATEGORY_ALREADY_EXISTS";

  constructor(message = "Já existe uma categoria com esse nome") {
    super(message);
  }
}

export class CategoryHasTransactionsError extends DomainError {
  readonly code = "CATEGORY_HAS_TRANSACTIONS";

  constructor(
    message = "Não é possível excluir: a categoria possui transações associadas",
  ) {
    super(message);
  }
}
