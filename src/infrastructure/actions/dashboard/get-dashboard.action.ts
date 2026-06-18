import { authApi } from "../../api/api";
import type {
  ApiResponse,
  DashboardParams,
  DashboardResponse,
} from "../../interfaces";

export const getDashboardAction = async (
  params?: DashboardParams,
): Promise<DashboardResponse> => {
  const response = await authApi.get<ApiResponse<DashboardResponse>>(
    "/dashboard",
    { params },
  );
  return response.data;
};
