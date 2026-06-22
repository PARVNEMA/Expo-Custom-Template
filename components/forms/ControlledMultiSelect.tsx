import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Control,
  Controller,
} from 'react-hook-form';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export interface MultiSelectOption {
  label: string;
  value: number;
  description?: string;
}

interface ControlledMultiSelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  error?: { message?: string } | any;
  required?: boolean;
  options: MultiSelectOption[];
  placeholder?: string;
  emptyStateLabel?: string;
}

export default function ControlledMultiSelect({
  control,
  name,
  label,
  error,
  required = false,
  options,
  placeholder = 'Select options',
  emptyStateLabel = 'No items available',
}: ControlledMultiSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <View className="mb-5">
      {label && (
        <Text className="mb-2 text-[11px] font-bold uppercase tracking-wider text-text-secondary">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const selectedValues = Array.isArray(value)
            ? value.map((item) => Number(item))
            : [];

          const selectedItems = options.filter((option) =>
            selectedValues.includes(option.value)
          );

          const toggleOption = (itemValue: number) => {
            if (selectedValues.includes(itemValue)) {
              onChange(selectedValues.filter((current) => current !== itemValue));
              return;
            }

            onChange([...selectedValues, itemValue]);
          };

          return (
            <>
              <Pressable
                onPress={() => setOpen(true)}
                className={`flex-row items-center justify-between rounded-xl bg-surface-muted px-4 py-4 ${
                  error ? 'border border-red-500' : ''
                }`}
              >
                <View className="flex-1 pr-3">
                  <Text
                    className={`text-base font-medium ${
                      selectedItems.length > 0
                        ? 'text-text-primary'
                        : 'text-[#9CA3AF]'
                    }`}
                    numberOfLines={1}
                  >
                    {selectedItems.length > 0
                      ? `${selectedItems.length} selected`
                      : placeholder}
                  </Text>
                  {selectedItems.length > 0 && (
                    <Text
                      className="mt-1 text-xs text-text-secondary"
                      numberOfLines={1}
                    >
                      {selectedItems.slice(0, 2).map((item) => item.label).join(', ')}
                      {selectedItems.length > 2
                        ? ` +${selectedItems.length - 2} more`
                        : ''}
                    </Text>
                  )}
                </View>
                <Ionicons name="chevron-down" size={18} color="#6B7280" />
              </Pressable>

              {selectedItems.length > 0 && (
                <View className="mt-3 flex-row flex-wrap">
                  {selectedItems.map((item) => (
                    <View
                      key={item.value}
                      className="mr-2 mb-2 rounded-full bg-primary-light px-3 py-1.5"
                    >
                      <Text className="text-xs font-semibold text-primary">
                        {item.label}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <Modal visible={open} transparent animationType="slide">
                <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                  <View className="flex-1 justify-end bg-black/50">
                    <TouchableWithoutFeedback>
                      <View className="max-h-[80%] min-h-[50%] rounded-t-3xl bg-white">
                        <View className="flex-row items-center justify-between border-b border-border px-5 py-4">
                          <Text className="text-lg font-bold text-text-primary">
                            {label ? `Select ${label.toLowerCase()}` : 'Select options'}
                          </Text>
                          <Pressable onPress={() => setOpen(false)} className="p-1">
                            <Ionicons name="close" size={24} color="#6B7280" />
                          </Pressable>
                        </View>

                        {options.length === 0 ? (
                          <View className="items-center justify-center px-6 py-10">
                            <Text className="text-sm text-text-secondary">
                              {emptyStateLabel}
                            </Text>
                          </View>
                        ) : (
                          <FlatList
                            data={options}
                            keyExtractor={(item) => item.value.toString()}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            renderItem={({ item }) => {
                              const isSelected = selectedValues.includes(item.value);

                              return (
                                <Pressable
                                  onPress={() => toggleOption(item.value)}
                                  className={`flex-row items-center justify-between border-b border-border px-5 py-4 ${
                                    isSelected ? 'bg-primary-light/10' : ''
                                  }`}
                                >
                                  <View className="flex-1 pr-3">
                                    <Text
                                      className={`text-base ${
                                        isSelected
                                          ? 'font-bold text-primary'
                                          : 'text-text-primary'
                                      }`}
                                    >
                                      {item.label}
                                    </Text>
                                    {item.description ? (
                                      <Text className="mt-1 text-xs text-text-secondary">
                                        {item.description}
                                      </Text>
                                    ) : null}
                                  </View>
                                  <View
                                    className={`h-6 w-6 items-center justify-center rounded-full border ${
                                      isSelected
                                        ? 'border-primary bg-primary'
                                        : 'border-border bg-white'
                                    }`}
                                  >
                                    {isSelected ? (
                                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                                    ) : null}
                                  </View>
                                </Pressable>
                              );
                            }}
                          />
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </>
          );
        }}
      />

      {error && (
        <Text className="ml-1 mt-1 text-xs text-red-500">{error.message}</Text>
      )}
    </View>
  );
}
