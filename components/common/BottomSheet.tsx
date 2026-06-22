import { BottomSheet as ExpoBottomSheet, Host, RNHostView } from '@expo/ui';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

type SnapPoint = 'half' | 'full' | 'collapsed';

interface ReusableBottomSheetProps {
  /** Controls whether the sheet is visible */
  isPresented: boolean;
  /** Called when the user dismisses the sheet */
  onDismiss: () => void;
  /** The content to render inside the sheet */
  children: React.ReactNode;
  /** Sheet snap points — defaults to ['half', 'full'] */
  snapPoints?: SnapPoint[];
  /** Extra bottom padding so content clears the home indicator */
  contentPaddingBottom?: number;
}

/**
 * A reusable bottom sheet whose content is always scrollable and
 * stays accessible when the software keyboard is open.
 *
 * Usage:
 *   <Host matchContents>
 *     <ReusableBottomSheet isPresented={open} onDismiss={() => setOpen(false)}>
 *       <Text>Any content here</Text>
 *     </ReusableBottomSheet>
 *   </Host>
 */
export default function ReusableBottomSheet({
  isPresented,
  onDismiss,
  children,
  snapPoints = ['half', 'full'],
  contentPaddingBottom = 24,
}: ReusableBottomSheetProps) {
  return (
    <ExpoBottomSheet
      isPresented={isPresented}
      onDismiss={onDismiss}
      snapPoints={snapPoints}>
      {/* RNHostView bridges Expo UI's native container with RN children */}
      <RNHostView style={styles.hostView}>
        {/*
         * KeyboardAwareScrollView from react-native-keyboard-controller:
         * - Automatically scrolls to the focused input when the keyboard opens
         * - Works correctly inside bottom sheets / modals
         * - bottomOffset gives breathing room above the keyboard
         */}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          bottomOffset={16}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: contentPaddingBottom },
          ]}>
          <View style={styles.innerContent}>{children}</View>
        </KeyboardAwareScrollView>
      </RNHostView>
    </ExpoBottomSheet>
  );
}

// Re-export Host so callers don't need a separate import for it
export { Host };

const styles = StyleSheet.create({
  hostView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContent: {
    flex: 1,
  },
});
