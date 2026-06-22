import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

interface ControlledInputProps extends Omit<TextInputProps, 'onChangeText'> {
  control: Control<any>;
  name: string;
  label?: string;
  error?: { message?: string } | any;
  required?: boolean;
  leftElement?: React.ReactNode;
  rules?: any;
  allowOnlyDigits?: boolean;
}

export default function ControlledInput({
  control,
  name,
  label,
  error,
  required = false,
  leftElement,
  rules,
  allowOnlyDigits = false,
  ...textInputProps
}: ControlledInputProps) {
  const isMultiline = Boolean(textInputProps.multiline);

  return (
    <View className="mb-5">
      {label && (
        <Text className="text-[11px] font-bold text-text-secondary uppercase mb-2 tracking-wider">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            className={`bg-surface-muted rounded-xl px-4 flex-row ${
              isMultiline ? 'items-start min-h-[112px] py-3' : 'items-center h-14'
            } ${
              error ? 'border border-red-500' : ''
            }`}
          >
            {leftElement}
            <TextInput
              className={`flex-1 text-base text-text-primary ${
                isMultiline ? 'min-h-[88px]' : 'h-full py-0'
              }`}
              style={{
                paddingLeft: leftElement ? 8 : 0,
                paddingTop: isMultiline ? 0 : undefined,
                paddingBottom: isMultiline ? 0 : undefined,
                textAlignVertical: isMultiline ? 'top' : 'center',
              }}
              onBlur={onBlur}
              onChangeText={(text) => {
                const filteredText = allowOnlyDigits ? text.replace(/[^0-9]/g, '') : text;
                onChange(filteredText);
              }}
              value={value?.toString()}
              placeholderTextColor="#9CA3AF"
              {...textInputProps}
            />
          </View>
        )}
      />

      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-1">{error.message}</Text>
      )}
    </View>
  );
}
