import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface UseScalePressOptions {
  /** Scale factor when pressed (0-1, lower = more squish) */
  scaleValue?: number;
  /** Spring damping (higher = less bouncy) */
  damping?: number;
  /** Spring stiffness */
  stiffness?: number;
}

/**
 * Hook for press-scale animation feedback.
 *
 * Usage:
 * ```tsx
 * const { animatedStyle, onPressIn, onPressOut } = useScalePress();
 * return (
 *   <Animated.View style={animatedStyle}>
 *     <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
 *       ...
 *     </Pressable>
 *   </Animated.View>
 * );
 * ```
 */
export function useScalePress(options: UseScalePressOptions = {}) {
  const { scaleValue = 0.97, damping = 15, stiffness = 150 } = options;

  const scale = useSharedValue(1);

  const onPressIn = () => {
    scale.value = withSpring(scaleValue, { damping, stiffness });
  };

  const onPressOut = () => {
    scale.value = withSpring(1, { damping, stiffness });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { animatedStyle, onPressIn, onPressOut };
}
