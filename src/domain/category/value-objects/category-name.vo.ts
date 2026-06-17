import { InvalidCategoryNameError } from "../errors";

export class CategoryName {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): CategoryName {
    const trimmed = value.trim();
    if (trimmed.length < 1) {
      throw new InvalidCategoryNameError("El nombre es requerido");
    }
    if (trimmed.length > 120) {
      throw new InvalidCategoryNameError(
        "El nombre no puede superar 120 caracteres",
      );
    }
    return new CategoryName(trimmed);
  }

  toString(): string {
    return this.value;
  }

  equals(other: CategoryName): boolean {
    return this.value === other.value;
  }
}
