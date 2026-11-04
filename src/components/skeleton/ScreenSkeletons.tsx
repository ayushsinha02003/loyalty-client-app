import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SkeletonBox, SkeletonCircle, SkeletonText } from './Skeleton';

// ==========================================
// 1. CUSTOMER: HOME SKELETON
// ==========================================
export const HomeScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header Skeleton */}
      <View style={styles.homeHeader}>
        <View style={styles.flex1}>
          <SkeletonText width={170} height={20} style={styles.mb8} />
          <SkeletonText width={120} height={13} />
        </View>
        <SkeletonCircle size={40} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Stamp Progress Card Skeleton */}
        <View style={styles.cardContainer}>
          <View style={styles.rowBetween}>
            <SkeletonText width={110} height={14} />
            <SkeletonBox width={60} height={22} borderRadius={11} />
          </View>
          <View style={styles.mv16}>
            <SkeletonText width={90} height={32} style={styles.mb8} />
            <SkeletonBox width="100%" height={10} borderRadius={5} />
          </View>
          <View style={styles.dotsRow}>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCircle key={i} size={30} style={styles.mr6} />
            ))}
          </View>
        </View>

        {/* Section Title Skeleton */}
        <View style={[styles.rowBetween, styles.mt20, styles.mb14]}>
          <SkeletonText width={140} height={20} />
          <SkeletonText width={50} height={14} />
        </View>

        {/* Stamp Cards Skeletons */}
        {Array.from({ length: 2 }).map((_, index) => (
          <View key={index} style={[styles.stampCardSkeleton, styles.mb16]}>
            <View style={styles.rowBetween}>
              <View style={styles.flex1}>
                <SkeletonText width={150} height={18} style={styles.mb6} />
                <SkeletonText width={100} height={13} />
              </View>
              <SkeletonCircle size={38} />
            </View>
            <View style={[styles.dotsGrid, styles.mv14]}>
              {Array.from({ length: 10 }).map((__, dotIdx) => (
                <SkeletonCircle key={dotIdx} size={32} style={styles.dotItem} />
              ))}
            </View>
            <View style={styles.cardFooter}>
              <SkeletonText width={180} height={14} />
              <SkeletonBox width={70} height={24} borderRadius={12} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 2. CUSTOMER: MY CARDS SKELETON
// ==========================================
export const MyCardsScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerBar}>
        <SkeletonText width={120} height={24} />
      </View>

      <View style={styles.searchBarContainer}>
        <SkeletonBox width="100%" height={48} borderRadius={14} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <View key={idx} style={[styles.stampCardSkeleton, styles.mb16]}>
            <View style={styles.rowBetween}>
              <View style={styles.flex1}>
                <SkeletonText width={160} height={18} style={styles.mb6} />
                <SkeletonText width={110} height={13} />
              </View>
              <SkeletonBox width={65} height={26} borderRadius={13} />
            </View>
            <View style={[styles.dotsGrid, styles.mv14]}>
              {Array.from({ length: 10 }).map((__, i) => (
                <SkeletonCircle key={i} size={32} style={styles.dotItem} />
              ))}
            </View>
            <View style={styles.cardFooter}>
              <SkeletonText width={170} height={14} />
              <SkeletonBox width={80} height={26} borderRadius={13} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 3. CUSTOMER: SEARCH / DISCOVER SKELETON
// ==========================================
export const SearchScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerBar}>
        <SkeletonText width={180} height={24} style={styles.mb6} />
        <SkeletonText width={220} height={14} />
      </View>

      <View style={styles.searchBarContainer}>
        <SkeletonBox width="100%" height={48} borderRadius={14} />
      </View>

      {/* Category Pills Row */}
      <View style={[styles.pillRow, styles.mb16]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBox key={i} width={72} height={34} borderRadius={17} style={styles.mr8} />
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <View key={idx} style={[styles.exploreCardSkeleton, styles.mb16]}>
            <View style={styles.rowStart}>
              <SkeletonCircle size={46} style={styles.mr12} />
              <View style={styles.flex1}>
                <SkeletonText width={150} height={18} style={styles.mb6} />
                <SkeletonText width={90} height={13} />
              </View>
              <SkeletonBox width={76} height={34} borderRadius={12} />
            </View>
            <View style={styles.mt12}>
              <SkeletonText width="100%" height={12} style={styles.mb6} />
              <SkeletonText width="70%" height={12} />
            </View>
            <View style={[styles.rowBetween, styles.mt14]}>
              <SkeletonBox width={130} height={24} borderRadius={12} />
              <SkeletonText width={80} height={13} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 4. CUSTOMER: REWARDS SKELETON
// ==========================================
export const RewardsScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerBar}>
        <SkeletonText width={140} height={24} style={styles.mb6} />
        <SkeletonText width={200} height={14} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={[styles.cardContainer, styles.mb18]}>
          <View style={styles.rowBetween}>
            <View style={styles.centerItem}>
              <SkeletonText width={70} height={13} style={styles.mb6} />
              <SkeletonText width={45} height={28} />
            </View>
            <View style={styles.dividerVertical} />
            <View style={styles.centerItem}>
              <SkeletonText width={70} height={13} style={styles.mb6} />
              <SkeletonText width={45} height={28} />
            </View>
          </View>
        </View>

        {/* Reward Items */}
        {Array.from({ length: 3 }).map((_, idx) => (
          <View key={idx} style={[styles.rewardCardSkeleton, styles.mb14]}>
            <View style={styles.rowStart}>
              <SkeletonCircle size={48} style={styles.mr12} />
              <View style={styles.flex1}>
                <SkeletonText width={140} height={17} style={styles.mb6} />
                <SkeletonText width={190} height={13} />
              </View>
              <SkeletonBox width={85} height={36} borderRadius={12} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 5. CUSTOMER: ACTIVITY SKELETON
// ==========================================
export const ActivityScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerBar}>
        <SkeletonText width={160} height={24} />
      </View>

      {/* Filter Tabs */}
      <View style={[styles.pillRow, styles.mb16]}>
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonBox key={i} width={80} height={36} borderRadius={18} style={styles.mr10} />
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <View key={idx} style={[styles.activityRowSkeleton, styles.mb12]}>
            <SkeletonCircle size={44} style={styles.mr12} />
            <View style={styles.flex1}>
              <SkeletonText width={130} height={16} style={styles.mb6} />
              <SkeletonText width={90} height={12} />
            </View>
            <SkeletonBox width={65} height={26} borderRadius={13} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 6. CUSTOMER: PROFILE SKELETON
// ==========================================
export const ProfileScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerBar}>
        <SkeletonText width={110} height={24} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={[styles.cardContainer, styles.centerAlign, styles.mb18]}>
          <SkeletonCircle size={76} style={styles.mb12} />
          <SkeletonText width={150} height={20} style={styles.mb6} />
          <SkeletonText width={100} height={14} style={styles.mb10} />
          <SkeletonBox width={80} height={24} borderRadius={12} />
        </View>

        {/* Stats 3-Grid */}
        <View style={[styles.rowBetween, styles.mb20]}>
          {Array.from({ length: 3 }).map((_, i) => (
            <View key={i} style={styles.statBoxSkeleton}>
              <SkeletonText width={30} height={24} style={styles.mb6} />
              <SkeletonText width={60} height={12} />
            </View>
          ))}
        </View>

        {/* Menu items */}
        {Array.from({ length: 4 }).map((_, i) => (
          <View key={i} style={[styles.menuItemSkeleton, styles.mb12]}>
            <SkeletonCircle size={36} style={styles.mr12} />
            <SkeletonText width={120} height={16} style={styles.flex1} />
            <SkeletonBox width={16} height={16} borderRadius={8} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 7. ADMIN: HOME SKELETON
// ==========================================
export const AdminHomeScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Admin Header */}
      <View style={styles.homeHeader}>
        <View style={styles.flex1}>
          <SkeletonText width={150} height={20} style={styles.mb6} />
          <SkeletonText width={110} height={13} />
        </View>
        <SkeletonCircle size={40} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 2x2 Metric Grid */}
        <View style={styles.adminGrid}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <View key={idx} style={styles.adminMetricSkeleton}>
              <SkeletonText width={65} height={12} style={styles.mb8} />
              <SkeletonText width={45} height={26} style={styles.mb8} />
              <SkeletonBox width={55} height={14} borderRadius={7} />
            </View>
          ))}
        </View>

        {/* Quick Actions Title */}
        <View style={[styles.rowBetween, styles.mt20, styles.mb12]}>
          <SkeletonText width={120} height={18} />
        </View>

        {/* Quick Actions Grid */}
        <View style={[styles.rowBetween, styles.mb18]}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <View key={idx} style={styles.adminActionSkeleton}>
              <SkeletonCircle size={42} style={styles.mb8} />
              <SkeletonText width={50} height={11} />
            </View>
          ))}
        </View>

        {/* Callout Card */}
        <View style={styles.adminCalloutSkeleton}>
          <View style={styles.flex1}>
            <SkeletonText width={140} height={18} style={styles.mb8} />
            <SkeletonText width={200} height={13} />
          </View>
          <SkeletonCircle size={52} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 8. ADMIN: CUSTOMERS SKELETON
// ==========================================
export const AdminCustomersScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.rowBetween, styles.headerBar]}>
        <SkeletonText width={130} height={24} />
        <SkeletonBox width={92} height={36} borderRadius={12} />
      </View>

      <View style={styles.searchBarContainer}>
        <SkeletonBox width="100%" height={48} borderRadius={14} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <View key={idx} style={[styles.customerCardSkeleton, styles.mb14]}>
            <View style={styles.rowStart}>
              <SkeletonCircle size={46} style={styles.mr12} />
              <View style={styles.flex1}>
                <SkeletonText width={120} height={17} style={styles.mb6} />
                <SkeletonText width={85} height={13} style={styles.mb4} />
                <SkeletonText width={100} height={12} />
              </View>
              <SkeletonBox width={65} height={34} borderRadius={10} />
            </View>
            <View style={[styles.mt12, styles.pt10, styles.borderTop]}>
              <SkeletonBox width="100%" height={38} borderRadius={10} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 9. ADMIN: STAMP CARDS SKELETON
// ==========================================
export const AdminStampCardsScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.rowBetween, styles.headerBar]}>
        <SkeletonText width={140} height={24} />
        <SkeletonBox width={100} height={36} borderRadius={12} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 2 }).map((_, idx) => (
          <View key={idx} style={[styles.stampCardSkeleton, styles.mb16]}>
            <View style={styles.rowBetween}>
              <View style={styles.flex1}>
                <SkeletonText width={150} height={18} style={styles.mb6} />
                <SkeletonText width={180} height={13} />
              </View>
              <SkeletonCircle size={32} />
            </View>
            <View style={[styles.dotsGrid, styles.mv14]}>
              {Array.from({ length: 10 }).map((__, dotIdx) => (
                <SkeletonCircle key={dotIdx} size={32} style={styles.dotItem} />
              ))}
            </View>
            <View style={styles.cardFooter}>
              <SkeletonText width={140} height={14} />
              <SkeletonBox width={70} height={24} borderRadius={12} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 10. ADMIN: REWARDS SKELETON
// ==========================================
export const AdminRewardsScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.rowBetween, styles.headerBar]}>
        <SkeletonText width={120} height={24} />
        <SkeletonBox width={100} height={36} borderRadius={12} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <View key={idx} style={[styles.rewardCardSkeleton, styles.mb14]}>
            <View style={styles.rowStart}>
              <SkeletonCircle size={46} style={styles.mr12} />
              <View style={styles.flex1}>
                <SkeletonText width={130} height={17} style={styles.mb6} />
                <SkeletonText width={170} height={13} />
              </View>
              <SkeletonBox width={50} height={28} borderRadius={14} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 11. ADMIN: QR CODE SKELETON
// ==========================================
export const AdminQrCodeScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerBar}>
        <SkeletonText width={150} height={24} style={styles.mb6} />
        <SkeletonText width={190} height={13} />
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, styles.centerAlign]} showsVerticalScrollIndicator={false}>
        {/* QR Frame Skeleton */}
        <View style={[styles.qrFrameSkeleton, styles.mv16]}>
          <SkeletonBox width={220} height={220} borderRadius={18} />
          <View style={[styles.mv14, styles.centerAlign]}>
            <SkeletonText width={110} height={14} style={styles.mb6} />
            <SkeletonBox width={150} height={32} borderRadius={16} />
          </View>
        </View>

        {/* Buttons */}
        <View style={[styles.rowBetween, styles.fullWidth, styles.mb16]}>
          <SkeletonBox width="48%" height={46} borderRadius={12} />
          <SkeletonBox width="48%" height={46} borderRadius={12} />
        </View>

        {/* Instructions Box */}
        <View style={[styles.cardContainer, styles.fullWidth]}>
          <SkeletonText width={120} height={16} style={styles.mb8} />
          <SkeletonText width="100%" height={12} style={styles.mb6} />
          <SkeletonText width="80%" height={12} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 12. ADMIN: ANALYTICS SKELETON
// ==========================================
export const AdminAnalyticsScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerBar}>
        <SkeletonText width={130} height={24} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 2x2 Metric Grid */}
        <View style={styles.adminGrid}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <View key={idx} style={styles.adminMetricSkeleton}>
              <SkeletonText width={70} height={12} style={styles.mb8} />
              <SkeletonText width={50} height={26} />
            </View>
          ))}
        </View>

        {/* Performance Chart Card */}
        <View style={[styles.cardContainer, styles.mv16]}>
          <SkeletonText width={140} height={18} style={styles.mb14} />
          <View style={styles.chartBarsRow}>
            {Array.from({ length: 7 }).map((_, i) => (
              <View key={i} style={styles.chartCol}>
                <SkeletonBox width={24} height={40 + (i * 12)} borderRadius={6} />
                <SkeletonText width={20} height={10} style={styles.mt6} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 13. ADMIN: ACTIVITY SKELETON
// ==========================================
export const AdminActivityScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerBar}>
        <SkeletonText width={170} height={24} />
      </View>

      <View style={[styles.pillRow, styles.mb16]}>
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonBox key={i} width={80} height={36} borderRadius={18} style={styles.mr10} />
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <View key={idx} style={[styles.activityRowSkeleton, styles.mb12]}>
            <SkeletonCircle size={44} style={styles.mr12} />
            <View style={styles.flex1}>
              <SkeletonText width={140} height={16} style={styles.mb6} />
              <SkeletonText width={95} height={12} />
            </View>
            <SkeletonBox width={65} height={26} borderRadius={13} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// 14. ADMIN: BUSINESS PROFILE SKELETON
// ==========================================
export const AdminBusinessProfileScreenSkeleton = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.rowBetween, styles.headerBar]}>
        <SkeletonText width={160} height={24} />
        <SkeletonBox width={70} height={34} borderRadius={12} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.cardContainer, styles.centerAlign, styles.mb18]}>
          <SkeletonCircle size={76} style={styles.mb12} />
          <SkeletonText width={160} height={20} style={styles.mb6} />
          <SkeletonText width={100} height={14} />
        </View>

        {Array.from({ length: 4 }).map((_, i) => (
          <View key={i} style={[styles.cardContainer, styles.mb12]}>
            <SkeletonText width={90} height={12} style={styles.mb6} />
            <SkeletonText width={180} height={16} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ==========================================
// SHARED STYLES
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 90,
  },
  homeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  pillRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stampCardSkeleton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderLeftWidth: 4,
    borderLeftColor: '#CBD5E1',
  },
  exploreCardSkeleton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  rewardCardSkeleton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  customerCardSkeleton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activityRowSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuItemSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statBoxSkeleton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  adminGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  adminMetricSkeleton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  adminActionSkeleton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    marginHorizontal: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  adminCalloutSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  qrFrameSkeleton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chartBarsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 140,
    paddingTop: 10,
  },
  chartCol: {
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dotItem: {
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerItem: {
    flex: 1,
    alignItems: 'center',
  },
  centerAlign: {
    alignItems: 'center',
  },
  dividerVertical: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  fullWidth: {
    width: '100%',
  },
  flex1: {
    flex: 1,
  },
  mb4: { marginBottom: 4 },
  mb6: { marginBottom: 6 },
  mb8: { marginBottom: 8 },
  mb10: { marginBottom: 10 },
  mb12: { marginBottom: 12 },
  mb14: { marginBottom: 14 },
  mb16: { marginBottom: 16 },
  mb18: { marginBottom: 18 },
  mb20: { marginBottom: 20 },
  mt6: { marginTop: 6 },
  mt12: { marginTop: 12 },
  mt14: { marginTop: 14 },
  mt20: { marginTop: 20 },
  mr6: { marginRight: 6 },
  mr8: { marginRight: 8 },
  mr10: { marginRight: 10 },
  mr12: { marginRight: 12 },
  mv14: { marginVertical: 14 },
  mv16: { marginVertical: 16 },
  pt10: { paddingTop: 10 },
});
