import type { ICreateCategoryRequest, IUpdateCategoryRequest } from "../dto";
import type { CategoryEntity } from "../entities";

export interface ICategoryRepository {
  findAll(): Promise<CategoryEntity[]>;
  findById(id: string): Promise<CategoryEntity | null>;
  create(data: ICreateCategoryRequest): Promise<CategoryEntity>;
  update(id: string, data: IUpdateCategoryRequest): Promise<CategoryEntity>;
  delete(id: string): Promise<void>;
}
