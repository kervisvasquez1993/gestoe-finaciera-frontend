import type { PaginatedResult } from "../../../domain/shared/types";
import type {
  ICreateTransactionRequest,
  IFilterTransactionsRequest,
  IUpdateTransactionRequest,
} from "../../../domain/transaction/dto";
import type { TransactionEntity } from "../../../domain/transaction/entities";
import type { ITransactionRepository } from "../../../domain/transaction/repositories";
import type { ITransactionUseCases } from "../../../domain/transaction/use-cases";
import {
  Money,
  TransactionType,
} from "../../../domain/transaction/value-objects/value-objects";
import { transactionRepository } from "../../../infrastructure/repositories/transaction";

export class TransactionUseCases implements ITransactionUseCases {
  private readonly repository: ITransactionRepository;

  constructor(repository: ITransactionRepository) {
    this.repository = repository;
  }

  getAll(
    filters?: IFilterTransactionsRequest,
  ): Promise<PaginatedResult<TransactionEntity>> {
    return this.repository.findAll(filters);
  }

  getById(id: string): Promise<TransactionEntity | null> {
    return this.repository.findById(id);
  }

  create(data: ICreateTransactionRequest): Promise<TransactionEntity> {
    // Valida invariantes antes de pegarle al backend
    Money.create(data.amount);
    TransactionType.create(data.type);

    return this.repository.create(data);
  }

  update(
    id: string,
    data: IUpdateTransactionRequest,
  ): Promise<TransactionEntity> {
    if (data.amount !== undefined) {
      Money.create(data.amount);
    }
    if (data.type !== undefined) {
      TransactionType.create(data.type);
    }
    return this.repository.update(id, data);
  }

  remove(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}

export const transactionUseCases = new TransactionUseCases(
  transactionRepository,
);
