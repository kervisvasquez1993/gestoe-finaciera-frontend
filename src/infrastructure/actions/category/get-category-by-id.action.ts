import { authApi } from "../../api/api";
import type { ApiResponse, CategoryResponse } from "../../interfaces";

export const getCategoryByIdAction = async (
  id: string,
): Promise<CategoryResponse> => {
  const response = await authApi.get<ApiResponse<CategoryResponse>>(
    `/categories/${id}`,
  );
  return response.data;
};
