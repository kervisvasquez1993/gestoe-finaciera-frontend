import { authApi } from "../../api/api";
import type { ApiResponse, UserResponse } from "../../interfaces";

export const getMeAction = async (): Promise<UserResponse> => {
  const response = await authApi.get<ApiResponse<UserResponse>>("/users/me");
  return response.data;
};
