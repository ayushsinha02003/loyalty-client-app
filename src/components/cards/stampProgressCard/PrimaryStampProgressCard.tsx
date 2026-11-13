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
import { Gift, Star, Ticket } from 'lucide-react-native';
import PrimaryText from '../../text/PrimaryText';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

const defaultStampReward = require('../../../assets/images/stamp-reward.png');

interface PrimaryStampProgressCardProps {
    currentStamps: number;
    totalStamps: number;
    title?: string;
    message?: string;
    image?: ImageSourcePropType;
    icon?: string;
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

    const renderLeadingIcon = () => {
        if (icon && icon.includes('gift')) {
            return (
                <View style={styles.vectorIconBox}>
                    <Gift size={26} strokeWidth={2} color={PALETTE.primary} />
                </View>
            );
        }
        if (icon && icon.includes('star')) {
            return (
                <View style={styles.vectorIconBox}>
                    <Star size={26} strokeWidth={2} color={PALETTE.warning} />
                </View>
            );
        }
        return (
            <Image
                source={image || defaultStampReward}
                style={styles.image}
                resizeMode="contain"
            />
        );
    };

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
                    renderLeadingIcon()
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
                        <Ticket size={12} strokeWidth={2} color={PALETTE.primary} style={styles.badgeIcon} />
                        <PrimaryText text={`${remaining} to go`} customStyle={styles.badgeText} />
                    </View>
                ) : (
                    <View style={styles.badge}>
                        <Gift size={12} strokeWidth={2} color={PALETTE.warning} style={styles.badgeIcon} />
                        <PrimaryText text="Reward Ready!" customStyle={styles.badgeText} />
                    </View>
                )}
            </View>
            <View style={styles.progressContainer}>
                <Svg width={size} height={size} style={styles.progressSvg}>
                    <Defs>
                        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <Stop offset="0%" stopColor={PALETTE.primary} stopOpacity="1" />
                            <Stop offset="100%" stopColor={PALETTE.warning} stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={PALETTE.border}
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
        minHeight: 120,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: PALETTE.surface,
        borderRadius: RADII.xl,
        borderWidth: 1,
        borderColor: PALETTE.border,
        paddingVertical: 18,
        paddingHorizontal: 18,
        ...SHADOWS.softCard,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: RADII.lg,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    vectorIconBox: {
        width: 56,
        height: 56,
        borderRadius: RADII.lg,
        backgroundColor: PALETTE.illusCoralBg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: RADII.lg,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        ...TYPOGRAPHY.labelUppercase,
        color: PALETTE.onSurfaceVariant,
    },
    stampRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 2,
    },
    currentStamp: {
        fontSize: 32,
        lineHeight: 38,
        fontWeight: '800',
        letterSpacing: -0.64,
        color: PALETTE.onSurface,
    },
    totalStamp: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: '600',
        color: PALETTE.onSurfaceMuted,
        marginBottom: 4,
    },
    message: {
        ...TYPOGRAPHY.caption,
        color: PALETTE.onSurfaceVariant,
        marginTop: 2,
    },
    badge: {
        marginTop: 10,
        alignSelf: 'flex-start',
        backgroundColor: PALETTE.surfaceContrast,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: RADII.full,
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeIcon: {
        marginRight: 6,
    },
    badgeText: {
        ...TYPOGRAPHY.labelSm,
        color: PALETTE.surface,
    },
    progressContainer: {
        width: 86,
        height: 86,
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
        letterSpacing: -0.2,
        color: PALETTE.onSurface,
    },
});
