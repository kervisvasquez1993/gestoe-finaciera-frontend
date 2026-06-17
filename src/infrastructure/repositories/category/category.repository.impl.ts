import type {
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from "../../../domain/category/dto";
import type { CategoryEntity } from "../../../domain/category/entities";
import {
  CategoryAlreadyExistsError,
  CategoryHasTransactionsError,
  CategoryNotFoundError,
} from "../../../domain/category/errors";
import type { ICategoryRepository } from "../../../domain/category/repositories";
import {
  UnexpectedError,
  ValidationError,
  type DomainError,
} from "../../../domain/shared/errors";
import {
  createCategoryAction,
  deleteCategoryAction,
  getCategoriesAction,
  getCategoryByIdAction,
  updateCategoryAction,
} from "../../actions/category";
import { normalizeHttpError } from "../../api/http-error";
import { CategoryMapper } from "../../mappers/category";

export class CategoryRepositoryImpl implements ICategoryRepository {
  async findAll(): Promise<CategoryEntity[]> {
    try {
      const response = await getCategoriesAction();
      return response.map(CategoryMapper.toEntity);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    try {
      const response = await getCategoryByIdAction(id);
      return CategoryMapper.toEntity(response);
    } catch (error) {
      const { statusCode } = normalizeHttpError(error);
      if (statusCode === 404) return null;
      throw this.mapError(error);
    }
  }

  async create(data: ICreateCategoryRequest): Promise<CategoryEntity> {
    try {
      const response = await createCategoryAction(data);
      return CategoryMapper.toEntity(response);
    } catch (error) {
      throw this.mapError(
        error,
        (msgs) => new CategoryAlreadyExistsError(msgs[0]),
      );
    }
  }

  async update(
    id: string,
    data: IUpdateCategoryRequest,
  ): Promise<CategoryEntity> {
    try {
      const response = await updateCategoryAction(id, data);
      return CategoryMapper.toEntity(response);
    } catch (error) {
      throw this.mapError(
        error,
        (msgs) => new CategoryAlreadyExistsError(msgs[0]),
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await deleteCategoryAction(id);
    } catch (error) {
      throw this.mapError(
        error,
        (msgs) => new CategoryHasTransactionsError(msgs[0]),
      );
    }
  }

  private mapError(
    error: unknown,
    on409?: (messages: string[]) => DomainError,
  ): DomainError {
    const { statusCode, messages } = normalizeHttpError(error);

    switch (statusCode) {
      case 400:
        return new ValidationError(messages);
      case 404:
        return new CategoryNotFoundError(messages[0]);
      case 409:
        return on409 ? on409(messages) : new UnexpectedError(messages[0]);
      default:
        return new UnexpectedError(messages[0]);
    }
  }
}

export const categoryRepository: ICategoryRepository =
  new CategoryRepositoryImpl();
