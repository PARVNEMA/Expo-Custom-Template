import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface UseAnimatedEntryOptions {
  /** Animation duration in ms */
  duration?: number;
  /** Delay before animation starts in ms */
  delay?: number;
  /** Slide direction during entry */
  direction?: Direction;
  /** Slide distance in pixels */
  distance?: number;
  /** Whether to animate on mount (set false to trigger manually) */
  autoPlay?: boolean;
}

/**
 * Hook for animated entry — returns an animatedStyle to apply to an Animated.View.
 *
 * Usage:
 * ```tsx
 * const { animatedStyle, play } = useAnimatedEntry({ direction: 'up', delay: 100 });
 * return <Animated.View style={animatedStyle}>...</Animated.View>;
 * ```
 */
export function useAnimatedEntry(options: UseAnimatedEntryOptions = {}) {
  const {
    duration = 400,
    delay = 0,
    direction = 'up',
    distance = 20,
    autoPlay = true,
  } = options;

  const opacity = useSharedValue(0);
  const translateX = useSharedValue(
    direction === 'left' ? -distance : direction === 'right' ? distance : 0
  );
  const translateY = useSharedValue(
    direction === 'up' ? distance : direction === 'down' ? -distance : 0
  );

  const timingConfig = {
    duration,
    easing: Easing.out(Easing.cubic),
  };

  const play = () => {
    'worklet';
    opacity.value = withDelay(delay, withTiming(1, timingConfig));
    translateX.value = withDelay(delay, withTiming(0, timingConfig));
    translateY.value = withDelay(delay, withTiming(0, timingConfig));
  };

  useEffect(() => {
    if (autoPlay) {
      play();
    }
  }, [autoPlay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return { animatedStyle, play };
}
