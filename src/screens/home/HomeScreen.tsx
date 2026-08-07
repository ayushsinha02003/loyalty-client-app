import React from 'react';
import {
  View,
  StyleSheet,
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

      <View style={styles.content}>
        <PrimaryStampProgressCard
          currentStamps={7}
          totalStamps={10}
        />
        <View style={styles.titleContainer}>
          <PrimaryText text="My Stamp Cards" customStyle={styles.title} />
          <PrimaryText text="See all" />
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
      </View>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f7',
  },
  content: {
    flex: 1,
    padding: 5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",

  },
});