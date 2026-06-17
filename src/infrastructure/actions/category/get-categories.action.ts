import { authApi } from "../../api/api";
import type { ApiResponse, CategoryResponse } from "../../interfaces";

export const getCategoriesAction = async (): Promise<CategoryResponse[]> => {
  const response =
    await authApi.get<ApiResponse<CategoryResponse[]>>("/categories");
  return response.data;
};
