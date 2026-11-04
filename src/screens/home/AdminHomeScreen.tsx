import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PrimaryText from '../../components/text/PrimaryText';
import PrimaryAdminActionGrid from '../../components/admin/PrimaryAdminActionGrid';
import PrimaryAdminActivity from '../../components/admin/PrimaryAdminActivity';
import PrimaryAdminMetric from '../../components/admin/PrimaryAdminMetric';
import PrimaryAdminStatCard from '../../components/admin/PrimaryAdminStatCard';
import { useBusinessDashboard, useBusinessStampHistory } from '../../hooks/useApi';
import { AdminHomeScreenSkeleton } from '../../components/skeleton';

interface AdminHomeScreenProps {
  onActionPress?: (action: string) => void;
}

const actions = [
  { label: 'Add Customer', icon: 'account-plus' as const },
  { label: 'Create Reward', icon: 'gift-outline' as const },
  { label: 'Scan QR Code', icon: 'qrcode-scan' as const },
  { label: 'View Reports', icon: 'chart-bar' as const },
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

  // Transform stamp history to activity format
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
      <View style={styles.container}>
        <View style={styles.header}>
          <MaterialDesignIcons name="store" size={30} color="#7B3FF2" />
          <View style={styles.headerCopy}>
            <PrimaryText text={`Hello, ${businessName}!`} customStyle={styles.title} />
            <PrimaryText text="Manage your business & rewards" customStyle={styles.subtitle} />
          </View>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      >
        <View style={styles.header}>
          <MaterialDesignIcons name="store" size={30} color="#7B3FF2" />
          <View style={styles.headerCopy}>
            <PrimaryText text={`Hello, ${businessName}!`} customStyle={styles.title} />
            <PrimaryText text="Manage your business & rewards" customStyle={styles.subtitle} />
          </View>
          <MaterialDesignIcons name="bell-outline" size={26} color="#172033" />
        </View>

        <View style={styles.banner}>
          <PrimaryAdminMetric
            label="Total Customers"
            value={dashboard?.totalCustomers?.toString() || '0'}
            change="enrolled"
          />
          <PrimaryAdminMetric
            label="Active Stamps"
            value={dashboard?.totalStamps?.toString() || '0'}
            change="issued"
          />
          <PrimaryAdminMetric
            label="Redemptions"
            value={dashboard?.totalRewardsRedeemed?.toString() || '0'}
            change="claimed"
          />
        </View>

        <PrimaryText text="Quick Actions" customStyle={styles.heading} />
        <PrimaryAdminActionGrid
          actions={actions}
          onPressAction={(index: number) => {
            const label = actions[index]?.label;
            onActionPress?.(label);
          }}
        />

        <View style={styles.callout}>
          <View style={styles.calloutCopy}>
            <PrimaryText text="Boost Engagement!" customStyle={styles.calloutTitle} />
            <PrimaryText
              text="Create exciting rewards and keep your customers coming back for more stamps."
              customStyle={styles.calloutText}
            />
          </View>
          <MaterialDesignIcons name="gift-outline" size={50} color="#8B5CF6" />
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
              detail="Activity will appear here when customers interact with your loyalty program"
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
            color="#F2EAFF"
          />
          <PrimaryAdminStatCard
            label="Pending Rewards"
            value={dashboard?.rewardsAvailable?.toString() || '0'}
            change="ready"
            color="#FFF7E7"
          />
          <PrimaryAdminStatCard
            label="Customers"
            value={dashboard?.totalCustomers?.toString() || '0'}
            change="total"
            color="#ECF9F0"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingTop: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingHorizontal: 4 },
  headerCopy: { flex: 1, marginHorizontal: 14 },
  title: { fontSize: 22, fontWeight: '800', color: '#172033' },
  subtitle: { marginTop: 3, fontSize: 13, color: '#64748B' },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#7139EF',
    borderRadius: 22,
    paddingVertical: 20,
    marginBottom: 24,
  },
  heading: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 13,
  },
  callout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4ECFF',
    borderRadius: 20,
    padding: 18,
    marginVertical: 24,
  },
  calloutCopy: { flex: 1, paddingRight: 10 },
  calloutTitle: {
    color: '#7B3FF2',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  calloutText: { color: '#64748B', fontSize: 13, lineHeight: 19 },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    marginBottom: 26,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  overviewRow: { flexDirection: 'row', gap: 10 },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748B',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#7B3FF2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
