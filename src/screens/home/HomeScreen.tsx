import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser } from '../../services/authService';
import PrimaryHeader from '../../components/common/PrimaryHeader';
import PrimaryStampProgressCard from '../../components/cards/stampProgressCard/PrimaryStampProgressCard';
import PrimaryText from '../../components/text/PrimaryText';
import PrimaryLoyaltyStampCard from '../../components/cards/loyaltyStampCard/PrimaryLoyaltyStampCard';
import LoyaltySteps from '../../components/loyalty/PrimaryLoyaltyStampCard';
import { useCustomerDashboard } from '../../hooks/useApi';

interface HomeScreenProps {
  onOpenScanner?: () => void;
  onSeeAll?: () => void;
}

const HomeScreen = ({ onOpenScanner, onSeeAll }: HomeScreenProps) => {
  const { dashboard, loading, error, refetch } = useCustomerDashboard();
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.name) {
      setUserName(user.name);
    }
  }, []);

  const handleRefresh = () => {
    refetch();
  };

  // Get the first active card for progress display
  const activeCard = dashboard?.customerCards?.find((card: any) => !card.isRewardAvailable);
  const completedCard = dashboard?.customerCards?.find((card: any) => card.isRewardAvailable);

  const displayCard = activeCard || completedCard || dashboard?.customerCards?.[0];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <PrimaryHeader
          name={userName}
          subtitle="Collect stamps. Earn rewards."
          notificationCount={0}
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading your dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <PrimaryHeader
          name={userName}
          subtitle="Collect stamps. Earn rewards."
          notificationCount={0}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PrimaryHeader
        name={userName}
        subtitle="Collect stamps. Earn rewards."
        notificationCount={dashboard?.customerCards?.filter((c: any) => c.isRewardAvailable).length || 0}
        onMenuPress={() => {
          console.log('Menu pressed');
        }}
        onNotificationPress={() => {
          console.log('Notification pressed');
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        {displayCard ? (
          <PrimaryStampProgressCard
            currentStamps={displayCard.currentStamps || 0}
            totalStamps={displayCard.loyaltyCard?.totalStamps || 10}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Stamp Cards Yet</Text>
            <Text style={styles.emptySubtitle}>
              Scan a QR code at a participating business to join their loyalty program!
            </Text>
            {onOpenScanner && (
              <TouchableOpacity
                style={styles.scanButton}
                onPress={onOpenScanner}
                activeOpacity={0.8}
              >
                <Text style={styles.scanButtonText}>📷 Open QR Scanner</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.titleContainer}>
          <PrimaryText text="My Stamp Cards" customStyle={styles.title} />
          <TouchableOpacity onPress={onSeeAll}>
            <PrimaryText text="See all" customStyle={styles.seeAll} />
          </TouchableOpacity>
        </View>

        {dashboard?.customerCards && dashboard.customerCards.length > 0 ? (
          dashboard.customerCards.map((card: any) => (
            <PrimaryLoyaltyStampCard
              key={card._id}
              merchantName={card.loyaltyCard?.business?.businessName || card.loyaltyCard?.title || 'Unknown Business'}
              rewardText={card.loyaltyCard?.reward || 'Earn rewards!'}
              currentStamps={card.currentStamps || 0}
              totalStamps={card.loyaltyCard?.totalStamps || 10}
              isRewardAvailable={card.isRewardAvailable}
              backgroundColor={card.loyaltyCard?.backgroundColor}
              textColor={card.loyaltyCard?.textColor}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Stamp Cards Yet</Text>
            <Text style={styles.emptySubtitle}>
              Scan a QR code at a participating business to join their loyalty program!
            </Text>
            {onOpenScanner && (
              <TouchableOpacity
                style={styles.scanButton}
                onPress={onOpenScanner}
                activeOpacity={0.8}
              >
                <Text style={styles.scanButtonText}>📷 Open QR Scanner</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.titleContainer}>
          <PrimaryText text="How It Works" customStyle={styles.title} />
        </View>

        <LoyaltySteps />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  seeAll: {
    fontSize: 14,
    color: '#7B3FF2',
    fontWeight: '600',
  },
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  scanButton: {
    backgroundColor: '#7B3FF2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#7B3FF2',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
