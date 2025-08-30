import { apiService } from '@/services/api.service';
import * as SecureStore from 'expo-secure-store';
import { AUTH_CONFIG } from '@/config/constants';
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from '@/types/auth.types';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock response
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: credentials.email.split('@')[0],
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockResponse: AuthResponse = {
        user: mockUser,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
      };

      // Store tokens securely
      await SecureStore.setItemAsync(AUTH_CONFIG.TOKEN_KEY, mockResponse.token);
      await SecureStore.setItemAsync(
        AUTH_CONFIG.REFRESH_TOKEN_KEY,
        mockResponse.refreshToken
      );
      await SecureStore.setItemAsync(
        AUTH_CONFIG.USER_KEY,
        JSON.stringify(mockResponse.user)
      );

      return mockResponse;
    } catch (error) {
      throw new Error(
        'Login failed. Please check your credentials and try again.'
      );
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock response
      const mockUser: User = {
        id: '2',
        email: credentials.email,
        name: credentials.name,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockResponse: AuthResponse = {
        user: mockUser,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
      };

      // Store tokens securely
      await SecureStore.setItemAsync(AUTH_CONFIG.TOKEN_KEY, mockResponse.token);
      await SecureStore.setItemAsync(
        AUTH_CONFIG.REFRESH_TOKEN_KEY,
        mockResponse.refreshToken
      );
      await SecureStore.setItemAsync(
        AUTH_CONFIG.USER_KEY,
        JSON.stringify(mockResponse.user)
      );

      return mockResponse;
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  }

  async logout(): Promise<void> {
    try {
      // Clear stored tokens
      await SecureStore.deleteItemAsync(AUTH_CONFIG.TOKEN_KEY);
      await SecureStore.deleteItemAsync(AUTH_CONFIG.REFRESH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(AUTH_CONFIG.USER_KEY);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  async getStoredUser(): Promise<User | null> {
    try {
      const userData = await SecureStore.getItemAsync(AUTH_CONFIG.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  }

  async getStoredToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(AUTH_CONFIG.TOKEN_KEY);
    } catch (error) {
      console.error('Error getting stored token:', error);
      return null;
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = await SecureStore.getItemAsync(
        AUTH_CONFIG.REFRESH_TOKEN_KEY
      );
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // Simulate token refresh
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newToken = 'new-mock-jwt-token';
      await SecureStore.setItemAsync(AUTH_CONFIG.TOKEN_KEY, newToken);

      return newToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      await this.logout();
      return null;
    }
  }
}

export const authService = new AuthService();
