import React from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PrimaryText from '../text/PrimaryText';

interface PrimaryHeaderProps {
    name?: string;
    subtitle?: string;
    notificationCount?: number;
    onMenuPress?: () => void;
    onNotificationPress?: () => void;
    style?: ViewStyle;
}

const PrimaryHeader = ({
    name = 'User',
    subtitle = 'Collect stamps. Earn rewards.',
    notificationCount = 0,
    onMenuPress,
    onNotificationPress,
    style,
}: PrimaryHeaderProps) => {
    return (
        <View style={[styles.container, style]}>
            <Pressable
                onPress={onMenuPress}
                hitSlop={10}
                style={({ pressed }) => [
                    styles.iconButton,
                    pressed && styles.buttonPressed,
                ]}>
                <MaterialDesignIcons
                    name="menu"
                    size={22}
                    color="#475569"
                />
            </Pressable>
            <View style={styles.content}>
                <PrimaryText text={`Good morning, ${name}! 👋`} customStyle={styles.greeting} />
                <PrimaryText text={subtitle} customStyle={styles.subtitle} />
            </View>
            <Pressable
                onPress={onNotificationPress}
                hitSlop={10}
                style={({ pressed }) => [
                    styles.iconButton,
                    pressed && styles.buttonPressed,
                ]}>

                <MaterialDesignIcons
                    name="bell-outline"
                    size={21}
                    color="#475569"
                />

                {notificationCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {notificationCount > 9
                                ? '9+'
                                : notificationCount}
                        </Text>
                    </View>
                )}
            </Pressable>
        </View>
    );
};

export default PrimaryHeader;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        marginHorizontal: 12,
    },
    greeting: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
    },

    subtitle: {
        marginTop: 2,
        fontSize: 13,
        fontWeight: '400',
        color: '#64748B',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonPressed: {
        opacity: 0.6,
        backgroundColor: '#F8FAFC',
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: -2,
        minWidth: 16,
        height: 16,
        paddingHorizontal: 4,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7C3AED',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    badgeText: {
        fontSize: 8,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});