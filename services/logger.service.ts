export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
  [key: string]: unknown;
}

class LoggerService {
  private isDevelopment: boolean = process.env.NODE_ENV !== 'production';

  private formatMessage(level: LogLevel, tag: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] [${tag}]: ${message}`;
  }

  private sanitize(data: unknown): unknown {
    if (!data || typeof data !== 'object') {
      return data;
    }

    try {
      const sensitiveKeys = ['password', 'token', 'authorization', 'secret', 'key', 'refreshtoken'];
      const copy = JSON.parse(JSON.stringify(data));

      const mask = (obj: Record<string, unknown>) => {
        for (const k in obj) {
          if (sensitiveKeys.some((s) => k.toLowerCase().includes(s))) {
            obj[k] = '***REDACTED***';
          } else if (typeof obj[k] === 'object' && obj[k] !== null) {
            mask(obj[k] as Record<string, unknown>);
          }
        }
      };

      mask(copy);
      return copy;
    } catch {
      return data;
    }
  }

  debug(tag: string, message: string, context?: LogContext): void {
    if (!this.isDevelopment) return;
    const formatted = this.formatMessage('debug', tag, message);
    if (context) {
      console.debug(formatted, this.sanitize(context));
    } else {
      console.debug(formatted);
    }
  }

  info(tag: string, message: string, context?: LogContext): void {
    const formatted = this.formatMessage('info', tag, message);
    if (context) {
      console.info(formatted, this.sanitize(context));
    } else {
      console.info(formatted);
    }
  }

  warn(tag: string, message: string, context?: LogContext): void {
    const formatted = this.formatMessage('warn', tag, message);
    if (context) {
      console.warn(formatted, this.sanitize(context));
    } else {
      console.warn(formatted);
    }
  }

  error(tag: string, message: string, error?: unknown, context?: LogContext): void {
    const formatted = this.formatMessage('error', tag, message);
    const sanitizedContext = context ? this.sanitize(context) : undefined;
    
    if (error && sanitizedContext) {
      console.error(formatted, error, sanitizedContext);
    } else if (error) {
      console.error(formatted, error);
    } else if (sanitizedContext) {
      console.error(formatted, sanitizedContext);
    } else {
      console.error(formatted);
    }
  }
}

export const logger = new LoggerService();
