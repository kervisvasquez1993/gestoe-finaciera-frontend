import type { TransactionTypeValue } from "../value-objects/value-objects";

export interface ICreateTransactionRequest {
  description: string;
  amount: number;
  type: TransactionTypeValue;
  date: string;
  categoryId: string;
}
