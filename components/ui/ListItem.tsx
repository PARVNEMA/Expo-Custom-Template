import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  disabled?: boolean;
  showChevron?: boolean;
}

export default function ListItem({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
  disabled = false,
  showChevron = false,
}: ListItemProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      disabled={disabled}
      className={`flex-row items-center p-4 border-b border-gray-100 ${
        disabled ? 'opacity-50' : ''
      }`}
      style={style}
    >
      {leftIcon && (
        <View className="mr-3">
          <Ionicons name={leftIcon} size={20} color="#6B7280" />
        </View>
      )}

      <View className="flex-1">
        <Text
          className="text-base font-medium text-gray-900"
          style={titleStyle}
        >
          {title}
        </Text>
        {subtitle && (
          <Text className="text-sm text-gray-500 mt-1" style={subtitleStyle}>
            {subtitle}
          </Text>
        )}
      </View>

      {(rightIcon || showChevron) && (
        <View className="ml-2">
          <Ionicons
            name={
              (rightIcon || 'chevron-forward') as keyof typeof Ionicons.glyphMap
            }
            size={20}
            color="#9CA3AF"
          />
        </View>
      )}
    </Container>
  );
}
