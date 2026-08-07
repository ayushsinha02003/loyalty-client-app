import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
    Pressable,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PrimaryText from '../../text/PrimaryText';

interface PrimaryLoyaltyStampCardProps {
    merchantName: string;
    rewardText: string;
    currentStamps: number;
    totalStamps: number;
    merchantImage?: ImageSourcePropType;
    activeColor?: string;
    merchantIconBackground?: string;
    customStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

const PrimaryLoyaltyStampCard = ({
    merchantName,
    rewardText,
    currentStamps,
    totalStamps,
    merchantImage,
    activeColor = '#6D3DF5',
    merchantIconBackground = '#173D20',
    customStyle,
    onPress,
}: PrimaryLoyaltyStampCardProps) => {
    // Make sure current stamps never exceed total stamps
    const safeCurrentStamps = Math.min(
        Math.max(currentStamps, 0),
        totalStamps,
    );
    const stamps = Array.from(
        { length: totalStamps },
        (_, index) => index + 1,
    );

    return (
        <Pressable
            onPress={onPress}
            disabled={!onPress}
            style={({ pressed }) => [
                styles.card,
                customStyle,
                pressed && styles.cardPressed,
            ]}>
            {/* Merchant Information */}
            <View style={styles.header}>
                <View style={styles.merchantInfo}>
                    {/* Merchant Logo */}
                    <View
                        style={[
                            styles.merchantIcon,
                            {
                                backgroundColor: merchantIconBackground,
                            },
                        ]}>

                        {merchantImage ? (
                            <Image
                                source={merchantImage}
                                style={styles.merchantImage}
                                resizeMode="contain"
                            />
                        ) : (
                            <MaterialDesignIcons
                                name="store-outline"
                                size={22}
                                color="#FFFFFF"
                            />
                        )}
                    </View>

                    {/* Name + Reward */}
                    <View style={styles.merchantTextContainer}>
                        <PrimaryText
                            text={merchantName}
                            customStyle={styles.merchantName}
                            numberOfLines={1}
                        />
                        <PrimaryText
                            text={rewardText}
                            customStyle={styles.rewardText}
                            numberOfLines={1}
                        />
                    </View>
                </View>

                {/* Progress Badge */}
                <View
                    style={[
                        styles.progressBadge,
                        {
                            backgroundColor: `${activeColor}15`,
                        },
                    ]}>
                    <PrimaryText
                        text={`${safeCurrentStamps} / ${totalStamps}`}
                        customStyle={[
                            styles.progressText,
                            {
                                color: activeColor,
                            },
                        ]}
                    />
                </View>
            </View>

            {/* Stamp Row */}
            <View style={styles.stampContainer}>
                {stamps.map(stampNumber => {
                    const earned = stampNumber <= safeCurrentStamps;
                    return (
                        <View
                            key={stampNumber}
                            style={[
                                styles.stamp,
                                earned
                                    ? {
                                        backgroundColor: activeColor,
                                        borderColor: activeColor,
                                    }
                                    : styles.stampInactive,
                            ]}>
                            {earned ? (
                                <MaterialDesignIcons
                                    name="star"
                                    size={18}
                                    color="#FFFFFF"
                                />
                            ) : (
                                <PrimaryText
                                    text={stampNumber}
                                    customStyle={styles.stampNumber}
                                />
                            )}
                        </View>
                    );
                })}
            </View>
        </Pressable>
    );
};

export default PrimaryLoyaltyStampCard;

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#EEF0F4',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    cardPressed: {
        opacity: 0.92,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    merchantInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    merchantIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    merchantImage: {
        width: 30,
        height: 30,
    },
    merchantTextContainer: {
        flex: 1,
    },
    merchantName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    rewardText: {
        marginTop: 2,
        fontSize: 12,
        fontWeight: '400',
        color: '#6B7280',
    },
    progressBadge: {
        minWidth: 48,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    progressText: {
        fontSize: 12,
        fontWeight: '700',
    },
    stampContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    stamp: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    stampInactive: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
    },
    stampNumber: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9CA3AF',
    },
});