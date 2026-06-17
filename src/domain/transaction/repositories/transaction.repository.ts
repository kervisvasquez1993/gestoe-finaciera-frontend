import type { PaginatedResult } from "../../shared/types";
import type {
  ICreateTransactionRequest,
  IFilterTransactionsRequest,
  IUpdateTransactionRequest,
} from "../dto";
import type { TransactionEntity } from "../entities";

export interface ITransactionRepository {
  findAll(
    filters?: IFilterTransactionsRequest,
  ): Promise<PaginatedResult<TransactionEntity>>;
  findById(id: string): Promise<TransactionEntity | null>;
  create(data: ICreateTransactionRequest): Promise<TransactionEntity>;
  update(
    id: string,
    data: IUpdateTransactionRequest,
  ): Promise<TransactionEntity>;
  delete(id: string): Promise<void>;
}
