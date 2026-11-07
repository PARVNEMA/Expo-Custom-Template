import { Platform, ToastAndroid, Alert } from 'react-native';

/**
 * Formats error objects, strings, arrays, or API errors into a clean, human-readable string.
 */
export function formatErrorMessage(error: unknown, fallbackMessage = 'An unexpected error occurred'): string {
  if (!error) {
    return fallbackMessage;
  }

  if (typeof error === 'string') {
    const trimmed = error.trim();
    return trimmed.length > 0 ? trimmed : fallbackMessage;
  }

  if (Array.isArray(error)) {
    return error.map((item) => formatErrorMessage(item)).filter(Boolean).join('\n') || fallbackMessage;
  }

  if (typeof error === 'object') {
    const errObj = error as Record<string, any>;

    // Handle common API error / Axios / custom envelope patterns
    if (typeof errObj.message === 'string' && errObj.message.trim()) {
      return errObj.message.trim();
    }

    if (errObj.response?.data?.message) {
      const respMsg = errObj.response.data.message;
      if (typeof respMsg === 'string') return respMsg.trim();
      if (Array.isArray(respMsg)) return respMsg.join('\n');
    }

    if (typeof errObj.error === 'string' && errObj.error.trim()) {
      return errObj.error.trim();
    }

    if (typeof errObj.details === 'string' && errObj.details.trim()) {
      return errObj.details.trim();
    }

    if (errObj.details && typeof errObj.details === 'object') {
      try {
        return JSON.stringify(errObj.details);
      } catch {
        // ignore JSON stringify errors
      }
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

/**
 * Shows an Android Native Toast (with graceful fallback on other platforms like iOS/Web).
 */
export function showToast(message: string, duration: 'short' | 'long' = 'short'): void {
  const text = typeof message === 'string' ? message : String(message);
  if (!text) return;

  if (Platform.OS === 'android') {
    const toastDuration = duration === 'long' ? ToastAndroid.LONG : ToastAndroid.SHORT;
    ToastAndroid.show(text, toastDuration);
  } else {
    // Cross-platform fallback for iOS / web development
    console.log(`[Toast]: ${text}`);
    if (Platform.OS === 'ios') {
      Alert.alert('', text);
    }
  }
}

/**
 * Formats the given error and shows it as a toast.
 */
export function showErrorToast(
  error: unknown,
  fallbackMessage = 'Something went wrong',
  duration: 'short' | 'long' = 'long'
): void {
  const formatted = formatErrorMessage(error, fallbackMessage);
  showToast(formatted, duration);
}

/**
 * Unified toast utility object matching app conventions.
 */
export const toast = {
  show: (message: string, duration?: 'short' | 'long') => showToast(message, duration),
  success: (message: string, duration?: 'short' | 'long') => showToast(message, duration),
  info: (message: string, duration?: 'short' | 'long') => showToast(message, duration),
  warning: (message: string, duration?: 'short' | 'long') => showToast(message, duration),
  error: (error: unknown, fallbackMessage?: string, duration?: 'short' | 'long') =>
    showErrorToast(error, fallbackMessage, duration),
  formatErrorMessage,
};

export default toast;
