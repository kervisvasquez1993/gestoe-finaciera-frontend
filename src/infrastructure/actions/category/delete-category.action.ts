import { authApi } from "../../api/api";
import type { ApiResponse } from "../../interfaces";

export const deleteCategoryAction = async (id: string): Promise<void> => {
  await authApi.delete<ApiResponse<{ message: string }>>(`/categories/${id}`);
};
