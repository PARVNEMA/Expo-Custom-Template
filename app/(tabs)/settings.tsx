import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Bell,
  Shield,
  Palette,
  Globe,
  CircleHelp as HelpCircle,
  Info,
  ChevronRight,
  Moon,
  Vibrate,
  Lock,
} from 'lucide-react-native';

import Card from '@/components/ui/Card';
import { APP_CONFIG } from '@/config/constants';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  showChevron?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showSwitch = false,
  switchValue = false,
  onSwitchChange,
  showChevron = true,
}) => (
  <TouchableOpacity
    className="flex-row items-center py-4 border-b border-gray-100 last:border-b-0"
    onPress={onPress}
    disabled={showSwitch}
  >
    <View className="mr-3">{icon}</View>
    <View className="flex-1">
      <Text className="text-base font-medium text-gray-900">{title}</Text>
      {subtitle && (
        <Text className="text-sm text-gray-600 mt-1">{subtitle}</Text>
      )}
    </View>
    {showSwitch ? (
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
        thumbColor={switchValue ? '#FFFFFF' : '#FFFFFF'}
      />
    ) : (
      showChevron && <ChevronRight size={20} color="#9CA3AF" />
    )}
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const handleNotificationPress = () => {
    Alert.alert(
      'Notifications',
      'Configure your notification preferences here.',
      [{ text: 'OK' }]
    );
  };

  const handlePrivacyPress = () => {
    Alert.alert(
      'Privacy & Security',
      'Manage your privacy and security settings.',
      [{ text: 'OK' }]
    );
  };

  const handleLanguagePress = () => {
    Alert.alert('Language', 'Select your preferred language.', [
      { text: 'OK' },
    ]);
  };

  const handleThemePress = () => {
    Alert.alert('Theme', 'Customize your app appearance.', [{ text: 'OK' }]);
  };

  const handleHelpPress = () => {
    Alert.alert('Help & Support', 'Get help and support for using the app.', [
      { text: 'OK' },
    ]);
  };

  const handleAboutPress = () => {
    Alert.alert(
      'About',
      `${APP_CONFIG.NAME}\nVersion ${APP_CONFIG.VERSION}\n\nBuilt with Expo and React Native`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">Settings</Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Preferences */}
        <Card variant="elevated" className="m-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Preferences
          </Text>

          <SettingItem
            icon={<Bell size={20} color="#3B82F6" />}
            title="Notifications"
            subtitle="Push notifications and alerts"
            showSwitch
            switchValue={notificationsEnabled}
            onSwitchChange={setNotificationsEnabled}
          />

          <SettingItem
            icon={<Moon size={20} color="#6366F1" />}
            title="Dark Mode"
            subtitle="Toggle dark theme"
            showSwitch
            switchValue={darkMode}
            onSwitchChange={setDarkMode}
          />

          <SettingItem
            icon={<Vibrate size={20} color="#10B981" />}
            title="Vibration"
            subtitle="Haptic feedback"
            showSwitch
            switchValue={vibrationEnabled}
            onSwitchChange={setVibrationEnabled}
          />

          <SettingItem
            icon={<Palette size={20} color="#F59E0B" />}
            title="Theme"
            subtitle="Customize app appearance"
            onPress={handleThemePress}
          />

          <SettingItem
            icon={<Globe size={20} color="#06B6D4" />}
            title="Language"
            subtitle="English (US)"
            onPress={handleLanguagePress}
          />
        </Card>

        {/* Security */}
        <Card variant="elevated" className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Security
          </Text>

          <SettingItem
            icon={<Lock size={20} color="#EF4444" />}
            title="Biometric Authentication"
            subtitle="Use fingerprint or face recognition"
            showSwitch
            switchValue={biometricEnabled}
            onSwitchChange={setBiometricEnabled}
          />

          <SettingItem
            icon={<Shield size={20} color="#8B5CF6" />}
            title="Privacy & Security"
            subtitle="Manage your account security"
            onPress={handlePrivacyPress}
          />
        </Card>

        {/* Support */}
        <Card variant="elevated" className="mx-4 mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Support
          </Text>

          <SettingItem
            icon={<HelpCircle size={20} color="#22C55E" />}
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={handleHelpPress}
          />

          <SettingItem
            icon={<Info size={20} color="#6B7280" />}
            title="About"
            subtitle={`Version ${APP_CONFIG.VERSION}`}
            onPress={handleAboutPress}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
