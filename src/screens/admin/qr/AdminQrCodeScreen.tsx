import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useBusinessQRCodes, useBusinessProfile } from '../../../hooks/useApi';

export default function AdminQrCodeScreen() {
  const { qrCodes, loading, error, refetch } = useBusinessQRCodes();
  const { profile } = useBusinessProfile();

  const activeQr = qrCodes && qrCodes.length > 0 ? qrCodes[0] : null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Business QR</Text>
      </View>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#7B3FF2" />
            <Text style={styles.loadingText}>Generating your QR code...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={refetch}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Business Info Header */}
            <View style={styles.businessHeader}>
              <Text style={styles.businessName}>
                {profile?.businessName || 'Your Business'}
              </Text>
              <Text style={styles.businessCategory}>
                {profile?.category || 'Loyalty Program'}
              </Text>
            </View>

            {/* QR Code Container Card */}
            <View style={styles.qrCard}>
              {activeQr?.qrImage ? (
                <Image
                  source={{ uri: activeQr.qrImage }}
                  style={styles.qrImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.qrFallback}>
                  <Text style={styles.qrFallbackEmoji}>📱</Text>
                  <Text style={styles.qrFallbackCode}>
                    {activeQr?.code || 'QR CODE'}
                  </Text>
                </View>
              )}
            </View>

            {/* Code hex display */}
            {activeQr?.code ? (
              <View style={styles.codePill}>
                <Text style={styles.codePillLabel}>CODE: </Text>
                <Text style={styles.codePillText}>{activeQr.code}</Text>
              </View>
            ) : null}

            <Text style={styles.subtitle}>
              Customers scan this QR code with the Loyalty app to instantly collect stamps!
            </Text>

            {/* Help / Instructions Banner at Bottom */}
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>
                💡 Print and display this QR code at your checkout counter for easy customer scanning.
              </Text>
            </View>
          </>
        )}
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
  businessHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  businessName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
  },
  businessCategory: {
    fontSize: 14,
    color: '#7B3FF2',
    fontWeight: '600',
    marginTop: 2,
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrImage: {
    width: 220,
    height: 220,
  },
  qrFallback: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
  },
  qrFallbackEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  qrFallbackCode: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  codePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 14,
  },
  codePillLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  codePillText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 12,
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
  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#64748B',
  },
  errorBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 15,
    color: '#EF4444',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#7B3FF2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
