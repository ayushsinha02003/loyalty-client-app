import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import PrimaryHeader from '../../components/common/PrimaryHeader';
import PrimaryStampProgressCard from '../../components/cards/stampProgressCard/PrimaryStampProgressCard';
import PrimaryText from '../../components/text/PrimaryText';
import PrimaryLoyaltyStampCard from '../../components/cards/loyaltyStampCard/PrimaryLoyaltyStampCard';
import LoyaltySteps from '../../components/loyalty/PrimaryLoyaltyStampCard';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <PrimaryHeader
        name="Ayush"
        subtitle="Collect stamps. Earn rewards."
        notificationCount={3}
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
      >
        <PrimaryStampProgressCard
          currentStamps={7}
          totalStamps={10}
        />

        <View style={styles.titleContainer}>
          <PrimaryText text="My Stamp Cards" customStyle={styles.title} />
          <PrimaryText text="See all" customStyle={styles.seeAll} />
        </View>

        <PrimaryLoyaltyStampCard
          merchantName="Brew & Beans"
          rewardText="Buy 10 coffees, get 1 free!"
          currentStamps={7}
          totalStamps={10}
        />

        <View style={styles.titleContainer}>
          <PrimaryText text="How It Works" customStyle={styles.title} />
        </View>

        <LoyaltySteps />
      </ScrollView>
    </View>
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
});