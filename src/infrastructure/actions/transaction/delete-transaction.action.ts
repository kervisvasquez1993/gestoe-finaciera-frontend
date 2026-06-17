import { authApi } from "../../api/api";
import type { ApiResponse } from "../../interfaces";

export const deleteTransactionAction = async (id: string): Promise<void> => {
  await authApi.delete<ApiResponse<{ message: string }>>(`/transactions/${id}`);
};
