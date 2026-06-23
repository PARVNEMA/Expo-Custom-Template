import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientDividerProps {
  /** Gradient colors (defaults to fade-in/out primary) */
  colors?: string[];
  /** Divider thickness in pixels */
  height?: number;
  /** NativeWind className pass-through (for margin, etc.) */
  className?: string;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Horizontal divider/separator with a gradient fill.
 * A polished replacement for plain borders or 1px View dividers.
 * Defaults to a "fade from transparent → primary → transparent" look.
 *
 * @example
 * ```tsx
 * <GradientDivider className="my-4" />
 *
 * <GradientDivider
 *   colors={['transparent', '#8b5cf6', 'transparent']}
 *   height={2}
 *   className="my-6"
 * />
 * ```
 */
export default function GradientDivider({
  colors = ['transparent', '#2A7DD1', 'transparent'],
  height = 1,
  className,
  style,
}: GradientDividerProps) {
  return (
    <View className={className}>
      <LinearGradient
        colors={colors as any}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[
          {
            height,
            width: '100%',
            borderRadius: height / 2,
          },
          style,
        ]}
      />
    </View>
  );
}
