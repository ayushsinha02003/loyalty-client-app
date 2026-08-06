import React from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

type TabId = 'Home' | 'MyCards' | 'Rewards' | 'Profile';
interface BottomNavProps {
    activeTab: TabId;
    onTabPress: (tab: TabId) => void;
    bottomInset?: number;
}

const tabs: Array<{
    id: TabId;
    label: string;
    icon: string;
    activeIcon: string;
}> = [
        {
            id: 'Home',
            label: 'Home',
            icon: 'home-outline',
            activeIcon: 'home',
        },
        {
            id: 'MyCards',
            label: 'My Cards',
            icon: 'credit-card-outline',
            activeIcon: 'credit-card',
        },
        {
            id: 'Rewards',
            label: 'Rewards',
            icon: 'gift-outline',
            activeIcon: 'gift',
        },
        {
            id: 'Profile',
            label: 'Profile',
            icon: 'account-outline',
            activeIcon: 'account',
        },
    ];

export type { TabId };
export function isTabId(value: string): value is TabId {
    return tabs.some(tab => tab.id === value);
}

export default function BottomNav({
    activeTab,
    onTabPress,
    bottomInset = 0,
}: BottomNavProps) {
    return (
        <View
            style={[
                styles.wrapper,
                {
                    paddingBottom: Math.max(bottomInset, 10),
                },
            ]}>
            <View style={styles.navbar}>
                {tabs.map(tab => {
                    const selected = activeTab === tab.id;
                    return (
                        <Pressable
                            key={tab.id}
                            onPress={() => onTabPress(tab.id)}
                            style={({ pressed }) => [
                                styles.navItem,
                                pressed && styles.pressed,
                            ]}
                            android_ripple={{
                                color: '#EDE9FE',
                                borderless: true,
                            }}>
                            <View
                                style={[
                                    styles.iconContainer,
                                    selected && styles.iconContainerActive,
                                ]}>
                                <MaterialDesignIcons
                                    name={selected ? tab.activeIcon : tab.icon}
                                    size={24}
                                    color={selected ? '#FFFFFF' : '#9CA3AF'}
                                />
                            </View>
                            {selected && (
                                <Text style={styles.activeLabel}>
                                    {tab.label}
                                </Text>
                            )}
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 16,
    },
    navbar: {
        minHeight: 68,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 7,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
    },
    iconContainerActive: {
        backgroundColor: '#7C3AED',
        borderRadius: 14,
    },
    activeLabel: {
        marginTop: 4,
        fontSize: 11,
        fontWeight: '700',
        color: '#7C3AED',
    },
    pressed: {
        opacity: 0.7,
    },
});