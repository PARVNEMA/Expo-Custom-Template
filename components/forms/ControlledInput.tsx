import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Control, Controller, FieldError } from 'react-hook-form';

interface ControlledInputProps extends Omit<TextInputProps, 'onChangeText'> {
  control: Control<any>;
  name: string;
  label?: string;
  error?: FieldError;
  required?: boolean;
}

export default function ControlledInput({
  control,
  name,
  label,
  error,
  required = false,
  ...textInputProps
}: ControlledInputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={`border rounded-lg px-3 py-2 text-base ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...textInputProps}
          />
        )}
      />

      {error && (
        <Text className="text-red-500 text-sm mt-1">{error.message}</Text>
      )}
    </View>
  );
}
