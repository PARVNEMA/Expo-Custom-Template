import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useAnimatedGradient } from '@/hooks/useAnimatedGradient';

type GradientSpeed = 'slow' | 'medium' | 'fast';

interface GradientBorderProps {
  /** Border gradient colors */
  colors?: string[];
  /** Border thickness in pixels */
  borderWidth?: number;
  /** Corner radius */
  borderRadius?: number;
  /** Enable/disable gradient border animation */
  animated?: boolean;
  /** Animation speed */
  speed?: GradientSpeed;
  /** Content to wrap */
  children: ReactNode;
  /** Background color for the inner content area */
  innerBackground?: string;
  /** NativeWind className pass-through */
  className?: string;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Wraps any child component with an animated gradient border.
 * Works by rendering a gradient behind the child with padding equal to the border width,
 * then placing the child on top with a solid background.
 *
 * @example
 * ```tsx
 * <GradientBorder colors={['#3b82f6', '#8b5cf6', '#ec4899']} borderRadius={999}>
 *   <Image source={{ uri: avatarUrl }} className="w-20 h-20 rounded-full" />
 * </GradientBorder>
 *
 * <GradientBorder borderWidth={2} borderRadius={16}>
 *   <View className="p-4 bg-white">
 *     <Text>Premium Card</Text>
 *   </View>
 * </GradientBorder>
 * ```
 */
export default function GradientBorder({
  colors = ['#667eea', '#764ba2', '#f093fb'],
  borderWidth = 2,
  borderRadius = 16,
  animated = true,
  speed = 'slow',
  innerBackground = '#FFFFFF',
  children,
  className,
  style,
}: GradientBorderProps) {
  const { startX } = useAnimatedGradient({
    speed,
    active: animated,
  });

  const overlayStyle = useAnimatedStyle(() => ({
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius,
    opacity: animated ? startX.value * 2.5 : 0, // 0 → 0.75 range for visible effect
  }));

  // Inner border radius should be slightly less to account for border width
  const innerRadius = Math.max(0, borderRadius - borderWidth);

  return (
    <View className={className} style={[{ borderRadius, overflow: 'hidden' }, style]}>
      {/* Gradient background acting as the "border" */}
      <LinearGradient
        colors={colors as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius,
          padding: borderWidth,
          flex: 1,
        }}
      >
        {/* Animated overlay for border breathing effect */}
        {animated && (
          <Animated.View style={overlayStyle}>
            <LinearGradient
              colors={[...colors].reverse() as [string, string, ...string[]]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                flex: 1,
                borderRadius,
              }}
            />
          </Animated.View>
        )}

        {/* Inner content area with solid background */}
        <View
          style={{
            borderRadius: innerRadius,
            backgroundColor: innerBackground,
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
            flex: 1,
          }}
        >
          {children}
        </View>
      </LinearGradient>
    </View>
  );
}
