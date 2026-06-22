import { FCMTOKEN_KEY } from '@/config/constants';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import { PermissionsAndroid, Platform } from 'react-native';

/**
 * NotificationService
 * Handles push notification setup, permissions, and FCM token management.
 *
 * Firebase React Native SDK is a native module — it requires a custom dev
 * client build (expo run:android / expo run:ios). It will NOT work in Expo Go.
 * All Firebase calls are therefore lazy and wrapped in try/catch so the app
 * doesn't crash when running in an environment without the native module.
 */

// ---------------------------------------------------------------------------
// Expo local notification handler (works everywhere)
// ---------------------------------------------------------------------------
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        sound: 'default',
        enableVibrate: true,
        showBadge: true,
    }).catch(error => {
        console.error('Error creating notification channel:', error);
    });
}

// ---------------------------------------------------------------------------
// Lazy Firebase helpers — avoids crashing when the native module is absent
// ---------------------------------------------------------------------------

/**
 * Returns the Firebase Messaging instance, or null if the native module is
 * not available (e.g. Expo Go, web, or a build that doesn't include Firebase).
 */
async function getMessagingInstance() {
    try {
        const { getMessaging } = await import('@react-native-firebase/messaging');
        return getMessaging();
    } catch {
        console.warn('[NotificationService] Firebase Messaging native module not available. ' +
            'Run a custom dev client build (expo run:android / expo run:ios).');
        return null;
    }
}

// ---------------------------------------------------------------------------
// Register background handler — called once at app startup from _layout.tsx
// (safe to call; exits silently if Firebase is unavailable)
// ---------------------------------------------------------------------------
export async function registerBackgroundHandler() {
    try {
        const { getMessaging, setBackgroundMessageHandler } =
            await import('@react-native-firebase/messaging');
        const messaging = getMessaging();
        setBackgroundMessageHandler(messaging, async remoteMessage => {
            console.log('[NotificationService] Background message:', remoteMessage);
        });
    } catch {
        // Firebase not available — skip silently
    }
}

// ---------------------------------------------------------------------------
// NotificationService class
// ---------------------------------------------------------------------------
class NotificationService {
    private fcmToken: string | null = null;
    private notificationListener: any = null;
    private responseListener: any = null;

    /**
     * Request notification permissions from the user.
     */
    async requestPermissions(): Promise<boolean> {
        try {
            if (Platform.OS === 'android') {
                if (Platform.Version >= 33) {
                    const result = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
                    );
                    if (result !== PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('[NotificationService] Android notification permission denied');
                        return false;
                    }
                }
            } else if (Platform.OS === 'ios') {
                const messaging = await getMessagingInstance();
                if (messaging) {
                    const { requestPermission, AuthorizationStatus } =
                        await import('@react-native-firebase/messaging');
                    const authStatus = await requestPermission(messaging);
                    const enabled =
                        authStatus === AuthorizationStatus.AUTHORIZED ||
                        authStatus === AuthorizationStatus.PROVISIONAL;
                    if (!enabled) {
                        console.log('[NotificationService] iOS notification permission denied');
                        return false;
                    }
                }
            }

            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                console.log('[NotificationService] Expo notification permission denied');
                return false;
            }

            console.log('[NotificationService] Permissions granted');
            return true;
        } catch (error) {
            console.error('[NotificationService] Error requesting permissions:', error);
            return false;
        }
    }

    /**
     * Get the FCM push token, requesting permissions and caching as needed.
     */
    async getFCMToken(): Promise<string | null> {
        try {
            if (this.fcmToken) return this.fcmToken;

            const storedToken = await SecureStore.getItemAsync(FCMTOKEN_KEY);
            if (storedToken) {
                this.fcmToken = storedToken;
                return storedToken;
            }

            const messaging = await getMessagingInstance();
            if (!messaging) return null;

            const hasPermission = await this.requestPermissions();
            if (!hasPermission) {
                console.log('[NotificationService] Cannot get FCM token without permissions');
                return null;
            }

            const { getToken } = await import('@react-native-firebase/messaging');
            const token = await getToken(messaging);
            if (token) {
                this.fcmToken = token;
                await SecureStore.setItemAsync(FCMTOKEN_KEY, token);
                console.log('[NotificationService] FCM token obtained:', token);
                return token;
            }

            return null;
        } catch (error) {
            console.error('[NotificationService] Error getting FCM token:', error);
            return null;
        }
    }

    /**
     * Initialize all notification listeners. Call once from your root layout.
     */
    async initialize(): Promise<void> {
        try {
            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'Default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                    sound: 'default',
                    enableVibrate: true,
                    showBadge: true,
                });
            }

            await this.requestPermissions();
            await this.getFCMToken();

            const messaging = await getMessagingInstance();

            if (messaging) {
                const {
                    onTokenRefresh,
                    onNotificationOpenedApp,
                    getInitialNotification,
                    onMessage,
                } = await import('@react-native-firebase/messaging');

                onTokenRefresh(messaging, async token => {
                    console.log('[NotificationService] Token refreshed:', token);
                    this.fcmToken = token;
                    await SecureStore.setItemAsync(FCMTOKEN_KEY, token);
                });

                onNotificationOpenedApp(messaging, remoteMessage => {
                    console.log('[NotificationService] App opened from background notification:', remoteMessage);
                    // TODO: navigate based on remoteMessage.data
                });

                getInitialNotification(messaging).then(remoteMessage => {
                    if (remoteMessage) {
                        console.log('[NotificationService] App opened from quit-state notification:', remoteMessage);
                        // TODO: navigate based on remoteMessage.data
                    }
                });

                onMessage(messaging, async remoteMessage => {
                    console.log('[NotificationService] Foreground FCM message:', remoteMessage);
                    if (remoteMessage.notification) {
                        await Notifications.scheduleNotificationAsync({
                            content: {
                                title: remoteMessage.notification.title ?? 'New Notification',
                                body: remoteMessage.notification.body ?? '',
                                data: remoteMessage.data ?? {},
                                sound: 'default',
                            },
                            trigger: null,
                        });
                    }
                });
            }

            // Expo local notification listeners
            this.notificationListener = Notifications.addNotificationReceivedListener(
                _notification => {
                    // Handle foreground local notification display if needed
                }
            );

            this.responseListener = Notifications.addNotificationResponseReceivedListener(
                response => {
                    console.log('[NotificationService] Notification tapped:', response);
                    // TODO: navigate based on response.notification.request.content.data
                }
            );

            console.log('[NotificationService] Initialized successfully');
        } catch (error) {
            console.error('[NotificationService] Initialization error:', error);
        }
    }

    /**
     * Remove all listeners. Call on logout or app teardown.
     */
    cleanup(): void {
        this.notificationListener?.remove();
        this.responseListener?.remove();
    }

    /**
     * Delete the FCM token from Firebase and local storage (use on logout).
     */
    async deleteFCMToken(): Promise<void> {
        try {
            const messaging = await getMessagingInstance();
            if (messaging) {
                const { deleteToken } = await import('@react-native-firebase/messaging');
                await deleteToken(messaging);
            }
            await SecureStore.deleteItemAsync(FCMTOKEN_KEY);
            this.fcmToken = null;
            console.log('[NotificationService] FCM token deleted');
        } catch (error) {
            console.error('[NotificationService] Error deleting FCM token:', error);
        }
    }

    /**
     * Return the cached/stored token without requesting a new one.
     */
    async getStoredFCMToken(): Promise<string | null> {
        try {
            if (this.fcmToken) return this.fcmToken;
            const token = await SecureStore.getItemAsync(FCMTOKEN_KEY);
            if (token) this.fcmToken = token;
            return token;
        } catch (error) {
            console.error('[NotificationService] Error reading stored token:', error);
            return null;
        }
    }

    /**
     * Schedule an immediate local notification (useful for testing).
     */
    async sendTestNotification(): Promise<void> {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Test Notification',
                    body: 'If you see this, notifications are working!',
                    data: { test: true },
                    sound: 'default',
                },
                trigger: null,
            });
            console.log('[NotificationService] Test notification sent');
        } catch (error) {
            console.error('[NotificationService] Error sending test notification:', error);
        }
    }
}

export const notificationService = new NotificationService();
export default NotificationService;
