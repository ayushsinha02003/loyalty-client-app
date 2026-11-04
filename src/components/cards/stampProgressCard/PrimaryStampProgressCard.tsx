import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
} from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PrimaryText from '../../text/PrimaryText';

interface PrimaryStampProgressCardProps {
    currentStamps: number;
    totalStamps: number;
    title?: string;
    message?: string;
    image?: ImageSourcePropType;
    icon?: React.ComponentProps<typeof MaterialDesignIcons>['name'];
    customStyle?: StyleProp<ViewStyle>;
}

const PrimaryStampProgressCard = ({
    currentStamps,
    totalStamps,
    title = 'TOTAL STAMPS',
    message = "You're on your way!",
    image,
    icon = 'trophy-award',
    customStyle,
}: PrimaryStampProgressCardProps) => {
    const percentage =
        totalStamps > 0
            ? Math.min(
                Math.max((currentStamps / totalStamps) * 100, 0),
                100,
            )
            : 0;

    const size = 88;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
        circumference - (percentage / 100) * circumference;
    const remaining = Math.max(totalStamps - currentStamps, 0);

    return (
        <View style={[styles.card, customStyle]}>
            <View style={styles.iconContainer}>
                {image ? (
                    <Image
                        source={image}
                        style={styles.image}
                        resizeMode="contain"
                    />
                ) : (
                    <View style={styles.vectorIconBox}>
                        <MaterialDesignIcons
                            name={icon}
                            size={36}
                            color="#FDE047"
                        />
                    </View>
                )}
            </View>
            <View style={styles.content}>
                <PrimaryText
                    text={title}
                    customStyle={styles.title}
                />
                <View style={styles.stampRow}>
                    <PrimaryText
                        text={currentStamps}
                        customStyle={styles.currentStamp}
                    />
                    <PrimaryText
                        text={`/${totalStamps}`}
                        customStyle={styles.totalStamp}
                    />
                </View>
                <PrimaryText
                    text={message}
                    customStyle={styles.message}
                    numberOfLines={1}
                />
                {remaining > 0 ? (
                    <View style={styles.badge}>
                        <MaterialDesignIcons name="ticket-percent-outline" size={13} color="#FFFFFF" style={styles.badgeIcon} />
                        <PrimaryText text={`${remaining} to go`} customStyle={styles.badgeText} />
                    </View>
                ) : (
                    <View style={[styles.badge, styles.badgeReady]}>
                        <MaterialDesignIcons name="gift" size={13} color="#FFFFFF" style={styles.badgeIcon} />
                        <PrimaryText text="Reward Ready!" customStyle={styles.badgeText} />
                    </View>
                )}
            </View>
            <View style={styles.progressContainer}>
                <Svg width={size} height={size} style={styles.progressSvg}>
                    <Defs>
                        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <Stop offset="0%" stopColor="#FDE047" stopOpacity="1" />
                            <Stop offset="60%" stopColor="#F59E0B" stopOpacity="1" />
                            <Stop offset="100%" stopColor="#EC4899" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="rgba(255,255,255,0.18)"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="url(#grad)"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        rotation="-90"
                        origin={`${size / 2}, ${size / 2}`}
                    />
                </Svg>

                <View style={styles.percentageContainer}>
                    <PrimaryText text={`${Math.round(percentage)}%`} customStyle={styles.percentage} />
                </View>
            </View>
        </View>
    );
};

export default PrimaryStampProgressCard;

const styles = StyleSheet.create({
    card: {
        width: '100%',
        minHeight: 110,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#5B21B6',
        borderRadius: 22,
        paddingVertical: 15,
        paddingHorizontal: 16,
        overflow: 'hidden',
        shadowColor: 'rgba(91, 33, 182, 0.28)',
        shadowOffset: {
            width: 0,
            height: 18,
        },
        shadowOpacity: 0.18,
        shadowRadius: 28,
        elevation: 8,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    vectorIconBox: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.14)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
    },
    image: {
        width: 56,
        height: 56,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 13,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.85)',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    stampRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    currentStamp: {
        fontSize: 34,
        lineHeight: 40,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    totalStamp: {
        marginLeft: 6,
        fontSize: 17,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.78)',
        marginBottom: 5,
    },
    message: {
        fontSize: 12,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.9)',
    },
    badge: {
        marginTop: 8,
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.14)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeReady: {
        backgroundColor: '#10B981',
    },
    badgeIcon: {
        marginRight: 4,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    progressContainer: {
        width: 88,
        height: 88,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    progressSvg: {
        position: 'absolute',
    },
    percentageContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    percentage: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FFFFFF',
    },
});
