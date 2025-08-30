import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className,
  ...props
}) => {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'elevated':
        return 'bg-white rounded-xl shadow-lg';
      case 'outlined':
        return 'bg-white rounded-xl border border-gray-200';
      default:
        return 'bg-white rounded-lg shadow-sm';
    }
  };

  const getPaddingStyles = (): string => {
    switch (padding) {
      case 'none':
        return '';
      case 'sm':
        return 'p-3';
      case 'md':
        return 'p-4';
      case 'lg':
        return 'p-6';
      default:
        return 'p-4';
    }
  };

  return (
    <View
      className={`
        ${getVariantStyles()}
        ${getPaddingStyles()}
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </View>
  );
};

export default Card;