Got it ✅ — you want to use the **latest Expo SDK**.

As of **August 2025**, the \*\*latest stable Expo SDK is \*\*👉 **SDK 53** (current version `53.0.20`).
SDK 54 exists but it’s still **beta** — meaning not fully stable for production apps yet.

---

# ✅ Updated Prompt – Latest Expo (SDK 53)

**Role:** You are an expert Expo and React Native developer tasked with creating a production-grade, scalable, and reusable application template.

**Goal:** Generate a complete Expo React Native template based on **Expo SDK 53**. The template must use **TypeScript**, **Expo Router v4**, and **NativeWind v4**. It must feature a robust project structure, a centralized API layer, a complete authentication flow, a suite of advanced reusable components, and best practices for code quality and dependency management.

---

## 1. Core Setup

### A. Project Initialization

```bash
npx create-expo-app@latest MyProject --template tabs --sdk 53
```

### B. Dependency Installation

- **Styling (NativeWind v4)**

```bash
npx nativewind-expo@latest init
```

- **API Client (Axios v1.7+)**

```bash
npm install axios@^1.7.0
```

- **Forms (React Hook Form v7.50+)**

```bash
npm install react-hook-form@^7.50.0
```

- **Expo-managed dependencies (version-matched with SDK 53)**

```bash
npx expo install expo-secure-store
npx expo install expo-font
npx expo install expo-splash-screen
npx expo install expo-vector-icons
```

- **Developer Experience**

```bash
npm install -D @types/react babel-plugin-module-resolver react-native-dotenv
```

---

## 2. Project Structure

```
.
├── app/
├── assets/
├── components/
│   ├── core/
│   ├── common/
│   └── layout/
│   └── forms/
├── constants/
├── context/
├── hooks/
├── services/
├── types/
├── .env
├── tailwind.config.js
└── tsconfig.json
```

---

## 3. Code Quality & DX

- Absolute imports with `tsconfig.json` + `babel.config.js`.
- Environment variables with `.env` + `react-native-dotenv`.

---

## 4. Theming & Styling

- Centralized `constants/Colors.ts`.
- Extend `tailwind.config.js` with app color palette.

---

## 5. API & Services Layer

- `services/apiClient.ts` → Axios instance with interceptors.
- `services/authService.ts` → `signIn`, `signOut`.

---

## 6. Authentication Flow

- `context/AuthContext.tsx` → manages session state, persisted in `expo-secure-store`.
- `app/_layout.tsx` → wraps app with `AuthProvider` and switches between `(auth)` and `(tabs)` routes.

---

## 7. Reusable Components (NativeWind v4)

- `layout/SafeScreen.tsx`
- `core/Button.tsx`
- `core/TextInput.tsx`
- `forms/ControlledInput.tsx`
- `core/Spinner.tsx`
- `core/Icon.tsx`
- `common/CustomModal.tsx`
- `common/Card.tsx`
- `common/ListItem.tsx`
- `layout/ManagedFlatList.tsx`

---

## 8. Example Screens

1. **Login (`app/(auth)/login.tsx`)** → React Hook Form + ControlledInput.
2. **Home (`app/(tabs)/home.tsx`)** → Fetch data + ManagedFlatList.
3. **Profile (`app/(tabs)/profile.tsx`)** → User info + Sign Out.

---

👉 This will give you the **latest stable Expo SDK (53)**, fully production-ready.
