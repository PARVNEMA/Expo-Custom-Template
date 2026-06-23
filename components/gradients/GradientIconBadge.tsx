import React, { ReactNode, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  interpolate, 
  Easing 
} from 'react-native-reanimated';
type BadgeSize = 'sm' | 'md' | 'lg';
type GradientSpeed = 'slow' | 'medium' | 'fast';

interface GradientIconBadgeProps {
  /** Gradient colors */
  colors?: string[];
  /** Badge size preset (sm=32, md=40, lg=48px) */
  size?: BadgeSize;
  /** Corner radius */
  borderRadius?: number;
  /** Enable/disable gradient animation */
  animated?: boolean;
  /** Animation speed */
  speed?: GradientSpeed;
  /** Icon element */
  children: ReactNode;
  /** NativeWind className pass-through */
  className?: string;
  /** Custom style overrides */
  style?: ViewStyle;
}

const SIZE_MAP: Record<BadgeSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

/**
 * Icon container/badge with gradient background.
 * Replaces the plain `bg-blue-50` icon containers used across the app.
 *
 * @example
 * ```tsx
 * <GradientIconBadge colors={['#10b981', '#059669']} size="md">
 *   <Compass size={20} color="white" />
 * </GradientIconBadge>
 *
 * <GradientIconBadge colors={['#3b82f6', '#1d4ed8']} size="lg" borderRadius={999}>
 *   <User size={24} color="white" />
 * </GradientIconBadge>
 * ```
 */
export default function GradientIconBadge({
  colors = ['#3b82f6', '#1d4ed8'],
  size = 'md',
  borderRadius = 12,
  animated = false,
  speed = 'slow',
  children,
  className,
  style,
}: GradientIconBadgeProps) {
  const dimension = SIZE_MAP[size];

  const shineProgress = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      const duration = speed === 'fast' ? 1000 : speed === 'medium' ? 1500 : 2500;
      shineProgress.value = withRepeat(
        withTiming(1, { duration, easing: Easing.linear }),
        -1, // infinite
        false // no reverse
      );
    } else {
      shineProgress.value = 0;
    }
  }, [animated, speed, shineProgress]);

  const shineStyle = useAnimatedStyle(() => {
    const translate = interpolate(shineProgress.value, [0, 1], [-dimension * 1.5, dimension * 1.5]);
    return {
      position: 'absolute' as const,
      width: dimension * 2,
      height: dimension * 2,
      top: -dimension / 2,
      left: -dimension / 2,
      transform: [
        { translateX: translate },
        { translateY: translate },
      ],
      zIndex: 0,
    };
  });

  return (
    <View className={className} style={[{ borderRadius, overflow: 'hidden' }, style]}>
      <LinearGradient
        colors={colors as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: dimension,
          height: dimension,
          borderRadius,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Animated shine overlay */}
        {animated && (
          <Animated.View style={shineStyle}>
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.6)', 'transparent']}
              locations={[0.4, 0.5, 0.6]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
              }}
            />
          </Animated.View>
        )}
        {/* Icon */}
        <View style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </View>
      </LinearGradient>
    </View>
  );
}
