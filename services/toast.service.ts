export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

type ToastListener = (toast: ToastOptions & { id: string }) => void;

class ToastService {
  private listeners: Set<ToastListener> = new Set();
  private defaultDuration: number = 3500;

  subscribe(listener: ToastListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  show(options: ToastOptions): void {
    const toast = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type: options.type || 'info',
      duration: options.duration || this.defaultDuration,
      ...options,
    };

    this.listeners.forEach((listener) => {
      try {
        listener(toast);
      } catch (err) {
        console.error('Toast listener error:', err);
      }
    });
  }

  success(message: string, title?: string, duration?: number): void {
    this.show({ message, title, type: 'success', duration });
  }

  error(message: string, title?: string, duration?: number): void {
    this.show({ message, title: title || 'Error', type: 'error', duration });
  }

  info(message: string, title?: string, duration?: number): void {
    this.show({ message, title, type: 'info', duration });
  }

  warning(message: string, title?: string, duration?: number): void {
    this.show({ message, title: title || 'Warning', type: 'warning', duration });
  }
}

export const toast = new ToastService();
