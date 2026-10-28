import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryText from '../../components/text/PrimaryText';
import PrimarySearchBar from '../../components/searchBar/PrimarySearchBar';
import PrimaryLoyaltyStampCard from '../../components/cards/loyaltyStampCard/PrimaryLoyaltyStampCard';

const MyCardsScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <PrimaryText text="My Cards" customStyle={styles.title} />
      </View>

      <View style={styles.searchContainer}>
        <PrimarySearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search cards..."
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.cardsList}
        showsVerticalScrollIndicator={false}
      >
        <PrimaryLoyaltyStampCard
          merchantName="Brew & Beans"
          rewardText="Buy 10 coffees, get 1 free!"
          currentStamps={7}
          totalStamps={10}
        />
        <PrimaryLoyaltyStampCard
          merchantName="Brew & Beans"
          rewardText="Buy 10 coffees, get 1 free!"
          currentStamps={3}
          totalStamps={10}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyCardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  cardsList: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 100,
  },
});