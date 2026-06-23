import React, { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ButtonSize = 'sm' | 'md' | 'lg';
interface GradientButtonProps {
  /** Button label */
  title: string;
  /** Gradient colors (defaults to app primary) */
  colors?: string[];
  /** Press callback */
  onPress?: () => void;
  /** Show loading spinner */
  loading?: boolean;
  /** Disable interaction */
  disabled?: boolean;
  /** Size preset */
  size?: ButtonSize;
  /** Icon before text */
  leftIcon?: ReactNode;
  /** Icon after text */
  rightIcon?: ReactNode;
  /** Full width */
  fullWidth?: boolean;
  /** NativeWind className pass-through */
  className?: string;
  /** Custom style overrides */
  style?: ViewStyle;
}

const SIZE_STYLES: Record<
  ButtonSize,
  { paddingHorizontal: number; paddingVertical: number; borderRadius: number }
> = {
  sm: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  md: { paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12 },
  lg: { paddingHorizontal: 28, paddingVertical: 18, borderRadius: 16 },
};

const TEXT_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'text-sm font-medium',
  md: 'text-base font-semibold',
  lg: 'text-lg font-semibold',
};

/**
 * Pressable button with animated gradient background, a periodic shine sweep,
 * and scale-press feedback. Composes the existing `useScalePress` hook for
 * tactile interaction.
 *
 * @example
 * ```tsx
 * <GradientButton
 *   title="Book Site Visit"
 *   colors={['#10b981', '#059669']}
 *   onPress={handleBooking}
 *   leftIcon={<Calendar size={18} color="white" />}
 * />
 * ```
 */
export default function GradientButton({
  title,
  colors = ['#2A7DD1', '#1A5FA3'],
  onPress,
  loading = false,
  disabled = false,
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  style,
}: GradientButtonProps) {
  const isDisabled = disabled || loading;
  const sizeStyle = SIZE_STYLES[size];
  const textSizeClass = TEXT_SIZE_CLASSES[size];

  return (
    <View
      style={[fullWidth ? { width: '100%' } : undefined]}
      className={className}
    >
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
      >
        <LinearGradient
          colors={colors as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: sizeStyle.borderRadius,
              paddingHorizontal: sizeStyle.paddingHorizontal,
              paddingVertical: sizeStyle.paddingVertical,
              overflow: 'hidden',
              opacity: isDisabled ? 0.5 : 1,
            },
            style,
          ]}
        >
          {/* Content */}
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <>
              {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
              <Text
                className={`text-white ${textSizeClass} ${
                  leftIcon || rightIcon ? 'mx-1' : ''
                }`}
              >
                {title}
              </Text>
              {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
            </>
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
}
