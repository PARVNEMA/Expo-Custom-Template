import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      fullWidth = true,
      variant = 'outlined',
      secureTextEntry,
      className,
      ...props
    },
    ref
  ) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry);
    const [isFocused, setIsFocused] = useState(false);

    const getVariantStyles = (): string => {
      const baseStyles = 'rounded-lg';

      switch (variant) {
        case 'outlined':
          return `${baseStyles} border-2 bg-white ${
            error
              ? 'border-red-500'
              : isFocused
              ? 'border-blue-500'
              : 'border-gray-300'
          }`;
        case 'filled':
          return `${baseStyles} bg-gray-100 border border-gray-200`;
        default:
          return `${baseStyles} border border-gray-300 bg-white`;
      }
    };

    const togglePasswordVisibility = () => {
      setIsSecure(!isSecure);
    };

    return (
      <View className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <Text className="text-sm font-medium text-gray-700 mb-2">
            {label}
          </Text>
        )}

        <View
          className={`
          ${getVariantStyles()}
          flex-row items-center px-3 py-3
          ${className || ''}
        `}
        >
          {leftIcon && <View className="mr-3">{leftIcon}</View>}

          <TextInput
            ref={ref}
            className="flex-1 text-base text-gray-900"
            secureTextEntry={isSecure}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholderTextColor="#9CA3AF"
            {...props}
          />

          {secureTextEntry && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              className="ml-3"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {isSecure ? (
                <EyeOff size={20} color="#6B7280" />
              ) : (
                <Eye size={20} color="#6B7280" />
              )}
            </TouchableOpacity>
          )}

          {rightIcon && !secureTextEntry && (
            <View className="ml-3">{rightIcon}</View>
          )}
        </View>

        {error && <Text className="text-sm text-red-500 mt-1">{error}</Text>}

        {hint && !error && (
          <Text className="text-sm text-gray-500 mt-1">{hint}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

export default Input;
