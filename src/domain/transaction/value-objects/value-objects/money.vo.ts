import { InvalidAmountError } from "../../errors";

export class Money {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static create(value: number): Money {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw new InvalidAmountError("El monto debe ser un número");
    }
    if (value <= 0) {
      throw new InvalidAmountError("El monto debe ser positivo");
    }
    // máx 2 decimales
    if (Math.round(value * 100) / 100 !== value) {
      throw new InvalidAmountError("El monto admite máximo 2 decimales");
    }
    return new Money(value);
  }

  toNumber(): number {
    return this.value;
  }
}
