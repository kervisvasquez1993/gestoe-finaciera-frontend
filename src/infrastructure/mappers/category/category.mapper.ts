import {
  CategoryEntity,
  CategorySummaryEntity,
} from "../../../domain/category/entities";
import { CategoryName } from "../../../domain/category/value-objects";
import type {
  CategoryResponse,
  CategorySummaryResponse,
} from "../../interfaces";

export class CategoryMapper {
  static toEntity(response: CategoryResponse): CategoryEntity {
    return new CategoryEntity({
      id: response.id,
      name: CategoryName.create(response.name),
      description: response.description,
      userId: response.userId,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    });
  }

  static toSummaryEntity(
    response: CategorySummaryResponse,
  ): CategorySummaryEntity {
    return new CategorySummaryEntity({
      id: response.id,
      name: CategoryName.create(response.name),
      description: response.description,
      transactionsCount: response.transactionsCount,
      totalEntradas: response.totalEntradas,
      totalSaidas: response.totalSaidas,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    });
  }
}
