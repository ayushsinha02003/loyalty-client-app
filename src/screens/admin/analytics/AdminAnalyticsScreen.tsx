import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useBusinessDashboard } from '../../../hooks/useApi';
import { AdminAnalyticsScreenSkeleton } from '../../../components/skeleton';

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
      change: 'Active',
      period: 'all time',
      color: '#4F46E5',
      graphPath: 'M0 25 Q20 30 40 18 T80 8 T120 12 T160 2',
    },
    {
      id: '2',
      title: 'Stamps Issued',
      value: (dashboard?.totalStamps || 0).toString(),
      change: 'Earned',
      period: 'total recorded',
      color: '#7B3FF2',
      graphPath: 'M0 28 Q30 24 60 14 T110 18 T160 4',
    },
    {
      id: '3',
      title: 'Rewards Redeemed',
      value: (dashboard?.totalRewardsRedeemed || 0).toString(),
      change: 'Redeemed',
      period: 'completed gifts',
      color: '#10B981',
      graphPath: 'M0 26 Q25 28 50 16 T100 20 T160 3',
    },
    {
      id: '4',
      title: 'Pending Rewards to Claim',
      value: (dashboard?.rewardsAvailable || 0).toString(),
      change: 'Ready',
      period: 'unclaimed rewards',
      color: '#F59E0B',
      graphPath: 'M0 22 Q30 18 60 24 T110 14 T160 6',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7B3FF2" />
            <Text style={styles.loadingText}>Loading analytics...</Text>
          </View>
        ) : (
          metrics.map(metric => (
            <View key={metric.id} style={styles.metricCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.metricTitle}>{metric.title}</Text>
                <View style={[styles.badge, { backgroundColor: `${metric.color}15` }]}>
                  <Text style={[styles.badgeText, { color: metric.color }]}>
                    {metric.change}
                  </Text>
                </View>
              </View>

              <View style={styles.numberRow}>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.periodText}>{metric.period}</Text>
              </View>

              {/* Sparkline Graph */}
              <View style={styles.graphContainer}>
                <Svg width="100%" height={40} viewBox="0 0 160 35">
                  <Path
                    d={metric.graphPath}
                    fill="none"
                    stroke={metric.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 16,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  numberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 16,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
  },
  periodText: {
    fontSize: 13,
    color: '#94A3B8',
  },
  graphContainer: {
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#F8FAFC',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#64748B',
  },
});
