import React from 'react';
import { View, ActivityIndicator } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = '#3B82F6',
  fullScreen = false,
  className,
}) => {
  const containerClasses = fullScreen
    ? 'flex-1 justify-center items-center bg-white'
    : 'justify-center items-center py-4';

  return (
    <View className={`${containerClasses} ${className || ''}`}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default LoadingSpinner;