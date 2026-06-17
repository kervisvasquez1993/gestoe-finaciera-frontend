import { publicApi } from "../../api/api";
import type {
  ApiResponse,
  RegisterPayload,
  RegisterResult,
} from "../../interfaces";

export const registerAction = async (
  payload: RegisterPayload,
): Promise<RegisterResult> => {
  const response = await publicApi.post<ApiResponse<RegisterResult>>(
    "/auth/register",
    payload,
  );
  return response.data;
};
