import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Link, router, useRouter } from 'expo-router';

import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/forms/LoginForm';
import Card from '@/components/ui/Card';
import { LoginCredentials } from '@/types/auth.types';
import { APP_CONFIG } from '@/config/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      await login(credentials);
      router.replace('/(tabs)/home');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-8"
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center mb-4">
              <Text className="text-white text-2xl font-bold">
                {APP_CONFIG.NAME.charAt(0)}
              </Text>
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </Text>
            <Text className="text-base text-gray-600 text-center">
              Sign in to your account to continue
            </Text>
          </View>

          {/* Login Form */}
          <Card variant="elevated" padding="lg">
            <LoginForm onSubmit={handleLogin} loading={isLoading} />
          </Card>

          {/* Register Link */}
          <View className="items-center mt-6">
            <Text className="text-base text-gray-600">
              Don't have an account?{' '}
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity>
                  <Text className="text-blue-600 font-semibold">Sign up</Text>
                </TouchableOpacity>
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
