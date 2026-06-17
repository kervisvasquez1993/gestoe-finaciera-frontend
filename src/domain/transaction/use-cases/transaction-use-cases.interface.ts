import type { PaginatedResult } from "../../shared/types";
import type {
  ICreateTransactionRequest,
  IFilterTransactionsRequest,
  IUpdateTransactionRequest,
} from "../dto";
import type { TransactionEntity } from "../entities";

export interface ITransactionUseCases {
  getAll(
    filters?: IFilterTransactionsRequest,
  ): Promise<PaginatedResult<TransactionEntity>>;
  getById(id: string): Promise<TransactionEntity | null>;
  create(data: ICreateTransactionRequest): Promise<TransactionEntity>;
  update(
    id: string,
    data: IUpdateTransactionRequest,
  ): Promise<TransactionEntity>;
  remove(id: string): Promise<void>;
}
