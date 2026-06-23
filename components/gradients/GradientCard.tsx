import React, { ReactNode, useEffect, useState } from 'react';
import { View, ViewStyle, LayoutChangeEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  interpolate, 
  Easing 
} from 'react-native-reanimated';

type GradientDirection = 'horizontal' | 'vertical' | 'diagonal';
type GradientSpeed = 'slow' | 'medium' | 'fast';

interface GradientCardProps {
  /** Gradient color stops */
  colors?: string[];
  /** Enable/disable gradient animation */
  animated?: boolean;
  /** Animation speed preset */
  speed?: GradientSpeed;
  /** Gradient direction */
  direction?: GradientDirection;
  /** Corner radius */
  borderRadius?: number;
  /** Card content */
  children: ReactNode;
  /** NativeWind className pass-through */
  className?: string;
  /** Custom style overrides */
  style?: ViewStyle;
}

const DIRECTION_COORDS: Record<GradientDirection, {
  start: { x: number; y: number };
  end: { x: number; y: number };
}> = {
  horizontal: { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } },
  vertical: { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
  diagonal: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
};

/**
 * Card with an animated gradient background.
 * The gradient smoothly shifts its position in a continuous loop,
 * creating a premium "breathing" effect.
 *
 * @example
 * ```tsx
 * <GradientCard colors={['#1e3a8a', '#3b82f6']} speed="slow">
 *   <Text className="text-white text-xl font-bold">₹24.5L</Text>
 *   <Text className="text-white/70">Total Revenue</Text>
 * </GradientCard>
 * ```
 */
export default function GradientCard({
  colors = ['#667eea', '#764ba2'],
  animated = true,
  speed = 'slow',
  direction = 'diagonal',
  borderRadius = 16,
  children,
  className,
  style,
}: GradientCardProps) {
  const staticCoords = DIRECTION_COORDS[direction];

  if (!animated) {
    return (
      <LinearGradient
        colors={colors as any}
        start={staticCoords.start}
        end={staticCoords.end}
        className={className}
        style={[{ borderRadius, overflow: 'hidden' }, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View className={className} style={[{ borderRadius, overflow: 'hidden' }, style]}>
      <GradientCardAnimated
        colors={colors}
        borderRadius={borderRadius}
        speed={speed}
        direction={direction}
      >
        {children}
      </GradientCardAnimated>
    </View>
  );
}

/**
 * Inner animated gradient card — uses periodic re-renders via
 * useAnimatedGradient to smoothly shift gradient coordinates.
 */
function GradientCardAnimated({
  colors,
  borderRadius,
  speed,
  direction,
  children,
}: {
  colors: string[];
  borderRadius: number;
  speed: GradientSpeed;
  direction: GradientDirection;
  children: ReactNode;
}) {
  const staticCoords = DIRECTION_COORDS[direction];
  const shineProgress = useSharedValue(0);
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const duration = speed === 'fast' ? 1500 : speed === 'medium' ? 2500 : 4000;
    shineProgress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.linear }),
      -1,
      false
    );
  }, [speed, shineProgress]);

  const shineStyle = useAnimatedStyle(() => {
    // We use the larger dimension to ensure the shine covers the whole card
    const maxDim = Math.max(layout.width, layout.height) || 500; // fallback to 500
    const translate = interpolate(shineProgress.value, [0, 1], [-maxDim * 1.5, maxDim * 1.5]);
    
    return {
      position: 'absolute' as const,
      width: maxDim * 2,
      height: maxDim * 2,
      top: -maxDim / 2,
      left: -maxDim / 2,
      transform: [
        { translateX: translate },
        { translateY: translate },
      ],
      zIndex: 0,
    };
  });

  const onLayout = (e: LayoutChangeEvent) => {
    setLayout({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  return (
    <View style={{ borderRadius, overflow: 'hidden' }} onLayout={onLayout}>
      {/* Base gradient */}
      <LinearGradient
        colors={colors as any}
        start={staticCoords.start}
        end={staticCoords.end}
        style={{ borderRadius }}
      >
        {/* Animated overlay gradient for shine effect */}
        {layout.width > 0 && layout.height > 0 && (
          <Animated.View style={shineStyle}>
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.4)', 'transparent']}
              locations={[0.4, 0.5, 0.6]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
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
