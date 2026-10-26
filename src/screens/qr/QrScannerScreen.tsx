import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

interface QrScannerScreenProps {
  onBack?: () => void;
  onScanSuccess?: () => void;
  onEnterCode?: () => void;
  onGallerySelect?: () => void;
}

export default function QrScannerScreen({
  onBack,
  onScanSuccess,
  onEnterCode,
  onGallerySelect,
}: QrScannerScreenProps) {
  const [torchOn, setTorchOn] = useState(false);

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

              {/* QR Code SVG Mock Graphic inside Viewfinder */}
              <TouchableOpacity
                onPress={onScanSuccess}
                activeOpacity={0.8}
                style={styles.qrInner}
              >
                <Svg width={140} height={140} viewBox="0 0 100 100">
                  {/* Top-Left Corner Block */}
                  <Rect x="5" y="5" width="28" height="28" rx="6" fill="#FFFFFF" />
                  <Rect x="11" y="11" width="16" height="16" rx="3" fill="#1E1B4B" />
                  <Rect x="15" y="15" width="8" height="8" rx="2" fill="#FFFFFF" />

                  {/* Top-Right Corner Block */}
                  <Rect x="67" y="5" width="28" height="28" rx="6" fill="#FFFFFF" />
                  <Rect x="73" y="11" width="16" height="16" rx="3" fill="#1E1B4B" />
                  <Rect x="77" y="15" width="8" height="8" rx="2" fill="#FFFFFF" />

                  {/* Bottom-Left Corner Block */}
                  <Rect x="5" y="67" width="28" height="28" rx="6" fill="#FFFFFF" />
                  <Rect x="11" y="73" width="16" height="16" rx="3" fill="#1E1B4B" />
                  <Rect x="15" y="77" width="8" height="8" rx="2" fill="#FFFFFF" />

                  {/* QR Data Pixels */}
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
              Place the QR code within the frame to scan
            </Text>
          </View>

          {/* Bottom Action Controls */}
          <View style={styles.bottomBar}>
            {/* Gallery Option */}
            <TouchableOpacity
              style={styles.actionItem}
              onPress={onGallerySelect}
              activeOpacity={0.75}
            >
              <View style={styles.actionCircle}>
                <Text style={styles.actionEmoji}>🖼️</Text>
              </View>
              <Text style={styles.actionLabel}>Gallery</Text>
            </TouchableOpacity>

            {/* Main Scan Button */}
            <TouchableOpacity
              style={styles.mainScanButton}
              onPress={onScanSuccess}
              activeOpacity={0.85}
            >
              <View style={styles.mainScanInner}>
                <Text style={styles.mainScanIcon}>⛶</Text>
              </View>
            </TouchableOpacity>

            {/* Enter Code Option */}
            <TouchableOpacity
              style={styles.actionItem}
              onPress={onEnterCode}
              activeOpacity={0.75}
            >
              <View style={styles.actionCircle}>
                <Text style={styles.actionEmoji}>⌨️</Text>
              </View>
              <Text style={styles.actionLabel}>Enter Code</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
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
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
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
});
