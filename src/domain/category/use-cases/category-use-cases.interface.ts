import type { ICreateCategoryRequest, IUpdateCategoryRequest } from "../dto";
import type { CategoryEntity } from "../entities";

export interface ICategoryUseCases {
  getAll(): Promise<CategoryEntity[]>;
  getById(id: string): Promise<CategoryEntity | null>;
  create(data: ICreateCategoryRequest): Promise<CategoryEntity>;
  update(id: string, data: IUpdateCategoryRequest): Promise<CategoryEntity>;
  remove(id: string): Promise<void>;
}
