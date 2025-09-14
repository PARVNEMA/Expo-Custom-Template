import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Link, router, useRouter } from 'expo-router';

import { useAuth } from '@/context/AuthContext';
import RegisterForm from '@/components/forms/RegisterForm';
import Card from '@/components/ui/Card';
import { RegisterCredentials } from '@/types/auth.types';
import { APP_CONFIG } from '@/config/constants';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      await register(credentials);
      router.replace('/(tabs)/home');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-green-50 to-green-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-8"
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-16 h-16 bg-green-600 rounded-full items-center justify-center mb-4">
              <Text className="text-white text-2xl font-bold">
                {APP_CONFIG.NAME.charAt(0)}
              </Text>
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </Text>
            <Text className="text-base text-gray-600 text-center">
              Join us to get started with your journey
            </Text>
          </View>

          {/* Register Form */}
          <Card variant="elevated" padding="lg">
            <RegisterForm onSubmit={handleRegister} loading={isLoading} />
          </Card>

          {/* Login Link */}
          <View className="items-center mt-6">
            <Text className="text-base text-gray-600">
              Already have an account?{' '}
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text className="text-green-600 font-semibold">Sign in</Text>
                </TouchableOpacity>
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
