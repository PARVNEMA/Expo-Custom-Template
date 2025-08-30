import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  User,
  Mail,
  Lock,
  CircleCheck as CheckCircle,
} from 'lucide-react-native';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { RegisterCredentials } from '@/types/auth.types';
import { VALIDATION_RULES } from '@/config/constants';
import KeyboardAvoidingWrapper from '../ui/KeyboardAvoidingWrapper';

const registerSchema = z
  .object({
    name: z
      .string()
      .min(
        VALIDATION_RULES.NAME_MIN_LENGTH,
        `Name must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters`
      )
      .max(
        VALIDATION_RULES.NAME_MAX_LENGTH,
        `Name must be less than ${VALIDATION_RULES.NAME_MAX_LENGTH} characters`
      ),
    email: z
      .string()
      .min(1, 'Email is required')
      .regex(VALIDATION_RULES.EMAIL_REGEX, 'Please enter a valid email'),
    password: z
      .string()
      .min(
        VALIDATION_RULES.PASSWORD_MIN_LENGTH,
        `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

interface RegisterFormProps {
  onSubmit: (data: RegisterCredentials) => Promise<void>;
  loading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleFormSubmit = async (data: RegisterCredentials) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error: any) {
      Alert.alert(
        'Registration Failed',
        error.message || 'An unexpected error occurred. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <KeyboardAvoidingWrapper className="p-4 w-full flex-1">
      <View className="w-full space-y-4">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
              leftIcon={<User size={20} color="#6B7280" />}
              autoCapitalize="words"
              autoComplete="name"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              leftIcon={<Mail size={20} color="#6B7280" />}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              leftIcon={<Lock size={20} color="#6B7280" />}
              secureTextEntry
              autoComplete="password-new"
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirmPassword?.message}
              leftIcon={<CheckCircle size={20} color="#6B7280" />}
              secureTextEntry
              autoComplete="password-new"
            />
          )}
        />

        <View className="pt-2">
          <Button
            title="Create Account"
            onPress={handleSubmit(handleFormSubmit)}
            loading={loading}
            disabled={!isValid}
            fullWidth
          />
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default RegisterForm;
