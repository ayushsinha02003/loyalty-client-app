import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, CameraType } from 'react-native-camera-kit';
import {
  ArrowLeft,
  CameraOff,
  Flashlight,
  FlashlightOff,
  Keyboard,
} from 'lucide-react-native';
import { qrApi } from '../../services/api';
import { invalidateCustomerQueries } from '../../services/queryClient';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

interface BarcodeReadEvent {
  nativeEvent: {
    codeStringValue: string;
  };
}

interface ScanResultData {
  businessName: string;
  stampsEarned: number;
  currentStamps: number;
  totalStamps: number;
}

interface QrScannerScreenProps {
  onBack?: () => void;
  onScanSuccess?: (data?: ScanResultData) => void;
  onEnterCode?: () => void;
  onGallerySelect?: () => void;
}

export default function QrScannerScreen({
  onBack,
  onScanSuccess,
}: QrScannerScreenProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [torchOn, setTorchOn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [loading, setLoading] = useState(false);

  const isProcessingRef = useRef(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission Needed',
            message:
              'LoyaltyApp needs camera access to scan business QR codes and award your stamps.',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'Grant Permission',
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err: any) {
        console.warn('Failed to request camera permission:', err);
        setHasPermission(false);
      }
    } else {
      setHasPermission(true);
    }
  };

  const handleScanCode = async (codeToScan: string) => {
    const trimmed = codeToScan.trim();
    if (!trimmed) {
      Alert.alert('Required', 'Please enter a valid QR code');
      return;
    }

    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setLoading(true);

    try {
      const response = await qrApi.scan(trimmed);
      if (response.success) {
        invalidateCustomerQueries().catch(() => {});
        const customerCard = response.data?.customerCard || response.customerCard;
        const stampsEarned =
          response.data?.stampsEarned ?? response.stampsEarned ?? 1;
        const businessName =
          customerCard?.loyaltyCard?.business?.businessName ||
          customerCard?.loyaltyCard?.title ||
          'Loyalty Store';
        const currentStamps = customerCard?.currentStamps || 1;
        const totalStamps = customerCard?.loyaltyCard?.totalStamps || 10;

        setModalVisible(false);
        onScanSuccess?.({
          businessName,
          stampsEarned,
          currentStamps,
          totalStamps,
        });
      } else {
        Alert.alert(
          'Scan Result',
          response.message || 'Invalid or expired QR code',
          [
            {
              text: 'OK',
              onPress: () => {
                isProcessingRef.current = false;
              },
            },
          ]
        );
      }
    } catch (err: any) {
      Alert.alert('Scan Failed', err.message || 'Could not process QR code', [
        {
          text: 'OK',
          onPress: () => {
            isProcessingRef.current = false;
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onBarcodeRead = (event: BarcodeReadEvent) => {
    const scanned = event.nativeEvent.codeStringValue;
    if (scanned && !isProcessingRef.current && !loading) {
      handleScanCode(scanned);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={PALETTE.surfaceContrast}
      />

      {hasPermission && !cameraError ? (
        <Camera
          style={StyleSheet.absoluteFill}
          cameraType={CameraType.Back}
          scanBarcode={true}
          onReadCode={onBarcodeRead}
          torchMode={torchOn ? 'on' : 'off'}
          onError={(err: any) => {
            console.warn('Camera kit error:', err);
            setCameraError(err?.nativeEvent?.errorMessage || 'Camera unavailable');
          }}
        />
      ) : (
        <View style={styles.fallbackBackdrop} />
      )}

      <SafeAreaView style={styles.overlay} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.iconButton}
            activeOpacity={0.75}
            accessibilityLabel="Back"
          >
            <ArrowLeft size={20} strokeWidth={2} color={PALETTE.surface} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Scan QR Code</Text>

          <TouchableOpacity
            onPress={() => setTorchOn(!torchOn)}
            style={[styles.iconButton, torchOn && styles.iconButtonActive]}
            activeOpacity={0.75}
            accessibilityLabel="Toggle flashlight"
          >
            {torchOn ? (
              <Flashlight size={20} strokeWidth={2} color={PALETTE.surface} />
            ) : (
              <FlashlightOff size={20} strokeWidth={2} color={PALETTE.surface} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.centerContainer}>
          {hasPermission === false || cameraError ? (
            <View style={styles.permissionCard}>
              <View style={styles.permissionIconCircle}>
                <CameraOff size={32} strokeWidth={2} color={PALETTE.primary} />
              </View>
              <Text style={styles.permissionTitle}>
                {cameraError ? 'Camera Unavailable' : 'Camera Permission Needed'}
              </Text>
              <Text style={styles.permissionSubtitle}>
                {cameraError
                  ? 'The camera device could not be opened. You can enter the merchant code manually below.'
                  : 'Please allow camera permission so you can scan loyalty QR codes at the counter.'}
              </Text>

              {hasPermission === false && (
                <TouchableOpacity
                  style={styles.permissionButton}
                  onPress={requestPermission}
                  activeOpacity={0.85}
                >
                  <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.manualFallbackButton}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}
              >
                <Keyboard size={16} strokeWidth={2} color={PALETTE.onSurfaceVariant} />
                <Text style={styles.manualFallbackText}>Enter Code Manually</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.scanTarget}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />

              {loading && (
                <View style={styles.scanningIndicator}>
                  <ActivityIndicator size="large" color={PALETTE.primary} />
                  <Text style={styles.scanningText}>Processing Stamp...</Text>
                </View>
              )}
            </View>
          )}

          <Text style={styles.instructionText}>
            Align the business QR code inside the frame to claim your stamp
          </Text>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.manualCodeButton}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.85}
          >
            <Keyboard size={18} strokeWidth={2} color={PALETTE.surface} />
            <Text style={styles.manualCodeText}>Enter Code Manually</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Merchant Code</Text>
            <Text style={styles.modalSubtitle}>
              Type the code displayed below the store QR code to claim your stamp:
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="e.g. 8f4a19c..."
              placeholderTextColor={PALETTE.onSurfaceMuted}
              value={manualCode}
              onChangeText={setManualCode}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setModalVisible(false)}
                disabled={loading}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSubmitButton}
                onPress={() => handleScanCode(manualCode)}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={PALETTE.onPrimary} size="small" />
                ) : (
                  <Text style={styles.modalSubmitText}>Claim Stamp</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceContrast,
  },
  fallbackBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: PALETTE.surfaceContrast,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(26, 33, 56, 0.52)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  headerTitle: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.surface,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: RADII.full,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonActive: {
    backgroundColor: PALETTE.primary,
  },
  centerContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  scanTarget: {
    width: 246,
    height: 246,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderColor: PALETTE.primary,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 16,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 16,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 16,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 16,
  },
  scanningIndicator: {
    backgroundColor: PALETTE.surfaceContrast,
    paddingHorizontal: 22,
    paddingVertical: 16,
    borderRadius: RADII.lg,
    alignItems: 'center',
    gap: 10,
  },
  scanningText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.surface,
  },
  instructionText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.surface,
    textAlign: 'center',
    marginTop: 22,
    maxWidth: 280,
  },
  permissionCard: {
    width: '100%',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    padding: 24,
    alignItems: 'center',
    ...SHADOWS.softCard,
  },
  permissionIconCircle: {
    width: 68,
    height: 68,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  permissionTitle: {
    ...TYPOGRAPHY.headlineMd,
    color: PALETTE.onSurface,
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionSubtitle: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 18,
  },
  permissionButton: {
    backgroundColor: PALETTE.primary,
    paddingHorizontal: 26,
    height: 48,
    borderRadius: RADII.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.btn,
  },
  permissionButtonText: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onPrimary,
  },
  manualFallbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    paddingVertical: 8,
  },
  manualFallbackText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onSurfaceVariant,
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  manualCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(26, 33, 56, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 22,
    height: 48,
    borderRadius: RADII.full,
  },
  manualCodeText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.surface,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 33, 56, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: PALETTE.surface,
    borderTopLeftRadius: RADII.xl,
    borderTopRightRadius: RADII.xl,
    padding: 24,
    paddingBottom: 34,
  },
  modalTitle: {
    ...TYPOGRAPHY.headlineMd,
    color: PALETTE.onSurface,
    marginBottom: 6,
  },
  modalSubtitle: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 18,
  },
  modalInput: {
    height: 52,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surfaceAlt,
    borderWidth: 1,
    borderColor: PALETTE.border,
    paddingHorizontal: 20,
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
    marginBottom: 20,
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    height: 50,
    borderRadius: RADII.full,
    borderWidth: 1,
    borderColor: PALETTE.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onSurfaceVariant,
  },
  modalSubmitButton: {
    flex: 1,
    height: 50,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.btn,
  },
  modalSubmitText: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onPrimary,
  },
});
