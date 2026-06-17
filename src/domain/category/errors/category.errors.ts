import { DomainError } from "../../shared/errors";

export class InvalidCategoryNameError extends DomainError {
  readonly code = "INVALID_CATEGORY_NAME";
}

export class CategoryNotFoundError extends DomainError {
  readonly code = "CATEGORY_NOT_FOUND";

  constructor(message = "La categoría no existe") {
    super(message);
  }
}

export class CategoryAlreadyExistsError extends DomainError {
  readonly code = "CATEGORY_ALREADY_EXISTS";

  constructor(message = "Ya existe una categoría con ese nombre") {
    super(message);
  }
}

export class CategoryHasTransactionsError extends DomainError {
  readonly code = "CATEGORY_HAS_TRANSACTIONS";

  constructor(
    message = "No se puede eliminar: la categoría tiene transacciones asociadas",
  ) {
    super(message);
  }
}
