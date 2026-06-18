import { authApi } from "../../api/api";
import type { ApiResponse, CategorySummaryResponse } from "../../interfaces";

export const getCategoriesSummaryAction = async (): Promise<
  CategorySummaryResponse[]
> => {
  const response = await authApi.get<ApiResponse<CategorySummaryResponse[]>>(
    "/categories/summary",
  );
  return response.data;
};
