import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useBusinessQRCodes, useBusinessProfile } from '../../../hooks/useApi';
import { AdminQrCodeScreenSkeleton } from '../../../components/skeleton';

export default function AdminQrCodeScreen() {
  const { qrCodes, loading, error, refetch } = useBusinessQRCodes();
  const { profile } = useBusinessProfile();

  const activeQr = qrCodes && qrCodes.length > 0 ? qrCodes[0] : null;

  if (loading && !activeQr) {
    return <AdminQrCodeScreenSkeleton />;
  }

  const handleCopyCode = () => {
    if (activeQr?.code) {
      Alert.alert('Merchant Code', `Store Code: ${activeQr.code}\n\nDisplay this at your counter for manual customer entry.`);
    }
  };

  const handlePrintInfo = () => {
    Alert.alert(
      'Print QR Code',
      'Display this QR stand at your counter so customers can quickly scan and earn loyalty stamps on each purchase!'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Counter QR Code</Text>
        <Text style={styles.headerSubtitle}>
          Present this at checkout for customers to collect stamps
        </Text>
      </View>

      <View style={styles.content}>
        {error ? (
          <View style={styles.errorBox}>
            <MaterialDesignIcons name="alert-circle-outline" size={40} color="#EF4444" style={styles.mb8} />
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
              <View style={styles.categoryBadge}>
                <MaterialDesignIcons name="storefront-outline" size={13} color="#7C3AED" style={styles.mr4} />
                <Text style={styles.businessCategory}>
                  {profile?.category || 'Loyalty Store'}
                </Text>
              </View>
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
                  <MaterialDesignIcons name="qrcode" size={80} color="#7C3AED" />
                  <Text style={styles.qrFallbackCode}>
                    {activeQr?.code || 'QR CODE'}
                  </Text>
                </View>
              )}
            </View>

            {/* Code hex display */}
            {activeQr?.code ? (
              <TouchableOpacity
                style={styles.codePill}
                onPress={handleCopyCode}
                activeOpacity={0.8}
              >
                <MaterialDesignIcons name="key-variant" size={14} color="#7C3AED" style={styles.mr6} />
                <Text style={styles.codePillLabel}>CODE: </Text>
                <Text style={styles.codePillText}>{activeQr.code}</Text>
                <MaterialDesignIcons name="content-copy" size={14} color="#7C3AED" style={styles.ml6} />
              </TouchableOpacity>
            ) : null}

            <Text style={styles.subtitle}>
              Customers scan this QR code with their mobile camera to collect stamps!
            </Text>

            {/* Action Buttons Row */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.primaryActionButton}
                onPress={handlePrintInfo}
                activeOpacity={0.85}
              >
                <MaterialDesignIcons name="printer-outline" size={18} color="#FFFFFF" style={styles.mr6} />
                <Text style={styles.primaryActionText}>Print QR Stand</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryActionButton}
                onPress={handleCopyCode}
                activeOpacity={0.85}
              >
                <MaterialDesignIcons name="share-variant-outline" size={18} color="#7C3AED" style={styles.mr6} />
                <Text style={styles.secondaryActionText}>Share Code</Text>
              </TouchableOpacity>
            </View>

            {/* Help / Instructions Banner at Bottom */}
            <View style={styles.tipCard}>
              <MaterialDesignIcons name="lightbulb-on-outline" size={20} color="#F59E0B" style={styles.mr8} />
              <Text style={styles.tipText}>
                Display this QR code near your cash register for effortless customer check-ins.
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
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 70,
  },
  businessHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  businessName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 4,
  },
  businessCategory: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '600',
  },
  qrCard: {
    width: 260,
    height: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#EDE9FE',
    marginBottom: 16,
  },
  qrImage: {
    width: 228,
    height: 228,
  },
  qrFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrFallbackCode: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7C3AED',
    marginTop: 10,
  },
  codePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  codePillLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  codePillText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#7C3AED',
    fontFamily: 'monospace',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 16,
  },
  primaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  secondaryActionText: {
    color: '#7C3AED',
    fontWeight: '700',
    fontSize: 14,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    width: '100%',
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: '#92400E',
    lineHeight: 17,
    fontWeight: '500',
  },
  errorBox: {
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  mr4: { marginRight: 4 },
  mr6: { marginRight: 6 },
  mr8: { marginRight: 8 },
  ml6: { marginLeft: 6 },
  mb8: { marginBottom: 8 },
});
