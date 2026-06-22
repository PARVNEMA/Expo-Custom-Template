import React, { useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Control, Controller, FieldError } from 'react-hook-form';
import * as DocumentPicker from 'expo-document-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Upload } from 'lucide-react-native';
import CustomModal from '@/components/ui/CustomModal';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ControlledDocumentPickerProps {
  control: Control<any>;
  name: string;
  label?: string;
  error?: FieldError;
  required?: boolean;
  type?: string | string[];
  allowCamera?: boolean;
  placeholder?: string;
}

export default function ControlledDocumentPicker({
  control,
  name,
  label,
  error,
  required = false,
  type = '*/*', 
  allowCamera = false,
  placeholder = 'Select a File',
}: ControlledDocumentPickerProps) {
  const [sourceModalVisible, setSourceModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  return (
    <View className="mb-5">
      {label && (
        <Text className="text-[11px] font-bold text-text-secondary uppercase mb-2 tracking-wider">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const handlePickDocument = async () => {
            try {
              const result = await DocumentPicker.getDocumentAsync({
                type: type,
                copyToCacheDirectory: true,
              });

              if (!result.canceled && result.assets && result.assets.length > 0) {
                const asset = result.assets[0];
                onChange({
                  uri: asset.uri,
                  name: asset.name,
                  mimeType: asset.mimeType || 'application/octet-stream',
                  size: asset.size
                });
                setSourceModalVisible(false);
              }
            } catch (err) {
              console.log('Error picking document:', err);
            }
          };

          const handleOpenCamera = async () => {
            try {
              const result = permission?.granted ? permission : await requestPermission();
              if (!result.granted) {
                return;
              }

              setSourceModalVisible(false);
              setCameraModalVisible(true);
            } catch (err) {
              console.log('Error requesting camera permission:', err);
            }
          };

          const handleCapturePhoto = async () => {
            try {
              const photo = await cameraRef.current?.takePictureAsync({
                quality: 0.75,
              });

              if (photo?.uri) {
                onChange({
                  uri: photo.uri,
                  name: `receipt-${Date.now()}.jpg`,
                  mimeType: 'image/jpeg',
                  size: undefined,
                });
                setCameraModalVisible(false);
              }
            } catch (err) {
              console.log('Error capturing photo:', err);
            }
          };

          return (
            <View>
              <Pressable
                onPress={() => {
                  if (allowCamera) {
                    setSourceModalVisible(true);
                    return;
                  }

                  handlePickDocument();
                }}
                className={`bg-surface-muted rounded-xl px-4 py-4 border border-dashed items-center justify-center flex-row ${
                  error ? 'border-red-500' : 'border-border'
                }`}
              >
                <Upload size={20} color="#6B7280" style={{ marginRight: 8 }} />
                <Text className="text-text-primary text-sm flex-1" numberOfLines={1}>
                  {value && value.name ? value.name : placeholder}
                </Text>
              </Pressable>

              <CustomModal
                visible={sourceModalVisible}
                onClose={() => setSourceModalVisible(false)}
                title="Select Receipt Source"
              >
                <View className="gap-3">
                  {allowCamera && (
                    <Pressable
                      onPress={handleOpenCamera}
                      className="bg-primary rounded-2xl py-4 items-center"
                    >
                      <Text className="text-white font-bold text-base">Open Camera</Text>
                    </Pressable>
                  )}

                  <Pressable
                    onPress={handlePickDocument}
                    className="bg-surface-muted rounded-2xl py-4 items-center border border-border"
                  >
                    <Text className="text-text-primary font-bold text-base">Select From Files</Text>
                  </Pressable>
                </View>
              </CustomModal>

              <CustomModal
                visible={cameraModalVisible}
                onClose={() => setCameraModalVisible(false)}
                title="Capture Receipt"
                style={{ maxHeight: '100%', minHeight: '100%', flex: 1 }}
              >
                <SafeAreaView style={{ flex: 1, minHeight: 400 }}>
                  <View style={{ flex: 1, borderRadius: 20, overflow: 'hidden' }}>
                    <CameraView
                      ref={cameraRef}
                      style={{ flex: 1 }}
                      facing="back"
                    />
                  </View>

                  <View className="flex-row items-center justify-between mt-4 gap-3">
                    <Pressable
                      onPress={() => setCameraModalVisible(false)}
                      className="flex-1 bg-surface-muted rounded-2xl py-4 items-center border border-border"
                    >
                      <Text className="text-text-primary font-bold">Cancel</Text>
                    </Pressable>
                    <Pressable
                      onPress={handleCapturePhoto}
                      className="flex-1 bg-primary rounded-2xl py-4 items-center"
                    >
                      <Text className="text-white font-bold">Capture</Text>
                    </Pressable>
                  </View>
                </SafeAreaView>
              </CustomModal>
            </View>
          );
        }}
      />

      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-1">{error.message}</Text>
      )}
    </View>
  );
}
