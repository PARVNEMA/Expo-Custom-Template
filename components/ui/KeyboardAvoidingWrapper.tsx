import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ViewProps,
} from 'react-native';

interface KeyboardAvoidingWrapperProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

const KeyboardAvoidingWrapper: React.FC<KeyboardAvoidingWrapperProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // adjust for header height
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss} // 👈 dismiss keyboard when tapping outside
        accessible={false}
      >
        <ScrollView
          className={`flex-1 bg-white ${className || ''}`}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled" // 👈 allow taps when keyboard is open
          showsVerticalScrollIndicator={false}
          {...props}
        >
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
