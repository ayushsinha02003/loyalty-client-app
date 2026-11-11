import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AlertCircle,
  Copy,
  KeyRound,
  Lightbulb,
  Printer,
  QrCode,
  Share2,
  Store,
} from 'lucide-react-native';
import { useBusinessQRCodes, useBusinessProfile } from '../../../hooks/useApi';
import { AdminQrCodeScreenSkeleton } from '../../../components/skeleton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

export default function AdminQrCodeScreen() {
  const { qrCodes, loading, error, refetch } = useBusinessQRCodes();
  const { profile } = useBusinessProfile();

  const activeQr = qrCodes && qrCodes.length > 0 ? qrCodes[0] : null;

  if (loading && !activeQr) {
    return <AdminQrCodeScreenSkeleton />;
  }

  const handleCopyCode = () => {
    if (activeQr?.code) {
      Alert.alert(
        'Merchant Code',
        `Store Code: ${activeQr.code}\n\nDisplay this at your counter for manual customer entry.`
      );
    }
  };

  const handlePrintInfo = () => {
    Alert.alert(
      'Print QR Code',
      'Display this QR stand at your counter so customers can scan and earn loyalty stamps on every visit.'
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <View style={styles.header}>
        <Text style={styles.eyebrow}>Counter Display</Text>
        <Text style={styles.title}>Counter QR Code</Text>
        <Text style={styles.headerSubtitle}>
          Present at checkout for customers to collect stamps
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {error ? (
          <View style={styles.errorBox}>
            <AlertCircle size={36} strokeWidth={2} color={PALETTE.primary} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={refetch}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.businessHeader}>
              <Text style={styles.businessName}>
                {profile?.businessName || 'Your Business'}
              </Text>
              <View style={styles.categoryBadge}>
                <Store size={13} strokeWidth={2} color={PALETTE.primary} />
                <Text style={styles.businessCategory}>
                  {profile?.category || 'Loyalty Store'}
                </Text>
              </View>
            </View>

            <View style={styles.qrCard}>
              {activeQr?.qrImage ? (
                <Image
                  source={{ uri: activeQr.qrImage }}
                  style={styles.qrImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.qrFallback}>
                  <QrCode size={84} strokeWidth={1.8} color={PALETTE.onSurface} />
                  <Text style={styles.qrFallbackCode}>
                    {activeQr?.code || 'QR CODE'}
                  </Text>
                </View>
              )}
            </View>

            {activeQr?.code ? (
              <TouchableOpacity
                style={styles.codePill}
                onPress={handleCopyCode}
                activeOpacity={0.85}
              >
                <KeyRound size={14} strokeWidth={2} color={PALETTE.primary} />
                <Text style={styles.codePillLabel}>CODE:</Text>
                <Text style={styles.codePillText}>{activeQr.code}</Text>
                <Copy size={14} strokeWidth={2} color={PALETTE.onSurfaceMuted} />
              </TouchableOpacity>
            ) : null}

            <Text style={styles.subtitle}>
              Customers scan this QR code with their mobile camera to collect stamps.
            </Text>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.primaryActionButton}
                onPress={handlePrintInfo}
                activeOpacity={0.85}
              >
                <Printer size={18} strokeWidth={2} color={PALETTE.onPrimary} />
                <Text style={styles.primaryActionText}>Print Stand</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryActionButton}
                onPress={handleCopyCode}
                activeOpacity={0.85}
              >
                <Share2 size={18} strokeWidth={2} color={PALETTE.onSurface} />
                <Text style={styles.secondaryActionText}>Share Code</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tipCard}>
              <View style={styles.tipIconWell}>
                <Lightbulb size={18} strokeWidth={2} color={PALETTE.warning} />
              </View>
              <Text style={styles.tipText}>
                Place this QR code beside your register for quick customer check-ins.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 10,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 4,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    fontSize: 28,
    lineHeight: 34,
    color: PALETTE.onSurface,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 120,
    alignItems: 'center',
  },
  businessHeader: {
    alignItems: 'center',
    marginBottom: 18,
  },
  businessName: {
    ...TYPOGRAPHY.headlineLg,
    color: PALETTE.onSurface,
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PALETTE.surfaceContrast,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADII.full,
  },
  businessCategory: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 12,
    color: PALETTE.surface,
  },
  qrCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    ...SHADOWS.softCard,
  },
  qrImage: {
    width: 210,
    height: 210,
  },
  qrFallback: {
    width: 210,
    height: 210,
    borderRadius: RADII.lg,
    backgroundColor: PALETTE.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  qrFallbackCode: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.primary,
  },
  codePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PALETTE.surfaceContrast,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADII.full,
    marginBottom: 16,
  },
  codePillLabel: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 11,
    color: PALETTE.onSurfaceMuted,
  },
  codePillText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.surface,
  },
  subtitle: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 280,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 18,
  },
  primaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: PALETTE.primary,
    height: 50,
    borderRadius: RADII.full,
    ...SHADOWS.btn,
  },
  primaryActionText: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 14,
    color: PALETTE.onPrimary,
  },
  secondaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    height: 50,
    borderRadius: RADII.full,
    ...SHADOWS.softCard,
  },
  secondaryActionText: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 14,
    color: PALETTE.onSurface,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 16,
    width: '100%',
    gap: 12,
    ...SHADOWS.softCard,
  },
  tipIconWell: {
    width: 38,
    height: 38,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    flex: 1,
  },
  errorBox: {
    width: '100%',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 28,
    alignItems: 'center',
    gap: 12,
    ...SHADOWS.softCard,
  },
  errorText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: PALETTE.primary,
    paddingHorizontal: 28,
    height: 48,
    borderRadius: RADII.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.btn,
  },
  retryText: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onPrimary,
  },
});
