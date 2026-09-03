import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PrimaryText from '../../components/text/PrimaryText';
import PrimaryAdminActionGrid from '../../components/admin/PrimaryAdminActionGrid';
import PrimaryAdminActivity from '../../components/admin/PrimaryAdminActivity';
import PrimaryAdminMetric from '../../components/admin/PrimaryAdminMetric';
import PrimaryAdminStatCard from '../../components/admin/PrimaryAdminStatCard';

const actions = [
  { label: 'Add Customer', icon: 'account-plus' as const },
  { label: 'Create Reward', icon: 'gift-outline' as const },
  { label: 'Scan QR Code', icon: 'qrcode-scan' as const },
  { label: 'View Reports', icon: 'chart-bar' as const },
];

export default function AdminHomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <MaterialDesignIcons name="menu" size={30} color="#7B3FF2" />
          <View style={styles.headerCopy}>
            <PrimaryText
              text="Hello, Coffee House!"
              customStyle={styles.title}
            />
            <PrimaryText
              text="Manage your business & rewards"
              customStyle={styles.subtitle}
            />
          </View>
          <MaterialDesignIcons name="bell-outline" size={28} color="#172033" />
        </View>

        <View style={styles.banner}>
          <PrimaryAdminMetric
            label="Total Customers"
            value="256"
            change="12% this month"
          />
          <PrimaryAdminMetric
            label="Active Stamps"
            value="128"
            change="8% this month"
          />
          <PrimaryAdminMetric
            label="Redemptions"
            value="34"
            change="15% this month"
          />
        </View>

        <PrimaryText text="Quick Actions" customStyle={styles.heading} />
        <PrimaryAdminActionGrid actions={actions} />

        <View style={styles.callout}>
          <View style={styles.calloutCopy}>
            <PrimaryText
              text="Boost Engagement!"
              customStyle={styles.calloutTitle}
            />
            <PrimaryText
              text="Create exciting rewards and keep your customers coming back."
              customStyle={styles.calloutText}
            />
          </View>
          <MaterialDesignIcons name="gift-outline" size={56} color="#8B5CF6" />
        </View>

        <View style={styles.sectionRow}>
          <PrimaryText text="Recent Activity" customStyle={styles.heading} />
          <PrimaryText text="View All" customStyle={styles.link} />
        </View>
        <View style={styles.activityCard}>
          <PrimaryAdminActivity
            title="New Customer"
            detail="Rahul Kumar joined your loyalty program"
            time="2m ago"
          />
          <PrimaryAdminActivity
            title="Reward Redeemed"
            detail="Free Coffee redeemed by Priya Singh"
            time="15m ago"
          />
          <PrimaryAdminActivity
            title="QR Scan"
            detail="QR Code scanned by Amit Verma"
            time="30m ago"
          />
          <PrimaryAdminActivity
            title="New Reward Created"
            detail="Buy 5 Get 1 Free added"
            time="1h ago"
          />
        </View>

        <View style={styles.sectionRow}>
          <PrimaryText text="Business Overview" customStyle={styles.heading} />
          <PrimaryText text="This Month  ˅" customStyle={styles.linkMuted} />
        </View>
        <View style={styles.overviewRow}>
          <PrimaryAdminStatCard
            label="Total Customers"
            value="256"
            change="12%"
            color="#F2EAFF"
          />
          <PrimaryAdminStatCard
            label="Active Stamps"
            value="128"
            change="8%"
            color="#ECF9F0"
          />
          <PrimaryAdminStatCard
            label="Redemptions"
            value="34"
            change="15%"
            color="#FFF7E7"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingTop: 24, paddingBottom: 30 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerCopy: { flex: 1, marginHorizontal: 14 },
  title: { fontSize: 22, fontWeight: '800', color: '#172033' },
  subtitle: { marginTop: 3, fontSize: 13, color: '#64748B' },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#7139EF',
    borderRadius: 22,
    paddingVertical: 20,
    marginBottom: 28,
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
    marginVertical: 26,
  },
  calloutCopy: { flex: 1, paddingRight: 10 },
  calloutTitle: {
    color: '#7B3FF2',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 9,
  },
  calloutText: { color: '#64748B', fontSize: 13, lineHeight: 19 },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: { color: '#7B3FF2', fontSize: 13, fontWeight: '700' },
  linkMuted: { color: '#64748B', fontSize: 12 },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    marginBottom: 26,
    elevation: 2,
  },
  overviewRow: { flexDirection: 'row', gap: 10 },
});
