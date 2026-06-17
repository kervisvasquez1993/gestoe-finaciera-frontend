import type { ApiError } from "../interfaces";

export interface NormalizedHttpError {
  statusCode: number;
  messages: string[];
}

export const normalizeHttpError = (error: unknown): NormalizedHttpError => {
  const axiosError = error as {
    response?: { status?: number; data?: Partial<ApiError> };
  };

  const data = axiosError?.response?.data;
  const statusCode = data?.statusCode ?? axiosError?.response?.status ?? 0;

  const rawMessage = data?.message;
  const messages = Array.isArray(rawMessage)
    ? rawMessage
    : rawMessage
      ? [rawMessage]
      : ["Ocurrió un error inesperado"];

  return { statusCode, messages };
};
