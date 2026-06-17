import {
  UnexpectedError,
  ValidationError,
  type DomainError,
} from "../../../domain/shared/errors";
import type { PaginatedResult } from "../../../domain/shared/types";
import type {
  ICreateTransactionRequest,
  IFilterTransactionsRequest,
  IUpdateTransactionRequest,
} from "../../../domain/transaction/dto";
import type { TransactionEntity } from "../../../domain/transaction/entities";
import {
  TransactionCategoryInvalidError,
  TransactionNotFoundError,
} from "../../../domain/transaction/errors";
import type { ITransactionRepository } from "../../../domain/transaction/repositories";
import {
  createTransactionAction,
  deleteTransactionAction,
  getTransactionByIdAction,
  getTransactionsAction,
  updateTransactionAction,
} from "../../actions/transaction";
import { normalizeHttpError } from "../../api/http-error";
import { TransactionMapper } from "../../mappers/transaction";

export class TransactionRepositoryImpl implements ITransactionRepository {
  async findAll(
    filters?: IFilterTransactionsRequest,
  ): Promise<PaginatedResult<TransactionEntity>> {
    try {
      const response = await getTransactionsAction(filters);
      return TransactionMapper.toPaginatedResult(response);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async findById(id: string): Promise<TransactionEntity | null> {
    try {
      const response = await getTransactionByIdAction(id);
      return TransactionMapper.toEntity(response);
    } catch (error) {
      const { statusCode } = normalizeHttpError(error);
      if (statusCode === 404) return null;
      throw this.mapError(error);
    }
  }

  async create(data: ICreateTransactionRequest): Promise<TransactionEntity> {
    try {
      const response = await createTransactionAction(data);
      return TransactionMapper.toEntity(response);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async update(
    id: string,
    data: IUpdateTransactionRequest,
  ): Promise<TransactionEntity> {
    try {
      const response = await updateTransactionAction(id, data);
      return TransactionMapper.toEntity(response);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await deleteTransactionAction(id);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  private mapError(error: unknown): DomainError {
    const { statusCode, messages } = normalizeHttpError(error);

    switch (statusCode) {
      case 400:
        return new ValidationError(messages);
      case 404:
        // En transactions, 404 puede ser "no encontrada" o "categoría inválida".
        // El backend distingue por mensaje; si menciona categoría, lo tipamos distinto.
        if (messages[0]?.toLowerCase().includes("categor")) {
          return new TransactionCategoryInvalidError(messages[0]);
        }
        return new TransactionNotFoundError(messages[0]);
      default:
        return new UnexpectedError(messages[0]);
    }
  }
}

export const transactionRepository: ITransactionRepository =
  new TransactionRepositoryImpl();
