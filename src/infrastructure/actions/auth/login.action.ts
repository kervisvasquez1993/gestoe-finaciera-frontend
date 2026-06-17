import { publicApi } from "@/infrastructure/api/api";
import type { ApiResponse, LoginPayload, LoginResult } from "../../interfaces";

export const loginAction = async (
  payload: LoginPayload,
): Promise<LoginResult> => {
  const response = await publicApi.post<ApiResponse<LoginResult>>(
    "/auth/login",
    payload,
  );
  return response.data;
};
