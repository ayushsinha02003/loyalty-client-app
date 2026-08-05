import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

type TabId = 'Home' | 'MyCards' | 'Rewards' | 'Profile';

interface BottomNavProps {
    activeTab: TabId;
    onTabPress: (tab: TabId) => void;
    bottomInset?: number;
}

const tabs: Array<{ id: TabId; label: string; icon: string }> = [
    { id: 'Home', label: 'Home', icon: 'home' },
    { id: 'MyCards', label: 'My Cards', icon: 'credit-card' },
    { id: 'Rewards', label: 'Rewards', icon: 'gift-outline' },
    { id: 'Profile', label: 'Profile', icon: 'account-circle' },
];

export function isTabId(value: string): value is TabId {
    return tabs.some((tab) => tab.id === value);
}

export type { TabId };

export default function BottomNav({ activeTab, onTabPress, bottomInset = 12 }: BottomNavProps) {
    return (
        <View style={[styles.navbar, { paddingBottom: Math.max(bottomInset, 16) }]}>
            <View style={styles.navInner}>
                {tabs.map((tab) => {
                    const selected = tab.id === activeTab;
                    return (
                        <Pressable
                            key={tab.id}
                            onPress={() => onTabPress(tab.id)}
                            style={styles.navItem}
                            android_ripple={{ color: '#ffffff22' }}
                        >
                            <View style={[styles.tabPill, selected && styles.tabPillActive]}>
                                <MaterialDesignIcons
                                    name={tab.icon}
                                    size={20}
                                    color={selected ? '#fff' : '#e9d5ff'}
                                />
                                <Text style={[styles.navText]}>
                                    {tab.label}
                                </Text>
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#7c3aed',
        paddingTop: 5,
        paddingHorizontal: 10,
    },
    navInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    tabPill: {
        width: '100%',
        borderRadius: 32,
        paddingHorizontal: 10,
        paddingVertical: 2,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    tabPillActive: {
        backgroundColor: '#5b21b6',
        borderRadius: 32,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    navText: {
        marginTop: 4,
        fontSize: 12,
        color: '#e9d5ff',
        fontWeight: '600',
    },
});
