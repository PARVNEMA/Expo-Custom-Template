# Rule: Modern Styling & Mobile UX Standards

**Scope**: All screens, components, and interactive elements in this project.

> **MANDATORY** — All AI agents and contributors MUST follow this rule without exception.

---

## 1. Touch Targets

Every interactive element (button, pressable, icon button, list row) must meet the **minimum 44 × 44 pt touch target** requirement.

```tsx
// ✅ CORRECT — minimum 44pt touch target
<Pressable className="w-11 h-11 items-center justify-center rounded-full">
  <Icon name="close" size={20} />
</Pressable>

// ❌ FORBIDDEN — icon with no wrapper, tap area is just the icon size
<Icon name="close" size={20} onPress={handleClose} />

// ❌ FORBIDDEN — too small
<Pressable className="w-6 h-6">
  <Icon name="close" size={14} />
</Pressable>
```

---

## 2. Active Feedback

Every pressable element must provide visual feedback on press. Use `active:` NativeWind variants or `Pressable` with `style` callback.

```tsx
// ✅ CORRECT — active state feedback
<Pressable className="bg-primary active:bg-primary-700 rounded-xl px-4 py-3">
  <Text className="text-white font-semibold">Submit</Text>
</Pressable>

// ✅ CORRECT — opacity feedback via disabled/opacity pattern
<TouchableOpacity activeOpacity={0.75} onPress={handlePress}>
  <Text>Tap me</Text>
</TouchableOpacity>

// ❌ FORBIDDEN — no visual feedback
<Pressable onPress={handlePress}>
  <Text>Tap me</Text>
</Pressable>
```

---

## 3. Safe Area Awareness

Every screen must respect safe areas. Use `SafeScreen` (wraps `SafeAreaView` + `KeyboardAvoidingView`) or apply `SafeAreaView` directly.

```tsx
// ✅ CORRECT — use the shared SafeScreen wrapper
import SafeScreen from '@/components/ui/SafeScreen';

export default function MyScreen() {
  return (
    <SafeScreen>
      {/* screen content */}
    </SafeScreen>
  );
}

// ✅ CORRECT — explicit SafeAreaView when SafeScreen doesn't fit
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
  {/* content */}
</SafeAreaView>

// ❌ FORBIDDEN — no safe area handling
<View className="flex-1 bg-background">
  {/* content clips into notch or home indicator */}
</View>
```

---

## 4. Keyboard Avoiding

Any screen with form inputs must handle the software keyboard. Use `KeyboardAvoidingWrapper` or `KeyboardAvoidingView`.

```tsx
// ✅ CORRECT — wrap forms with keyboard avoiding
import KeyboardAvoidingWrapper from '@/components/ui/KeyboardAvoidingWrapper';

<KeyboardAvoidingWrapper>
  <ScrollView>
    <ControlledInput ... />
    <Button ... />
  </ScrollView>
</KeyboardAvoidingWrapper>
```

---

## 5. Elevation & Shadow

Use shadow utilities for elevation cues. Never hardcode `elevation` style or `shadowColor` etc. directly.

```tsx
// ✅ CORRECT — NativeWind shadow utilities
<View className="bg-surface-card rounded-xl shadow-sm p-4">   {/* subtle card */}
<View className="bg-surface-elevated rounded-2xl shadow-md p-6"> {/* modal / sheet */}

// ❌ FORBIDDEN — manual platform shadow
<View style={{ elevation: 4, shadowColor: '#000', shadowOpacity: 0.1 }}>
```

---

## 6. Accessibility Labels

Every interactive element that does not have visible text must have an `accessibilityLabel`:

```tsx
// ✅ CORRECT — icon button with label
<Pressable
  onPress={handleDelete}
  className="w-11 h-11 items-center justify-center"
  accessibilityLabel="Delete post"
  accessibilityRole="button"
>
  <Icon name="trash" size={20} />
</Pressable>

// ❌ FORBIDDEN — icon button with no label (screen readers say "button")
<Pressable onPress={handleDelete}>
  <Icon name="trash" size={20} />
</Pressable>
```

Images that convey meaning must have `accessible` and `accessibilityLabel`:

```tsx
// ✅ CORRECT
<Image source={uri} accessible accessibilityLabel="Profile photo of John Doe" />

// Decorative images — explicitly mark as not accessible
<Image source={decorativeUri} accessible={false} />
```

---

## 7. Typography Hierarchy

Every screen must use a clear typographic hierarchy. The project font scale:

```
Screen title     : text-2xl font-bold text-text-primary
Section header   : text-lg font-semibold text-text-primary
Card title       : text-base font-semibold text-text-primary
Body copy        : text-sm font-normal text-text-secondary
Caption / meta   : text-xs font-normal text-text-muted
Label (form)     : text-[11px] font-bold text-text-secondary uppercase tracking-wider
Error text       : text-xs font-normal text-red-500
```

```tsx
// ✅ CORRECT — clear hierarchy
<Text className="text-2xl font-bold text-text-primary mb-1">Your Posts</Text>
<Text className="text-sm text-text-secondary">Manage your content below</Text>

// ❌ FORBIDDEN — arbitrary sizes with no token basis
<Text style={{ fontSize: 22, color: '#333' }}>Your Posts</Text>
```

---

## 8. Loading & Empty States

Every screen that loads asynchronous data must handle three states:

```tsx
// ✅ CORRECT — handle all three states
if (isLoading) return <LoadingSpinner />;

if (error) return (
  <View className="flex-1 items-center justify-center px-6">
    <Text className="text-text-muted text-base text-center mb-4">
      Failed to load. Please try again.
    </Text>
    <Button title="Retry" onPress={refetch} variant="outline" />
  </View>
);

if (!data || data.length === 0) return (
  <View className="flex-1 items-center justify-center px-6">
    <Text className="text-text-muted text-base text-center">No posts yet.</Text>
  </View>
);

return <FlatList data={data} ... />;

// ❌ FORBIDDEN — rendering empty list with no message, no loading indicator
return <FlatList data={data ?? []} ... />;
```

---

## 9. Checklist Before Committing

- [ ] All interactive elements have ≥ 44 × 44 pt touch target
- [ ] All pressables have `active:` variant or `activeOpacity` feedback
- [ ] All screens use `SafeScreen` or `SafeAreaView`
- [ ] Screens with forms use `KeyboardAvoidingWrapper`
- [ ] Shadows use Tailwind utilities — no manual `elevation` style
- [ ] Icon-only buttons have `accessibilityLabel` and `accessibilityRole="button"`
- [ ] Typography follows the defined hierarchy
- [ ] Loading, error, and empty states all handled
