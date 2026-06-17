import { authApi } from "../../api/api";
import type {
  ApiResponse,
  FilterTransactionsParams,
  PaginatedData,
  TransactionResponse,
} from "../../interfaces";

export const getTransactionsAction = async (
  params?: FilterTransactionsParams,
): Promise<PaginatedData<TransactionResponse>> => {
  const response = await authApi.get<
    ApiResponse<PaginatedData<TransactionResponse>>
  >("/transactions", { params });
  return response.data;
};
