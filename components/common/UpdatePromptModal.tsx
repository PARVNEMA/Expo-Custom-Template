// UpdatePromptModal.tsx
import * as Updates from "expo-updates";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    Pressable,
    Text,
    View,
} from "react-native";

type Props = {
    visible: boolean;
    onClose: () => void;
    /** optional callback when update applied (after reloadAsync resolves it won't run) */
    onError?: (err: Error) => void;
    title?: string;
    message?: string;
};

export default function UpdatePromptModal({
    visible,
    onClose,
    onError,
    title = "Update Available",
    message = "A new version is available. Download and restart now?",
}: Props) {
    const [state, setState] = useState<
        "idle" | "checking" | "downloading" | "ready" | "error"
    >("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleDownload = useCallback(async () => {
        try {
            setErrorMessage(null);
            setState("checking");
            // 1) check for update
            const check = await Updates.checkForUpdateAsync();
            if (!check.isAvailable) {
                setState("idle");
                Alert.alert("No Update", "No update available right now.");
                return;
            }

            // 2) fetch / download update
            setState("downloading");
            // note: fetchUpdateAsync resolves when download finishes. No progress events.
            await Updates.fetchUpdateAsync();

            setState("ready");
            // 3) apply the update by reloading the app
            // reloadAsync will restart the JS runtime.
            // It may throw in some edge cases; catch below.
            await Updates.reloadAsync();

            // if reloadAsync succeeds, app will restart and code below won't run.
        } catch (err: any) {
            setState("error");
            const msg = err?.message ?? String(err);
            setErrorMessage(msg);
            onError?.(err);
            console.warn("Update prompt error:", err);
        }
    }, [onError]); // Only depends on onError

    // Auto-start download when modal becomes visible
    useEffect(() => {
        if (visible && state === "idle") {
            handleDownload();
        }
    }, [visible, state, handleDownload]); // Now includes all dependencies

    const handleCancel = () => {
        setState("idle");
        setErrorMessage(null);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={handleCancel}
        >
            <View className="flex-1 justify-center items-center bg-black/50 p-4">
                <View className="w-full max-w-lg bg-white rounded-2xl p-5 shadow-lg">
                    <Text className="text-lg font-semibold text-gray-900 mb-2">
                        {title}
                    </Text>
                    <Text className="text-sm text-gray-600 mb-4">{message}</Text>

                    {state === "checking" && (
                        <View className="flex-row items-center space-x-3">
                            <ActivityIndicator  size="small" />
                            <Text className="text-sm text-gray-600">
                                Checking for update...
                            </Text>
                        </View>
                    )}

                    {state === "downloading" && (
                        <View className="flex-row items-center space-x-3">
                            <ActivityIndicator  size="small" />
                            <Text className="text-sm text-gray-600">
                                Downloading update. This may take a moment.
                            </Text>
                        </View>
                    )}

                    {state === "ready" && (
                        <View className="flex-row items-center space-x-3">
                            <Text className="text-sm text-green-600">
                                Downloaded. Restarting…
                            </Text>
                            <ActivityIndicator  size="small" />
                        </View>
                    )}

                    {state === "error" && (
                        <>
                            <Text className="text-sm text-red-600 mt-3">
                                Error: {errorMessage}
                            </Text>
                            <View className="flex-row justify-end mt-4 space-x-3">
                                <Pressable
                                    onPress={handleCancel}
                                    className="px-4 py-2 rounded-lg bg-gray-100"
                                >
                                    <Text className="text-gray-700">Close</Text>
                                </Pressable>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
}
