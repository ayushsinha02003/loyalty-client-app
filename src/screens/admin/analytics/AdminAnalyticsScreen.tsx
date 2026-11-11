import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useBusinessDashboard } from '../../../hooks/useApi';
import { AdminAnalyticsScreenSkeleton } from '../../../components/skeleton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

export default function AdminAnalyticsScreen() {
  const { dashboard, loading } = useBusinessDashboard();

  if (loading && !dashboard) {
    return <AdminAnalyticsScreenSkeleton />;
  }

  const metrics = [
    {
      id: '1',
      title: 'Total Active Customers',
      value: (dashboard?.totalCustomers || 0).toString(),
      change: 'Enrolled',
      period: 'all time',
      strokeColor: PALETTE.primary,
      graphPath: 'M0 25 Q20 30 40 18 T80 8 T120 12 T160 2',
    },
    {
      id: '2',
      title: 'Stamps Issued',
      value: (dashboard?.totalStamps || 0).toString(),
      change: 'Collected',
      period: 'total recorded',
      strokeColor: PALETTE.surfaceContrast,
      graphPath: 'M0 28 Q30 24 60 14 T110 18 T160 4',
    },
    {
      id: '3',
      title: 'Rewards Redeemed',
      value: (dashboard?.totalRewardsRedeemed || 0).toString(),
      change: 'Claimed',
      period: 'completed gifts',
      strokeColor: PALETTE.warning,
      graphPath: 'M0 26 Q25 28 50 16 T100 20 T160 3',
    },
    {
      id: '4',
      title: 'Pending Rewards',
      value: (dashboard?.rewardsAvailable || 0).toString(),
      change: 'Ready',
      period: 'unclaimed gifts',
      strokeColor: PALETTE.illusCoolBlue,
      graphPath: 'M0 22 Q30 18 60 24 T110 14 T160 6',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <View style={styles.header}>
        <Text style={styles.eyebrow}>Performance</Text>
        <Text style={styles.title}>Analytics</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {metrics.map(metric => (
          <View key={metric.id} style={styles.metricCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.metricTitle}>{metric.title}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{metric.change}</Text>
              </View>
            </View>

            <View style={styles.numberRow}>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.periodText}>{metric.period}</Text>
            </View>

            <View style={styles.graphContainer}>
              <Svg width="100%" height={40} viewBox="0 0 160 35">
                <Path
                  d={metric.graphPath}
                  fill="none"
                  stroke={metric.strokeColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </Svg>
            </View>
          </View>
        ))}
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
    paddingBottom: 14,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 4,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.onSurface,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    gap: 16,
  },
  metricCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 20,
    ...SHADOWS.softCard,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricTitle: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
    flex: 1,
    marginRight: 8,
  },
  badge: {
    backgroundColor: PALETTE.surfaceContrast,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADII.full,
  },
  badgeText: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 11,
    color: PALETTE.surface,
  },
  numberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 14,
  },
  metricValue: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.onSurface,
  },
  periodText: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceMuted,
  },
  graphContainer: {
    height: 44,
    justifyContent: 'center',
  },
});
