import { CategoryEntity } from "../../../domain/category/entities";
import { CategoryName } from "../../../domain/category/value-objects";
import type { CategoryResponse } from "../../interfaces";

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
}
