import type {
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from "../../../domain/category/dto";
import type {
  CategoryEntity,
  CategorySummaryEntity,
} from "../../../domain/category/entities";
import type { ICategoryRepository } from "../../../domain/category/repositories";
import type { ICategoryUseCases } from "../../../domain/category/use-cases";
import { CategoryName } from "../../../domain/category/value-objects";
import { categoryRepository } from "../../../infrastructure/repositories/category";

export class CategoryUseCases implements ICategoryUseCases {
  private readonly repository: ICategoryRepository;

  constructor(repository: ICategoryRepository) {
    this.repository = repository;
  }

  getAll(): Promise<CategoryEntity[]> {
    return this.repository.findAll();
  }

  getById(id: string): Promise<CategoryEntity | null> {
    return this.repository.findById(id);
  }

  create(data: ICreateCategoryRequest): Promise<CategoryEntity> {
    const name = CategoryName.create(data.name);
    return this.repository.create({
      name: name.toString(),
      description: data.description,
    });
  }

  update(id: string, data: IUpdateCategoryRequest): Promise<CategoryEntity> {
    const payload: IUpdateCategoryRequest = { ...data };
    if (data.name !== undefined) {
      payload.name = CategoryName.create(data.name).toString();
    }
    return this.repository.update(id, payload);
  }

  remove(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  getSummary(): Promise<CategorySummaryEntity[]> {
    return this.repository.findSummary();
  }
}

export const categoryUseCases = new CategoryUseCases(categoryRepository);
