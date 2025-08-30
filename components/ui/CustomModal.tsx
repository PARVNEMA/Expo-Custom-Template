import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  showCloseButton?: boolean;
}

export default function CustomModal({
  visible,
  onClose,
  title,
  children,
  style,
  titleStyle,
  showCloseButton = true,
}: CustomModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="bg-white rounded-lg p-6 w-full max-w-sm" style={style}>
          {(title || showCloseButton) && (
            <View className="flex-row justify-between items-center mb-4">
              {title && (
                <Text className="text-lg font-semibold text-gray-900" style={titleStyle}>
                  {title}
                </Text>
              )}
              {showCloseButton && (
                <TouchableOpacity
                  onPress={onClose}
                  className="p-2 -m-2"
                >
                  <Text className="text-gray-500 text-lg">×</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
}
