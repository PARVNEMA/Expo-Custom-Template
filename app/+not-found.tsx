import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-xl font-semibold mb-4">This screen doesn't exist.</Text>
        <Link href="/(tabs)/home" className="mt-4 py-4">
          <Text className="text-blue-600 font-medium">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
