import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    // ThemeProvider fixes iOS 26 white flash on tab switch + liquid glass dark-mode flicker
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NativeTabs
        // Collapses the tab bar as user scrolls down (iOS 26+)
        minimizeBehavior="onScrollDown"
        // Prevents transparent tab bar at scroll edges (important if using FlatList)
        // disableTransparentOnScrollEdge
      >
        {/* ── Home ─────────────────────────────────────────────── */}
        <NativeTabs.Trigger name="home">
          <NativeTabs.Trigger.Icon
            sf={{ default: 'house', selected: 'house.fill' }}
            md={{ default: 'home', selected: 'home_filled' }}
          />
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>

        {/* ── Explore ───────────────────────────────────────────── */}
        <NativeTabs.Trigger name="settings">
          <NativeTabs.Trigger.Icon
            sf={{ default: 'safari', selected: 'safari.fill' }}
            md={{ default: 'explore', selected: 'explore' }}
          />
          <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>

        {/* ── Notifications ─────────────────────────────────────── */}
        <NativeTabs.Trigger name="demo">
          <NativeTabs.Trigger.Icon
            sf={{ default: 'bell', selected: 'bell.fill' }}
            md={{ default: 'notifications', selected: 'notifications_filled' }}
          />
          <NativeTabs.Trigger.Label>Notifications</NativeTabs.Trigger.Label>
          {/* Swap to <NativeTabs.Trigger.Badge>3</NativeTabs.Trigger.Badge> for a count */}
          {/* Use <NativeTabs.Trigger.Badge /> (no children) for a dot badge */}
        </NativeTabs.Trigger>

        {/* ── Profile ───────────────────────────────────────────── */}
        <NativeTabs.Trigger name="profile">
          <NativeTabs.Trigger.Icon
            sf={{ default: 'person', selected: 'person.fill' }}
            md={{ default: 'person', selected: 'person_filled' }}
          />
          <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}