import type { PaginatedResult } from "../../../domain/shared/types";
import { TransactionEntity } from "../../../domain/transaction/entities";
import {
  Money,
  TransactionType,
} from "../../../domain/transaction/value-objects/value-objects";
import type { PaginatedData, TransactionResponse } from "../../interfaces";
import { CategoryMapper } from "../category";

export class TransactionMapper {
  static toEntity(response: TransactionResponse): TransactionEntity {
    return new TransactionEntity({
      id: response.id,
      description: response.description,
      amount: Money.create(response.amount),
      type: TransactionType.create(response.type),
      date: response.date,
      categoryId: response.categoryId,
      category: response.category
        ? CategoryMapper.toEntity(response.category)
        : undefined,
      userId: response.userId,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    });
  }

  static toPaginatedResult(
    response: PaginatedData<TransactionResponse>,
  ): PaginatedResult<TransactionEntity> {
    return {
      data: response.data.map(TransactionMapper.toEntity),
      meta: response.meta,
    };
  }
}
