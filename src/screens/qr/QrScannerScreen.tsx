import React, { useState } from 'react';
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
} from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { qrApi } from '../../services/api';

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
  const [torchOn, setTorchOn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScanCode = async (codeToScan: string) => {
    const trimmed = codeToScan.trim();
    if (!trimmed) {
      Alert.alert('Required', 'Please enter a valid QR code');
      return;
    }

    setLoading(true);
    try {
      const response = await qrApi.scan(trimmed);
      if (response.success) {
        const customerCard = response.data?.customerCard || response.customerCard;
        const stampsEarned = response.data?.stampsEarned ?? response.stampsEarned ?? 1;
        const businessName =
          customerCard?.loyaltyCard?.business?.businessName ||
          customerCard?.loyaltyCard?.title ||
          'Store';
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
        Alert.alert('Scan Failed', response.message || 'Invalid or inactive QR code');
      }
    } catch (err: any) {
      Alert.alert('Scan Failed', err.message || 'Invalid QR code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Dark Viewfinder Backdrop */}
      <View style={styles.backdrop}>
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={onBack}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Text style={styles.headerIconText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Scan QR Code</Text>

            <TouchableOpacity
              onPress={() => setTorchOn(!torchOn)}
              style={[styles.iconButton, torchOn && styles.iconButtonActive]}
              activeOpacity={0.7}
            >
              <Text style={styles.headerIconText}>{torchOn ? '⚡' : '💡'}</Text>
            </TouchableOpacity>
          </View>

          {/* Central QR Viewfinder Area */}
          <View style={styles.viewfinderContainer}>
            <View style={styles.scanTarget}>
              {/* Corner Accents */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />

              {/* QR Graphic in Center */}
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}
                style={styles.qrInner}
              >
                <Svg width={140} height={140} viewBox="0 0 100 100">
                  <Rect x="5" y="5" width="28" height="28" rx="6" fill="#FFFFFF" />
                  <Rect x="11" y="11" width="16" height="16" rx="3" fill="#1E1B4B" />
                  <Rect x="15" y="15" width="8" height="8" rx="2" fill="#FFFFFF" />

                  <Rect x="67" y="5" width="28" height="28" rx="6" fill="#FFFFFF" />
                  <Rect x="73" y="11" width="16" height="16" rx="3" fill="#1E1B4B" />
                  <Rect x="77" y="15" width="8" height="8" rx="2" fill="#FFFFFF" />

                  <Rect x="5" y="67" width="28" height="28" rx="6" fill="#FFFFFF" />
                  <Rect x="11" y="73" width="16" height="16" rx="3" fill="#1E1B4B" />
                  <Rect x="15" y="77" width="8" height="8" rx="2" fill="#FFFFFF" />

                  <Rect x="42" y="10" width="8" height="8" rx="2" fill="#FFFFFF" />
                  <Rect x="50" y="22" width="6" height="6" rx="1.5" fill="#FFFFFF" />
                  <Rect x="42" y="42" width="16" height="16" rx="4" fill="#A855F7" />
                  <Rect x="15" y="45" width="8" height="8" rx="2" fill="#FFFFFF" />
                  <Rect x="75" y="45" width="10" height="6" rx="1.5" fill="#FFFFFF" />
                  <Rect x="42" y="70" width="8" height="8" rx="2" fill="#FFFFFF" />
                  <Rect x="60" y="65" width="6" height="12" rx="1.5" fill="#FFFFFF" />
                  <Rect x="75" y="75" width="12" height="12" rx="2" fill="#FFFFFF" />
                </Svg>
              </TouchableOpacity>
            </View>

            <Text style={styles.instructionText}>
              Scan the merchant QR code to collect your loyalty stamp
            </Text>
          </View>

          {/* Bottom Action Controls */}
          <View style={styles.bottomBar}>
            {/* Enter Code Option */}
            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.75}
            >
              <View style={styles.actionCircle}>
                <Text style={styles.actionEmoji}>⌨️</Text>
              </View>
              <Text style={styles.actionLabel}>Enter Code</Text>
            </TouchableOpacity>

            {/* Main Scan Action Button */}
            <TouchableOpacity
              style={styles.mainScanButton}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.85}
            >
              <View style={styles.mainScanInner}>
                <Text style={styles.mainScanIcon}>⛶</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

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
              placeholder="e.g. 8f4a19c..."
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
    backgroundColor: '#0F172A',
  },
  backdrop: {
    flex: 1,
    backgroundColor: '#090D16',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
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
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonActive: {
    backgroundColor: '#6366F1',
  },
  headerIconText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  viewfinderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  scanTarget: {
    width: 250,
    height: 250,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#8B5CF6',
  },
  cornerTL: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 18,
  },
  cornerTR: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 18,
  },
  cornerBL: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 18,
  },
  cornerBR: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 18,
  },
  qrInner: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
  },
  instructionText: {
    marginTop: 28,
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: 32,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionEmoji: {
    fontSize: 20,
  },
  actionLabel: {
    fontSize: 12,
    color: '#CBD5E1',
    fontWeight: '600',
  },
  mainScanButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#7B3FF2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7B3FF2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  mainScanInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainScanIcon: {
    fontSize: 26,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 18,
    lineHeight: 20,
  },
  modalInput: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#0F172A',
    marginBottom: 20,
    backgroundColor: '#F8FAFC',
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    height: 48,
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
    flex: 2,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#7B3FF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubmitText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
