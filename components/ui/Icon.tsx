import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export default function Icon({
  name,
  size = 24,
  color = '#000',
  style,
  onPress,
}: IconProps) {
  return (
    <View style={style}>
      <Ionicons
        name={name}
        size={size}
        color={color}
        onPress={onPress}
      />
    </View>
  );
}
