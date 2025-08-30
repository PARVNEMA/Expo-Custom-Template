import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  CreditCard as Edit3,
  Mail,
  Calendar,
  MapPin,
  Award,
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react-native';

import { useAuth } from '@/context/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            setIsLoading(true);
            await logout();
          } catch (error: any) {
            Alert.alert('Error', error.message);
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile functionality would go here');
  };

  const stats = [
    { label: 'Posts', value: '12' },
    { label: 'Followers', value: '1.2k' },
    { label: 'Following', value: '89' },
  ];

  const menuItems = [
    {
      icon: <Edit3 size={20} color="#6B7280" />,
      title: 'Edit Profile',
      onPress: handleEditProfile,
    },
    {
      icon: <SettingsIcon size={20} color="#6B7280" />,
      title: 'Account Settings',
      onPress: () => Alert.alert('Settings', 'Settings would open here'),
    },
    {
      icon: <Award size={20} color="#6B7280" />,
      title: 'Achievements',
      onPress: () =>
        Alert.alert('Achievements', 'Your achievements would be shown here'),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">Profile</Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Card variant="elevated" className="m-4">
          <View className="items-center">
            {/* Profile Picture */}
            <View className="relative mb-4">
              {user?.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center">
                  <Text className="text-white text-2xl font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200"
                onPress={handleEditProfile}
              >
                <Edit3 size={16} color="#3B82F6" />
              </TouchableOpacity>
            </View>

            {/* User Info */}
            <Text className="text-xl font-bold text-gray-900 mb-1">
              {user?.name}
            </Text>

            <View className="flex-row items-center mb-4">
              <Mail size={14} color="#6B7280" />
              <Text className="text-sm text-gray-600 ml-1">{user?.email}</Text>
            </View>

            {/* Stats */}
            <View className="flex-row w-full justify-around py-4 border-t border-gray-200">
              {stats.map((stat, index) => (
                <View key={index} className="items-center">
                  <Text className="text-xl font-bold text-gray-900">
                    {stat.value}
                  </Text>
                  <Text className="text-sm text-gray-600">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>

        {/* Account Details */}
        <Card variant="elevated" className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Account Details
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center">
              <Calendar size={16} color="#6B7280" />
              <Text className="text-base text-gray-700 ml-3">
                Joined{' '}
                {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </Text>
            </View>

            <View className="flex-row items-center">
              <MapPin size={16} color="#6B7280" />
              <Text className="text-base text-gray-700 ml-3">
                San Francisco, CA
              </Text>
            </View>

            <View className="flex-row items-center">
              <Award size={16} color="#6B7280" />
              <Text className="text-base text-gray-700 ml-3">
                {user?.role === 'admin' ? 'Administrator' : 'Member'}
              </Text>
            </View>
          </View>
        </Card>

        {/* Menu Items */}
        <Card variant="elevated" className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </Text>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center py-3 border-b border-gray-100 last:border-b-0"
              onPress={item.onPress}
            >
              <View className="mr-3">{item.icon}</View>
              <Text className="flex-1 text-base text-gray-700">
                {item.title}
              </Text>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Logout Button */}
        <View className="mx-4">
          <Button
            title="Sign Out"
            variant="outline"
            onPress={handleLogout}
            loading={isLoading}
            leftIcon={<LogOut size={18} color="#EF4444" />}
            fullWidth
            className="border-red-500"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
