import React from 'react';
import {
  FlatList,
  FlatListProps,
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

interface ManagedFlatListProps<T> extends Omit<FlatListProps<T>, 'refreshControl'> {
  data: T[];
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  onRetry?: () => void;
  emptyMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
  renderItem: (item: { item: T; index: number }) => React.ReactElement;
}

export default function ManagedFlatList<T>({
  data,
  loading = false,
  error = null,
  onRefresh,
  onRetry,
  emptyMessage = 'No items found',
  loadingMessage = 'Loading...',
  errorMessage = 'Something went wrong',
  renderItem,
  ...flatListProps
}: ManagedFlatListProps<T>) {
  if (loading && data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-2">{loadingMessage}</Text>
      </View>
    );
  }

  if (error && data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-600 text-center mb-4">{errorMessage}</Text>
        {onRetry && (
          <Text className="text-blue-600 underline" onPress={onRetry}>
            Tap to retry
          </Text>
        )}
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-gray-600 text-center">{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={['#3B82F6']}
            tintColor="#3B82F6"
          />
        ) : undefined
      }
      {...flatListProps}
    />
  );
}
