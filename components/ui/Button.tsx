import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  ...props
}) => {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 active:bg-blue-700';
      case 'secondary':
        return 'bg-gray-600 active:bg-gray-700';
      case 'outline':
        return 'bg-transparent border-2 border-blue-600 active:bg-blue-50';
      case 'ghost':
        return 'bg-transparent active:bg-gray-100';
      default:
        return 'bg-blue-600 active:bg-blue-700';
    }
  };

  const getSizeStyles = (): string => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 rounded-md';
      case 'md':
        return 'px-4 py-3 rounded-lg';
      case 'lg':
        return 'px-6 py-4 rounded-xl';
      default:
        return 'px-4 py-3 rounded-lg';
    }
  };

  const getTextVariantStyles = (): string => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return 'text-white';
      case 'outline':
        return 'text-blue-600';
      case 'ghost':
        return 'text-gray-700';
      default:
        return 'text-white';
    }
  };

  const getTextSizeStyles = (): string => {
    switch (size) {
      case 'sm':
        return 'text-sm font-medium';
      case 'md':
        return 'text-base font-semibold';
      case 'lg':
        return 'text-lg font-semibold';
      default:
        return 'text-base font-semibold';
    }
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50' : ''}
        flex-row items-center justify-center
        ${className || ''}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline' || variant === 'ghost' ? '#2563eb' : '#ffffff'
          }
          className="mr-2"
        />
      )}
      {!loading && leftIcon && <>{leftIcon}</>}
      <Text
        className={`
          ${getTextVariantStyles()}
          ${getTextSizeStyles()}
          ${leftIcon || rightIcon || loading ? 'mx-1' : ''}
        `}
      >
        {title}
      </Text>
      {!loading && rightIcon && <>{rightIcon}</>}
    </TouchableOpacity>
  );
};

export default Button;
