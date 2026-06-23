import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useAnimatedGradient } from '@/hooks/useAnimatedGradient';

type GradientSpeed = 'slow' | 'medium' | 'fast';

interface GradientBannerProps {
  /** Gradient color stops */
  colors?: string[];
  /** Enable/disable gradient animation */
  animated?: boolean;
  /** Animation speed preset */
  speed?: GradientSpeed;
  /** Fixed height (auto if omitted) */
  height?: number;
  /** Bottom border radius for curved bottom edge */
  roundedBottom?: number;
  /** Banner content */
  children?: ReactNode;
  /** NativeWind className pass-through */
  className?: string;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Full-width banner/header with animated gradient and optional curved bottom.
 * Replaces inline LinearGradient usage for screen headers.
 *
 * @example
 * ```tsx
 * <GradientBanner
 *   colors={['#1e3a8a', '#3b82f6']}
 *   roundedBottom={40}
 *   className="pt-4 pb-16 px-4"
 * >
 *   <Text className="text-white text-2xl font-bold">My Profile</Text>
 * </GradientBanner>
 * ```
 */
export default function GradientBanner({
  colors = ['#1e3a8a', '#3b82f6'],
  animated = true,
  speed = 'slow',
  height,
  roundedBottom = 0,
  children,
  className,
  style,
}: GradientBannerProps) {
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
    opacity: animated ? startX.value : 0,
  }));

  const bannerStyle: ViewStyle = {
    overflow: 'hidden',
    ...(height ? { height } : {}),
    ...(roundedBottom
      ? {
          borderBottomLeftRadius: roundedBottom,
          borderBottomRightRadius: roundedBottom,
        }
      : {}),
  };

  return (
    <View style={bannerStyle}>
      <LinearGradient
        colors={colors as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={className}
        style={[{ flex: height ? undefined : 1 }, style]}
      >
        {/* Animated overlay for breathing effect */}
        {animated && (
          <Animated.View style={overlayStyle}>
            <LinearGradient
              colors={[...colors].reverse() as [string, string, ...string[]]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          </Animated.View>
        )}
        {/* Content */}
        <View style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </View>
      </LinearGradient>
    </View>
  );
}
