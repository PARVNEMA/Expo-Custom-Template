import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_CONFIG, AUTH_CONFIG } from '@/config/constants';
import { ApiResponse, ApiError } from '@/types/api.types';
import { logger } from './logger.service';
import { toast } from './toast.service';

class ApiService {
  private client: AxiosInstance;
  private isRefreshing: boolean = false;
  private failedQueue: Array<{
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        logger.debug('ApiService', `HTTP ${config.method?.toUpperCase()} -> ${config.url}`);
        const token = await SecureStore.getItemAsync(AUTH_CONFIG.TOKEN_KEY);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        logger.error('ApiService', 'Request setup failed', error);
        return Promise.reject(this.handleError(error));
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        logger.debug(
          'ApiService',
          `HTTP ${response.status} <- ${response.config.url}`
        );
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return this.client(originalRequest);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = await SecureStore.getItemAsync(
              AUTH_CONFIG.REFRESH_TOKEN_KEY
            );
            if (refreshToken) {
              const response = await this.client.post('/auth/refresh', {
                refreshToken,
              });
              const { token } = response.data;

              await SecureStore.setItemAsync(AUTH_CONFIG.TOKEN_KEY, token);

              this.processQueue(null, token);

              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            await this.clearAuthData();
            const formattedError = this.handleError(refreshError, true);
            throw formattedError;
          } finally {
            this.isRefreshing = false;
          }
        }

        const formattedError = this.handleError(error, true);
        return Promise.reject(formattedError);
      }
    );
  }

  private processQueue(error: any, token: string | null): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    this.failedQueue = [];
  }

  private async clearAuthData(): Promise<void> {
    await SecureStore.deleteItemAsync(AUTH_CONFIG.TOKEN_KEY);
    await SecureStore.deleteItemAsync(AUTH_CONFIG.REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(AUTH_CONFIG.USER_KEY);
  }

  private handleError(error: any, showToast: boolean = false): ApiError {
    let apiError: ApiError;

    if (axios.isAxiosError(error)) {
      apiError = {
        message:
          error.response?.data?.message ||
          error.message ||
          'An unexpected error occurred',
        status: error.response?.status || 0,
        code: error.response?.data?.code || error.code,
        details: error.response?.data?.details || null,
      };
    } else {
      apiError = {
        message: error?.message || 'An unexpected error occurred',
        status: 0,
      };
    }

    logger.error('ApiService', `API Error [${apiError.status}]: ${apiError.message}`, apiError);

    if (showToast) {
      toast.error(apiError.message, 'Network Request Failed');
    }

    return apiError;
  }

  private async retryRequest<T>(
    request: () => Promise<AxiosResponse<T>>,
    attempts: number = API_CONFIG.RETRY_ATTEMPTS
  ): Promise<AxiosResponse<T>> {
    try {
      return await request();
    } catch (error) {
      if (attempts > 1 && this.shouldRetry(error)) {
        await this.delay(API_CONFIG.RETRY_DELAY);
        return this.retryRequest(request, attempts - 1);
      }
      throw error;
    }
  }

  private shouldRetry(error: any): boolean {
    if (!axios.isAxiosError(error)) return false;

    const status = error.response?.status;
    return !status || status >= 500 || status === 429;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Public methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.retryRequest(() =>
      this.client.get<ApiResponse<T> | T>(url, config)
    );
    return (response.data as ApiResponse<T>).data || (response.data as T);
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.retryRequest(() =>
      this.client.post<ApiResponse<T> | T>(url, data, config)
    );
    return (response.data as ApiResponse<T>).data || (response.data as T);
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.retryRequest(() =>
      this.client.put<ApiResponse<T> | T>(url, data, config)
    );
    return (response.data as ApiResponse<T>).data || (response.data as T);
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.retryRequest(() =>
      this.client.patch<ApiResponse<T> | T>(url, data, config)
    );
    return (response.data as ApiResponse<T>).data || (response.data as T);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.retryRequest(() =>
      this.client.delete<ApiResponse<T> | T>(url, config)
    );
    return (response.data as ApiResponse<T>).data || (response.data as T);
  }
}

export const apiService = new ApiService();
