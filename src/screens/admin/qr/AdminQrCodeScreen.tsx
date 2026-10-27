import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Rect } from 'react-native-svg';

export default function AdminQrCodeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Business QR</Text>
      </View>

      <View style={styles.content}>
        {/* QR Code Container Card */}
        <View style={styles.qrCard}>
          <Svg width={200} height={200} viewBox="0 0 100 100">
            {/* Top-Left Finder */}
            <Rect x="5" y="5" width="28" height="28" rx="6" fill="#1E1B4B" />
            <Rect x="11" y="11" width="16" height="16" rx="3" fill="#FFFFFF" />
            <Rect x="15" y="15" width="8" height="8" rx="2" fill="#1E1B4B" />

            {/* Top-Right Finder */}
            <Rect x="67" y="5" width="28" height="28" rx="6" fill="#1E1B4B" />
            <Rect x="73" y="11" width="16" height="16" rx="3" fill="#FFFFFF" />
            <Rect x="77" y="15" width="8" height="8" rx="2" fill="#1E1B4B" />

            {/* Bottom-Left Finder */}
            <Rect x="5" y="67" width="28" height="28" rx="6" fill="#1E1B4B" />
            <Rect x="11" y="73" width="16" height="16" rx="3" fill="#FFFFFF" />
            <Rect x="15" y="77" width="8" height="8" rx="2" fill="#1E1B4B" />

            {/* Data Modules */}
            <Rect x="40" y="10" width="8" height="8" rx="2" fill="#1E1B4B" />
            <Rect x="52" y="18" width="6" height="6" rx="1.5" fill="#1E1B4B" />
            <Rect x="42" y="38" width="16" height="16" rx="4" fill="#6366F1" />
            <Rect x="15" y="44" width="8" height="8" rx="2" fill="#1E1B4B" />
            <Rect x="75" y="42" width="10" height="6" rx="1.5" fill="#1E1B4B" />
            <Rect x="42" y="68" width="8" height="8" rx="2" fill="#1E1B4B" />
            <Rect x="60" y="64" width="6" height="12" rx="1.5" fill="#1E1B4B" />
            <Rect x="75" y="72" width="12" height="12" rx="2" fill="#1E1B4B" />
          </Svg>
        </View>

        <Text style={styles.subtitle}>
          Customers scan this QR{'\n'}to collect stamps
        </Text>

        {/* Buttons: Download & Share */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>⬇️</Text>
            <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>🔗</Text>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Help Banner at Bottom */}
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            💡 You can print this QR and display it at your counter.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 70,
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    marginBottom: 36,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    gap: 8,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  tipCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: '100%',
  },
  tipText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
});
