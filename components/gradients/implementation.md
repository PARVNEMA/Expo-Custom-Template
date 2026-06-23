Walkthrough — Animated Gradient Design Components
Summary
Added a complete library of 7 reusable animated gradient-based design components to components/gradients/, a shared animation hook, and curated color presets. All built on existing expo-linear-gradient + react-native-reanimated — zero new dependencies installed.

NOTE

GradientText was excluded since it requires @react-native-masked-view/masked-view (not installed). Can be added later if needed.

Files Created
Shared Hook
File Purpose
useAnimatedGradient.ts
Reusable hook that powers all gradient animations. Interpolates gradient start/end positions using withRepeat + withSequence for a smooth "breathing" loop. Supports slow / medium / fast speed presets.
Component Library
File Purpose
GradientCard.tsx
Animated gradient background card — overlays a reversed gradient with animated opacity for the breathing effect. Supports horizontal / vertical / diagonal directions.
GradientButton.tsx
CTA button with animated gradient + scale-press feedback (composes existing useScalePress hook). Supports loading/disabled states, icons, and size presets.
GradientBanner.tsx
Full-width animated gradient header/banner with curved bottom corners. Drop-in replacement for inline LinearGradient headers.
GradientBorder.tsx
Wraps any child with an animated gradient border using the padding technique. Great for avatar rings and premium card outlines.
GradientDivider.tsx
Gradient horizontal separator — defaults to "transparent → primary → transparent" fade.
GradientIconBadge.tsx
Gradient icon container/badge in sm / md / lg sizes. Replaces plain bg-blue-50 icon boxes.
Configuration & Exports
File Purpose
presets.ts
16 curated gradient color presets — app brand, role-based (matching profile screen), decorative, and neutral themes.
index.ts
Barrel exports for clean imports: import { GradientCard, GRADIENT_PRESETS } from '@/components/gradients'
Quick Usage Examples
Import
tsx

import {
GradientCard,
GradientButton,
GradientBanner,
GradientBorder,
GradientDivider,
GradientIconBadge,
GRADIENT_PRESETS,
} from '@/components/gradients';
GradientCard — Dashboard stat card
tsx

<GradientCard colors={GRADIENT_PRESETS.ocean} speed="slow">
  <View className="p-5">
    <Text className="text-white/70 text-sm">Total Revenue</Text>
    <Text className="text-white text-2xl font-bold">₹24.5L</Text>
  </View>
</GradientCard>
GradientButton — Premium CTA
tsx

<GradientButton
title="Book Site Visit"
colors={GRADIENT_PRESETS.executive}
onPress={handleBooking}
leftIcon={<Calendar size={18} color="white" />}
fullWidth
/>
GradientBanner — Screen header
tsx

<GradientBanner colors={GRADIENT_PRESETS.admin} roundedBottom={40}>
  <View className="pt-4 pb-16 px-4 items-center">
    <Text className="text-white text-2xl font-bold">My Profile</Text>
  </View>
</GradientBanner>
GradientBorder — Avatar ring
tsx

<GradientBorder
colors={['#3b82f6', '#8b5cf6', '#ec4899']}
borderRadius={999}
borderWidth={3}

> <Image source={{ uri: avatarUrl }} className="w-20 h-20 rounded-full" />
> </GradientBorder>
> GradientDivider — Section separator
> tsx

<GradientDivider
colors={['transparent', '#8b5cf6', 'transparent']}
height={2}
className="my-6"
/>
GradientIconBadge — Icon container
tsx

<GradientIconBadge colors={GRADIENT_PRESETS.forest} size="md">
  <Compass size={20} color="white" />
</GradientIconBadge>
Animation Technique
All animated components use a dual-gradient overlay approach:

A base gradient renders the primary colors
A reversed gradient overlay on top with animated opacity (0 → 0.3 range) creates the subtle breathing effect
The animation is powered by
useAnimatedGradient
which uses withRepeat + withSequence for smooth infinite loops
This avoids directly animating LinearGradient props (which is unreliable in RN), using only standard Animated.View opacity — guaranteed 60fps.

Verification
✅ TypeScript compilation passes — zero new errors (all existing errors are pre-existing and unrelated)
✅ All components follow existing patterns: TypeScript interfaces, JSDoc with examples, className pass-through, barrel exports
✅ No new dependencies installed
