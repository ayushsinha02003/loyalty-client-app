import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { qrApi } from '../../services/api';

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

  // Prevent multiple scans of the same code in quick succession
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
            message: 'LoyaltyApp needs camera access to scan business QR codes and award your stamps.',
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
        const customerCard = response.data?.customerCard || response.customerCard;
        const stampsEarned = response.data?.stampsEarned ?? response.stampsEarned ?? 1;
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
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Live Native Camera Feed */}
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

      {/* Semi-transparent Dark Mask Overlay */}
      <SafeAreaView style={styles.overlay}>
        {/* Header Controls */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.iconButton}
            activeOpacity={0.7}
          >
            <MaterialDesignIcons name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Scan QR Code</Text>

          <TouchableOpacity
            onPress={() => setTorchOn(!torchOn)}
            style={[styles.iconButton, torchOn && styles.iconButtonActive]}
            activeOpacity={0.7}
          >
            <MaterialDesignIcons
              name={torchOn ? 'flashlight' : 'flashlight-off'}
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        {/* Central Viewfinder */}
        <View style={styles.centerContainer}>
          {hasPermission === false || cameraError ? (
            <View style={styles.permissionCard}>
              <View style={styles.permissionIconCircle}>
                <MaterialDesignIcons name="camera-off-outline" size={44} color="#C084FC" />
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
                  activeOpacity={0.8}
                >
                  <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.manualFallbackButton}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}
              >
                <MaterialDesignIcons name="keyboard-outline" size={18} color="#CBD5E1" style={styles.fallbackIconMargin} />
                <Text style={styles.manualFallbackText}>Enter Code Manually</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.scanTarget}>
              {/* Corner Accents */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />

              {loading && (
                <View style={styles.scanningIndicator}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                  <Text style={styles.scanningText}>Processing Stamp...</Text>
                </View>
              )}
            </View>
          )}

          <Text style={styles.instructionText}>
            Align the business QR code inside the frame to claim your stamp
          </Text>
        </View>

        {/* Bottom Bar: Manual Code Option */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.manualCodeButton}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <MaterialDesignIcons name="keyboard-outline" size={20} color="#FFFFFF" style={styles.manualCodeIconMargin} />
            <Text style={styles.manualCodeText}>Enter Code Manually</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Manual Code Input Modal */}
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
              Type the code shown below the business QR code to claim your stamp:
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="e.g. 8f4a19c... or QR text"
              placeholderTextColor="#94A3B8"
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
                  <ActivityIndicator color="#FFFFFF" size="small" />
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
    backgroundColor: '#000000',
  },
  fallbackBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#090D16',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonActive: {
    backgroundColor: '#7C3AED',
  },
  headerIconText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  scanTarget: {
    width: 260,
    height: 260,
    borderRadius: 24,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#A855F7',
  },
  cornerTL: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 20,
  },
  cornerTR: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 20,
  },
  cornerBL: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 20,
  },
  cornerBR: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 20,
  },
  scanningIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 16,
    padding: 16,
  },
  scanningText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  instructionText: {
    marginTop: 24,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  permissionCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#334155',
  },
  permissionIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  manualFallbackButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    width: '100%',
  },
  manualFallbackText: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '600',
  },
  fallbackIconMargin: {
    marginRight: 8,
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    alignItems: 'center',
  },
  manualCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  manualCodeIconMargin: {
    marginRight: 10,
  },
  manualCodeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  modalSubmitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubmitText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
