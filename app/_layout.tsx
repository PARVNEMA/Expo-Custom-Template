import UpdatePromptModal from '@/components/common/UpdatePromptModal';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../context/AuthContext';
import '../global.css';
import { useFrameworkReady } from '../hooks/useFrameworkReady';
SplashScreen.preventAutoHideAsync();
export const MainLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
     const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  });
     useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) setShowModal(true); // show only when actual update exists
      } catch (err) {
        console.warn("Update check failed", err);
      }
    };

   checkForUpdates()
  }, []);

  // useEffect(() => {
  //   notificationService.initialize().catch(console.error);
  // }, []);
  return (
    <SafeAreaView className="flex-1" edges={['top']}>
       <UpdatePromptModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

// Register Firebase background handler at module level (safe — lazy inside)
// registerBackgroundHandler();

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ErrorBoundary>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </ErrorBoundary>
  );
}
