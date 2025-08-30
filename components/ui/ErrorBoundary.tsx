import React, { Component, ReactNode } from 'react';
import { View, Text } from 'react-native';
import Button from '@/components/ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View className="flex-1 justify-center items-center px-6 bg-white">
          <View className="items-center">
            <Text className="text-6xl mb-4">🐛</Text>
            <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
              Oops! Something went wrong
            </Text>
            <Text className="text-base text-gray-600 mb-6 text-center">
              We encountered an unexpected error. Please try again.
            </Text>
            <Button
              title="Try Again"
              onPress={this.handleReset}
              variant="primary"
            />
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
