# Bolt Expo Starter

A production-grade, scalable, and reusable Expo React Native template built with the latest technologies and best practices.

## 🚀 Features

- **Expo SDK 56** - Latest stable version with cutting-edge features
- **TypeScript** - Full type safety and better developer experience
- **Expo Router v4** - File-based routing with type-safe navigation
- **NativeWind v4** - Tailwind CSS for React Native
- **React Hook Form** - Performant forms with validation
- **Axios** - Robust HTTP client with interceptors
- **Authentication Flow** - Complete sign-in/sign-out with secure storage
- **Modern Architecture** - Clean project structure with separation of concerns

## 📱 Supported Platforms

- iOS (including iPad)
- Android
- Web

## 🛠 Tech Stack

- **Framework**: Expo SDK 56
- **Language**: TypeScript
- **Navigation**: Expo Router v4
- **Styling**: NativeWind v4 (Tailwind CSS)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **State Management**: React Context
- **Storage**: Expo Secure Store
- **Icons**: Lucide React Native
- **UI Components**: Custom Reusable component library

## 📁 Project Structure

```
.
├── app/                    # Expo Router app directory
│   ├── (auth)/            # Authentication routes
│   ├── (tabs)/            # Main app tabs
│   ├── _layout.tsx        # Root layout
│   └── +not-found.tsx     # 404 page
├── assets/                # Static assets (images, fonts)
├── components/            # Reusable components
│   ├── ui/               # Core UI components
│   └── forms/            # Form components
├── context/               # React Context providers
│   └── AuthContext.tsx   # Authentication context
├── services/              # API and business logic
│   ├── api.service.ts    # HTTP client configuration
│   └── auth.service.ts   # Authentication service
├── types/                 # TypeScript type definitions
├── hooks/                 # Custom React hooks
└── config/               # Configuration files
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bolt-expo-starter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Run on your preferred platform**
   - **iOS**: Press `i` in the terminal or scan QR code with Expo Go
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go
   - **Web**: Press `w` in the terminal

## 📋 Available Scripts

- `npm run dev` - Start the development server
- `npm run build:web` - Build for web platform
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
API_BASE_URL=your_api_base_url
API_KEY=your_api_key
```

### Tailwind Configuration

The project uses NativeWind v4 with a custom Tailwind configuration. You can extend the theme in `tailwind.config.js`.

## 🏗 Architecture

### Authentication Flow

The app implements a complete authentication flow:

1. **AuthContext** - Manages authentication state
2. **Secure Storage** - Persists user sessions
3. **Protected Routes** - Automatic redirection based on auth status
4. **API Integration** - Secure API calls with authentication headers

### API Layer

- **Centralized HTTP Client** - Configured with interceptors
- **Error Handling** - Consistent error management
- **Request/Response Logging** - Development debugging
- **Authentication Headers** - Automatic token injection

### Component Architecture

- **Reusable Components** - Modular and composable
- **Type Safety** - Full TypeScript support
- **Consistent Styling** - NativeWind utility classes
- **Form Integration** - React Hook Form compatibility

## 🎨 Styling

This project uses **NativeWind v4** (Tailwind CSS for React Native) for styling:

- Utility-first CSS framework
- Responsive design support
- Dark mode compatibility
- Custom theme extensions

### Example Usage

```tsx
import { View, Text } from 'react-native';

export function MyComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-lg font-semibold text-gray-900 dark:text-white">
        Hello World
      </Text>
    </View>
  );
}
```

## 📱 Navigation

The app uses **Expo Router v4** for navigation:

- File-based routing
- Type-safe navigation
- Deep linking support
- Tab navigation
- Stack navigation

### Route Structure

```
app/
├── (auth)/          # Authentication group
│   ├── login.tsx    # Login screen
│   └── register.tsx # Registration screen
├── (tabs)/          # Main app tabs
│   ├── home.tsx     # Home tab
│   ├── profile.tsx  # Profile tab
│   └── settings.tsx # Settings tab
└── _layout.tsx      # Root layout
```

## 🔐 Authentication

The authentication system includes:

- **Login/Logout** functionality
- **Session persistence** with Expo Secure Store
- **Protected routes** with automatic redirection
- **Token management** for API requests
- **Error handling** for auth failures

## 📊 State Management

- **React Context** for global state
- **Local state** with React hooks
- **Form state** with React Hook Form
- **Async state** with custom hooks

## 🧪 Testing

The project is set up for testing with:

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting

## 📦 Dependencies

### Core Dependencies

- `expo` - React Native framework
- `expo-router` - File-based routing
- `react-native` - React Native core
- `nativewind` - Tailwind CSS for React Native
- `react-hook-form` - Form management
- `axios` - HTTP client
- `zod` - Schema validation

### Expo Dependencies

- `expo-secure-store` - Secure storage
- `expo-font` - Custom fonts
- `expo-splash-screen` - Splash screen
- `expo-constants` - App constants
- `expo-linking` - Deep linking
- `expo-web-browser` - Web browser integration

## 🤝 Contributing

Please Help us by contributing to our repo

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Expo documentation](https://docs.expo.dev/)
2. Review the [React Native documentation](https://reactnative.dev/)
3. Search existing issues in the repository
4. Create a new issue with detailed information

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [NativeWind](https://www.nativewind.dev/) for Tailwind CSS support
- [React Hook Form](https://react-hook-form.com/) for form management
- [Lucide](https://lucide.dev/) for beautiful icons

---

Made with ❤️ using Expo SDK 53
