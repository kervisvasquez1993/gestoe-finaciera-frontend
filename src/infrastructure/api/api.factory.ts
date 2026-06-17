import {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { AxiosAdapter } from "./adapters/axios.adapters";
import { HttpAdapter } from "./adapters/http.adapters";
import { useAuthStore } from "../../presentation/stores/theme.store";

interface ApiFactoryOptions {
  baseUrl: string;
  params?: Record<string, string>;
  headers?: Record<string, string>;
  useInterceptors?: boolean;
}

interface AxiosAdapterOptions {
  baseUrl: string;
  params?: Record<string, string>;
  headers?: Record<string, string>;
  interceptors?: {
    request?: {
      onFulfilled?: (
        config: InternalAxiosRequestConfig,
      ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
      onRejected?: (error: AxiosError) => Promise<never>;
    };
    response?: {
      onFulfilled?: (
        response: AxiosResponse,
      ) => AxiosResponse | Promise<AxiosResponse>;
      onRejected?: (error: AxiosError) => Promise<never>;
    };
  };
}

export const createApiClient = (options: ApiFactoryOptions): HttpAdapter => {
  const adapterOptions: AxiosAdapterOptions = {
    baseUrl: options.baseUrl,
    params: options.params,
    headers: options.headers,
  };

  if (options.useInterceptors) {
    adapterOptions.interceptors = {
      request: {
        onFulfilled: (config: InternalAxiosRequestConfig) => {
          const token = useAuthStore.getState().accessToken;

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }

          return config;
        },
        onRejected: (error: AxiosError) => {
          return Promise.reject(error);
        },
      },
      response: {
        onFulfilled: (response: AxiosResponse) => {
          return response;
        },
        onRejected: (error: AxiosError) => {
          if (error.response?.status === 401) {
            useAuthStore.getState().clearSession();
          }
          return Promise.reject(error);
        },
      },
    };
  }

  const adapter = new AxiosAdapter(adapterOptions);

  return adapter;
};
