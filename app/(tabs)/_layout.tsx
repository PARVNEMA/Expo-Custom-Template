import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Tabs } from 'expo-router';
import { useColorScheme, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
          tabBarInactiveTintColor: colorScheme === 'dark' ? '#888888' : '#888888',
          tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
            borderTopWidth: 0,
            height: Platform.OS === 'ios' ? 80 : 60,
            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'settings' : 'settings-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="demo"
          options={{
            title: 'Demo',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'flask' : 'flask-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}