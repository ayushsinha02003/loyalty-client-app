import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function AdminAnalyticsScreen() {
  const metrics = [
    {
      id: '1',
      title: 'Total Stamps Collected',
      value: '1,248',
      change: '+15%',
      period: 'vs last month',
      color: '#4F46E5',
      graphPath: 'M0 25 Q20 30 40 18 T80 8 T120 12 T160 2',
    },
    {
      id: '2',
      title: 'Rewards Redeemed',
      value: '89',
      change: '+10%',
      period: 'vs last month',
      color: '#10B981',
      graphPath: 'M0 28 Q30 24 60 14 T110 18 T160 4',
    },
    {
      id: '3',
      title: 'New Customers',
      value: '67',
      change: '+12%',
      period: 'vs last month',
      color: '#8B5CF6',
      graphPath: 'M0 26 Q25 28 50 16 T100 20 T160 3',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <TouchableOpacity style={styles.dropdownButton} activeOpacity={0.8}>
          <Text style={styles.dropdownText}>This Month ▾</Text>
        </TouchableOpacity>
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
        ))}
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
  dropdownButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dropdownText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
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
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#16A34A',
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
});
