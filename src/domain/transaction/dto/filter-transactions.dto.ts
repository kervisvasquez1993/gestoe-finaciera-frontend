import type { TransactionTypeValue } from "../value-objects/value-objects";

export interface IFilterTransactionsRequest {
  type?: TransactionTypeValue;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
