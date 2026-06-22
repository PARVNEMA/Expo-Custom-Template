import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { FlatList, Modal, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';

export interface SelectOption {
  label: string;
  value: string | number;
  description?: string;
}

interface ControlledSelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  error?: FieldError;
  required?: boolean;
  options: Array<string | SelectOption>;
  placeholder?: string;
  emptyStateLabel?: string;
  disabled?: boolean;
  rules?: any;
}

export default function ControlledSelect({
  control,
  name,
  label,
  error,
  required = false,
  options,
  placeholder = "Select an option",
  emptyStateLabel = "No options available",
  disabled = false,
  rules,
}: ControlledSelectProps) {
  const [open, setOpen] = useState(false);
  const normalizedOptions = useMemo<SelectOption[]>(
    () =>
      options.map((option) =>
        typeof option === 'string'
          ? { label: option, value: option }
          : option
      ),
    [options]
  );

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
        render={({ field: { onChange, value } }) => (
          <>
            <Pressable
              onPress={() => setOpen(true)}
              disabled={disabled}
              className={`bg-surface-muted rounded-xl px-4 min-h-14 flex-row items-center justify-between ${
                error ? 'border border-red-500' : ''
              }`}
              style={{ opacity: disabled ? 0.6 : 1 }}
            >
              <View className="flex-1 pr-3">
                <Text className={`text-base ${value !== undefined && value !== null && value !== '' ? "text-text-primary" : "text-[#9CA3AF]"}`}>
                  {normalizedOptions.find((item) => item.value === value)?.label || placeholder}
                </Text>
                {value !== undefined && value !== null && value !== '' && normalizedOptions.find((item) => item.value === value)?.description ? (
                  <Text className="mt-1 text-xs text-text-secondary">
                    {normalizedOptions.find((item) => item.value === value)?.description}
                  </Text>
                ) : null}
              </View>
              {!disabled && (
                 <Ionicons
                  name="chevron-down"
                  size={18}
                  color="#6B7280"
              />
              )}
             
            </Pressable>

            <Modal visible={open} transparent animationType="slide">
              <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                <View className="flex-1 bg-black/50 justify-end">
                  <TouchableWithoutFeedback>
                    <View className="bg-white rounded-t-3xl max-h-[70%] min-h-[50%]">
                      <View className="flex-row justify-between items-center px-5 py-4 border-b border-border">
                        <Text className="text-lg font-bold text-text-primary">
                            {label ? `Select ${label.toLowerCase()}` : 'Select an option'}
                        </Text>
                        <Pressable onPress={() => setOpen(false)} className="p-1">
                           <Ionicons name="close" size={24} color="#6B7280" />
                        </Pressable>
                      </View>
                      {normalizedOptions.length === 0 ? (
                        <View className="items-center justify-center px-6 py-10">
                          <Text className="text-sm text-text-secondary">
                            {emptyStateLabel}
                          </Text>
                        </View>
                      ) : (
                        <FlatList
                          data={normalizedOptions}
                          keyExtractor={(item) => item.value.toString()}
                          renderItem={({ item }) => (
                            <Pressable
                              onPress={() => {
                                onChange(item.value);
                                setOpen(false);
                              }}
                              className={`px-5 py-4 border-b border-border flex-row items-center justify-between ${
                                item.value === value ? 'bg-primary-light/10' : ''
                              }`}
                            >
                              <View className="flex-1 pr-3">
                                <Text className={`text-base ${item.value === value ? 'text-primary font-bold' : 'text-text-primary'}`}>
                                  {item.label}
                                </Text>
                                {item.description ? (
                                  <Text className="mt-1 text-xs text-text-secondary">
                                    {item.description}
                                  </Text>
                                ) : null}
                              </View>
                              {item.value === value && (
                                  <Ionicons name="checkmark" size={20} color="#2A7DD1" />
                              )}
                            </Pressable>
                          )}
                          contentContainerStyle={{ paddingBottom: 20 }}
                        />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </>
        )}
      />

      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-1">{error.message}</Text>
      )}
    </View>
  );
}
