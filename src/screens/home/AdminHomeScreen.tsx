import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Gift, Store } from 'lucide-react-native';
import PrimaryText from '../../components/text/PrimaryText';
import PrimaryAdminActionGrid from '../../components/admin/PrimaryAdminActionGrid';
import PrimaryAdminActivity from '../../components/admin/PrimaryAdminActivity';
import PrimaryAdminMetric from '../../components/admin/PrimaryAdminMetric';
import PrimaryAdminStatCard from '../../components/admin/PrimaryAdminStatCard';
import { useBusinessDashboard, useBusinessStampHistory } from '../../hooks/useApi';
import { AdminHomeScreenSkeleton } from '../../components/skeleton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

interface AdminHomeScreenProps {
  onActionPress?: (action: string) => void;
}

const ACTIONS = [
  { label: 'Add Customer', icon: 'account-plus' },
  { label: 'Create Reward', icon: 'gift-outline' },
  { label: 'Scan QR Code', icon: 'qrcode-scan' },
  { label: 'View Reports', icon: 'chart-bar' },
];

export default function AdminHomeScreen({ onActionPress }: AdminHomeScreenProps) {
  const { dashboard, loading, error, refetch } = useBusinessDashboard();
  const { history: stampHistory } = useBusinessStampHistory();
  const [businessName, setBusinessName] = useState('Your Business');

  useEffect(() => {
    if (dashboard?.business?.businessName) {
      setBusinessName(dashboard.business.businessName);
    }
  }, [dashboard]);

  const recentActivity =
    stampHistory?.slice(0, 4).map((stamp: any) => ({
      title: 'New Stamp Added',
      detail: `${stamp.addedBy?.name || 'Staff'} added stamp to ${
        stamp.customerCard?.loyaltyCard?.title || 'a card'
      }`,
      time: new Date(stamp.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    })) || [];

  if (loading) {
    return <AdminHomeScreenSkeleton />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.storeIconCircle}>
            <Store size={22} strokeWidth={2} color={PALETTE.primary} />
          </View>
          <View style={styles.headerCopy}>
            <PrimaryText text="Merchant Hub" customStyle={styles.eyebrow} />
            <PrimaryText
              text={`Hello, ${businessName}`}
              customStyle={styles.title}
              numberOfLines={1}
            />
          </View>
        </View>
        <View style={styles.errorContainer}>
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={refetch}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            tintColor={PALETTE.primary}
          />
        }
      >
        <View style={styles.header}>
          <View style={styles.storeIconCircle}>
            <Store size={22} strokeWidth={2} color={PALETTE.primary} />
          </View>
          <View style={styles.headerCopy}>
            <PrimaryText text="Merchant Hub" customStyle={styles.eyebrow} />
            <PrimaryText
              text={`Hello, ${businessName}`}
              customStyle={styles.title}
              numberOfLines={1}
            />
          </View>
          <View style={styles.bellChrome}>
            <Bell size={20} strokeWidth={2} color={PALETTE.onSurface} />
          </View>
        </View>

        {/* Deep Slate-Indigo Contrast Banner */}
        <View style={styles.banner}>
          <PrimaryAdminMetric
            label="Customers"
            value={dashboard?.totalCustomers?.toString() || '0'}
            change="enrolled"
          />
          <PrimaryAdminMetric
            label="Stamps"
            value={dashboard?.totalStamps?.toString() || '0'}
            change="issued"
          />
          <PrimaryAdminMetric
            label="Redeemed"
            value={dashboard?.totalRewardsRedeemed?.toString() || '0'}
            change="claimed"
          />
        </View>

        <PrimaryText text="Quick Actions" customStyle={styles.heading} />
        <PrimaryAdminActionGrid
          actions={ACTIONS}
          onPressAction={(index: number) => {
            const label = ACTIONS[index]?.label;
            onActionPress?.(label);
          }}
        />

        <View style={styles.callout}>
          <View style={styles.calloutCopy}>
            <PrimaryText
              text="Boost Engagement"
              customStyle={styles.calloutTitle}
            />
            <PrimaryText
              text="Create rewarding perks and keep loyal customers returning for every visit."
              customStyle={styles.calloutText}
            />
          </View>
          <View style={styles.calloutIconWell}>
            <Gift size={26} strokeWidth={2} color={PALETTE.primary} />
          </View>
        </View>

        <View style={styles.sectionRow}>
          <PrimaryText text="Recent Activity" customStyle={styles.heading} />
        </View>
        <View style={styles.activityCard}>
          {recentActivity.length > 0 ? (
            recentActivity.map((activity: any, index: number) => (
              <PrimaryAdminActivity
                key={index}
                title={activity.title}
                detail={activity.detail}
                time={activity.time}
              />
            ))
          ) : (
            <PrimaryAdminActivity
              title="No recent activity"
              detail="Customer stamps and reward events will appear here"
              time="—"
            />
          )}
        </View>

        <View style={styles.sectionRow}>
          <PrimaryText text="Business Overview" customStyle={styles.heading} />
        </View>
        <View style={styles.overviewRow}>
          <PrimaryAdminStatCard
            label="Total Cards"
            value={dashboard?.totalLoyaltyCards?.toString() || '0'}
            change="active"
          />
          <PrimaryAdminStatCard
            label="Pending"
            value={dashboard?.rewardsAvailable?.toString() || '0'}
            change="ready"
          />
          <PrimaryAdminStatCard
            label="Members"
            value={dashboard?.totalCustomers?.toString() || '0'}
            change="total"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  storeIconCircle: {
    width: 46,
    height: 46,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCopy: {
    flex: 1,
    marginHorizontal: 14,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
  },
  title: {
    ...TYPOGRAPHY.headlineMd,
    color: PALETTE.onSurface,
    marginTop: 2,
  },
  bellChrome: {
    width: 44,
    height: 44,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.softCard,
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: PALETTE.surfaceContrast,
    borderRadius: RADII.xl,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 24,
    ...SHADOWS.softCard,
  },
  heading: {
    ...TYPOGRAPHY.headlineMd,
    color: PALETTE.onSurface,
    marginBottom: 14,
  },
  callout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 20,
    marginVertical: 24,
    ...SHADOWS.softCard,
  },
  calloutCopy: {
    flex: 1,
    paddingRight: 14,
  },
  calloutTitle: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
    marginBottom: 4,
  },
  calloutText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
  },
  calloutIconWell: {
    width: 52,
    height: 52,
    borderRadius: RADII.lg,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: PALETTE.border,
    ...SHADOWS.softCard,
  },
  overviewRow: {
    flexDirection: 'row',
    gap: 10,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorCard: {
    width: '100%',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 24,
    alignItems: 'center',
    ...SHADOWS.softCard,
  },
  errorText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
    textAlign: 'center',
    marginBottom: 16,
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
  retryButtonText: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onPrimary,
  },
});
