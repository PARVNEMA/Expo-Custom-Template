import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MessageCircle, Heart, Share, Calendar } from 'lucide-react-native';

import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Post } from '@/types/api.types';

export default function HomeScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [error, seterror] = useState('');

  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    try {
      // const response = await apiService.getPosts();
      const response = { data: [] };
      setPosts(response.data);
    } catch (error) {
      seterror('Error fetching posts');
      console.error('Error fetching posts:', error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, [fetchPosts]);

  const handlePostAction = (action: string, postId: number) => {
    Alert.alert('Action', `${action} post #${postId}`, [{ text: 'OK' }]);
  };

  const renderPost = ({ item }: { item: Post }) => (
    <Card variant="elevated" className="mb-4 mx-4">
      <View className="mb-3">
        <View className="flex-row items-center mb-2">
          <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
            <Text className="text-white font-bold text-sm">#{item.userId}</Text>
          </View>
          <View className="flex-1">
            <Text className="font-semibold text-gray-900">
              User {item.userId}
            </Text>
            <View className="flex-row items-center">
              <Calendar size={12} color="#6B7280" />
              <Text className="text-xs text-gray-500 ml-1">2 hours ago</Text>
            </View>
          </View>
        </View>

        <Text className="text-lg font-semibold text-gray-900 mb-2">
          {item.title}
        </Text>
        <Text className="text-base text-gray-700 leading-6">{item.body}</Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row items-center justify-between pt-3 border-t border-gray-200">
        <TouchableOpacity
          className="flex-row items-center flex-1 justify-center py-2"
          onPress={() => handlePostAction('Like', item.id)}
        >
          <Heart size={18} color="#6B7280" />
          <Text className="text-gray-600 ml-2 font-medium">Like</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center flex-1 justify-center py-2"
          onPress={() => handlePostAction('Comment', item.id)}
        >
          <MessageCircle size={18} color="#6B7280" />
          <Text className="text-gray-600 ml-2 font-medium">Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center flex-1 justify-center py-2"
          onPress={() => handlePostAction('Share', item.id)}
        >
          <Share size={18} color="#6B7280" />
          <Text className="text-gray-600 ml-2 font-medium">Share</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  if (!posts) {
    return <LoadingSpinner fullScreen />;
  }

  if (error && !posts) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center px-6 bg-white">
        <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
          Unable to load posts
        </Text>
        <Text className="text-base text-gray-600 mb-6 text-center">
          {error?.message}
        </Text>
        <Button
          title="Try Again"
          onPress={() => fetchPosts()}
          variant="primary"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}! 👋
        </Text>
        <Text className="text-base text-gray-600 mt-1">
          Here are the latest updates for you
        </Text>
      </View>

      {/* Posts List */}
      <FlatList
        data={posts || []}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3B82F6"
            colors={['#3B82F6']}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-lg font-semibold text-gray-600 mb-2">
              No posts available
            </Text>
            <Text className="text-base text-gray-500 text-center">
              Pull down to refresh and check for new posts
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
