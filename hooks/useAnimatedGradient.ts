import { useEffect } from 'react';
import {
  useSharedValue,
  cancelAnimation,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
  useDerivedValue,
} from 'react-native-reanimated';

type GradientSpeed = 'slow' | 'medium' | 'fast';

interface UseAnimatedGradientOptions {
  /** Animation speed preset */
  speed?: GradientSpeed;
  /** Enable/disable animation */
  active?: boolean;
}

const SPEED_DURATIONS: Record<GradientSpeed, number> = {
  slow: 4000,
  medium: 2500,
  fast: 1500,
};

/**
 * Hook that powers animated gradient position shifts.
 * Returns animated start/end coordinate objects for LinearGradient.
 *
 * The animation smoothly interpolates the gradient's start/end points
 * in a continuous loop, creating a "breathing" effect.
 *
 * @example
 * ```tsx
 * const { startCoords, endCoords } = useAnimatedGradient({ speed: 'medium' });
 * // Use with Animated LinearGradient or pass coords manually
 * ```
 */
export function useAnimatedGradient(options: UseAnimatedGradientOptions = {}) {
  const { speed = 'slow', active = true } = options;
  const duration = SPEED_DURATIONS[speed];

  const progress = useSharedValue(0);

  useEffect(() => {
    if (active) {
      progress.value = withRepeat(
        withSequence(
          withTiming(1, {
            duration,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0, {
            duration,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1, // infinite
        false
      );
    } else {
      cancelAnimation(progress);
      progress.value = 0;
    }

    return () => {
      cancelAnimation(progress);
    };
  }, [active, duration]);

  // Animated start point — shifts between top-left and bottom-left
  const startX = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [0, 0.3])
  );
  const startY = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [0, 0.2])
  );

  // Animated end point — shifts between bottom-right and top-right
  const endX = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [1, 0.7])
  );
  const endY = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [1, 0.8])
  );

  return {
    progress,
    startX,
    startY,
    endX,
    endY,
  };
}
