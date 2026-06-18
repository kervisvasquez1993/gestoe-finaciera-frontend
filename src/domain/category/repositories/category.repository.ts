import type { ICreateCategoryRequest, IUpdateCategoryRequest } from "../dto";
import type { CategoryEntity, CategorySummaryEntity } from "../entities";

export interface ICategoryRepository {
  findAll(): Promise<CategoryEntity[]>;
  findSummary(): Promise<CategorySummaryEntity[]>;
  findById(id: string): Promise<CategoryEntity | null>;
  create(data: ICreateCategoryRequest): Promise<CategoryEntity>;
  update(id: string, data: IUpdateCategoryRequest): Promise<CategoryEntity>;
  delete(id: string): Promise<void>;
}
