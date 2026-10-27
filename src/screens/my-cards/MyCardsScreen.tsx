import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryText from '../../components/text/PrimaryText';
import PrimarySearchBar from '../../components/searchBar/PrimarySearchBar';
import PrimaryLoyaltyStampCard from '../../components/cards/loyaltyStampCard/PrimaryLoyaltyStampCard';

const MyCardsScreen = () => {
    return (
        <SafeAreaView
            style={styles.container}
            edges={['top']}
        >
            <View style={styles.header}>
                <PrimaryText
                    text="My Cards"
                    customStyle={styles.title}
                />
            <PrimarySearchBar
                value=""
                onChangeText={() => {}}
                placeholder="Search Cards"
            />
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
            </View>
        </SafeAreaView>
    );
};

export default MyCardsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 8,
    },

    header: {
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 15,
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#111827',
    },
});