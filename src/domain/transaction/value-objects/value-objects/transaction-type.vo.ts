import { InvalidTransactionTypeError } from "../../errors";

export type TransactionTypeValue = "entrada" | "saida";

export class TransactionType {
  private readonly value: TransactionTypeValue;

  private constructor(value: TransactionTypeValue) {
    this.value = value;
  }

  static create(value: string): TransactionType {
    if (value !== "entrada" && value !== "saida") {
      throw new InvalidTransactionTypeError(`Tipo inválido: ${value}`);
    }
    return new TransactionType(value);
  }

  static entrada(): TransactionType {
    return new TransactionType("entrada");
  }

  static saida(): TransactionType {
    return new TransactionType("saida");
  }

  isEntrada(): boolean {
    return this.value === "entrada";
  }

  isSaida(): boolean {
    return this.value === "saida";
  }

  toString(): TransactionTypeValue {
    return this.value;
  }
}
