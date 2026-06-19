import { InvalidAmountError } from "../../errors";

export class Money {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static create(value: number): Money {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw new InvalidAmountError("O valor deve ser um número");
    }
    if (value <= 0) {
      throw new InvalidAmountError("O valor deve ser positivo");
    }
    // máx 2 casas decimais
    if (Math.round(value * 100) / 100 !== value) {
      throw new InvalidAmountError("O valor admite no máximo 2 casas decimais");
    }
    return new Money(value);
  }

  toNumber(): number {
    return this.value;
  }
}
