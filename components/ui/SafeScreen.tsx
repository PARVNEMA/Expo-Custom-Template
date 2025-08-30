import React from 'react';
import { View, ViewStyle } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface SafeScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  backgroundColor?: string;
}

export default function SafeScreen({
  children,
  style,
  edges = ['top', 'bottom', 'left', 'right'],
  backgroundColor = 'bg-white',
}: SafeScreenProps) {
  const insets = useSafeAreaInsets();

  const paddingStyle = {
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
    paddingLeft: edges.includes('left') ? insets.left : 0,
    paddingRight: edges.includes('right') ? insets.right : 0,
  };

  return (
    <SafeAreaView
      className={`flex-1 ${backgroundColor}`}
      style={[paddingStyle, style]}
    >
      {children}
    </SafeAreaView>
  );
}
