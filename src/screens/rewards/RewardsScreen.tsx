import React, { useMemo, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';

type RewardStatus = 'available' | 'claimed';

type Reward = {
    id: number;
    title: string;
    stamps: string;
    image: string;
    status: RewardStatus;
};

const initialRewards: Reward[] = [
    {
        id: 1,
        title: 'Free Coffee',
        stamps: '100 Stamps',
        image: 'https://cdn-icons-png.flaticon.com/512/924/924514.png',
        status: 'available',
    },
    {
        id: 2,
        title: '20% OFF',
        stamps: '200 Stamps',
        image: 'https://cdn-icons-png.flaticon.com/512/5787/5787016.png',
        status: 'claimed',
    },
    {
        id: 3,
        title: 'Free Pastry',
        stamps: '150 Stamps',
        image: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
        status: 'available',
    },
    {
        id: 4,
        title: 'Buy 1 Get 1',
        stamps: '250 Stamps',
        image: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
        status: 'claimed',
    },
];

type TabKey = 'all' | 'available' | 'claimed';

const tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: 'All Rewards' },
    { key: 'available', label: 'Available' },
    { key: 'claimed', label: 'Claimed' },
];

const RewardsScreen = () => {
    const [activeTab, setActiveTab] = useState<TabKey>('all');
    const [rewards, setRewards] = useState<Reward[]>(initialRewards);

    const filteredRewards = useMemo(() => {
        if (activeTab === 'available') {
            return rewards.filter(item => item.status === 'available');
        }

        if (activeTab === 'claimed') {
            return rewards.filter(item => item.status === 'claimed');
        }

        return rewards;
    }, [activeTab, rewards]);

    const handleRedeem = (id: number) => {
        setRewards(currentRewards =>
            currentRewards.map(item =>
                item.id === id ? { ...item, status: 'claimed' } : item,
            ),
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rewards</Text>

            <View style={styles.tabs}>
                {tabs.map(tab => {
                    const isActive = activeTab === tab.key;

                    return (
                        <TouchableOpacity
                            key={tab.key}
                            style={[styles.tab, isActive && styles.activeTab]}
                            onPress={() => setActiveTab(tab.key)}
                        >
                            <Text style={[styles.tabText, isActive && styles.activeText]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {filteredRewards.map(item => {
                    const isClaimed = item.status === 'claimed';

                    return (
                        <View key={item.id} style={styles.card}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.image}
                            />

                            <View style={styles.info}>
                                <Text style={styles.rewardTitle}>{item.title}</Text>
                                <Text style={styles.rewardStamp}>{item.stamps}</Text>
                            </View>

                            <TouchableOpacity
                                style={[styles.button, isClaimed && styles.claimedButton]}
                                onPress={() => !isClaimed && handleRedeem(item.id)}
                                disabled={isClaimed}
                            >
                                <Text style={styles.buttonText}>
                                    {isClaimed ? 'Claimed' : 'Redeem'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default RewardsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 18,
        paddingTop: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 20,
    },

    tabs: {
        flexDirection: 'row',
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 10,
    },

    tab: {
        backgroundColor: '#ECECEC',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },

    activeTab: {
        backgroundColor: '#6D28D9',
    },

    activeText: {
        color: '#fff',
        fontWeight: '600',
    },

    tabText: {
        color: '#666',
        fontWeight: '500',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
    },

    image: {
        width: 55,
        height: 55,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
    },

    info: {
        flex: 1,
        marginLeft: 15,
    },

    rewardTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
    },

    rewardStamp: {
        color: '#6B7280',
        marginTop: 4,
        fontSize: 14,
    },

    button: {
        backgroundColor: '#6D28D9',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
    },

    claimedButton: {
        backgroundColor: '#E5E7EB',
    },

    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});