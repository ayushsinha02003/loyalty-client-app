import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import PrimaryText from '../../text/PrimaryText';
const defaultStampImage = require('../../../assets/images/stamp-reward.png');

interface PrimaryStampProgressCardProps {
    currentStamps: number;
    totalStamps: number;
    title?: string;
    message?: string;
    image?: ImageSourcePropType;
    customStyle?: StyleProp<ViewStyle>;
}
const PrimaryStampProgressCard = ({
    currentStamps,
    totalStamps,
    title = 'TOTAL STAMPS',
    message = "You're on your way! 🎉",
    image = defaultStampImage,
    customStyle,
}: PrimaryStampProgressCardProps) => {
    const percentage =
        totalStamps > 0
            ? Math.min(
                Math.max((currentStamps / totalStamps) * 100, 0),
                100,
            )
            : 0;

    const size = 72;
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
        circumference - (percentage / 100) * circumference;

    return (
        <View style={[styles.card, customStyle]}>

            <View style={styles.imageContainer}>
                <Image
                    source={image}
                    style={styles.image}
                    resizeMode="contain"
                />
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
            </View>

            <View style={styles.progressContainer}>
                <Svg
                    width={size}
                    height={size}
                    style={styles.progressSvg}>

                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="rgba(255,255,255,0.30)"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#FFFFFF"
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
                    <PrimaryText
                        text={`${Math.round(percentage)}%`}
                        customStyle={styles.percentage}
                    />
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
        backgroundColor: '#6335F5',
        borderRadius: 18,
        paddingHorizontal: 14,
        overflow: 'hidden',
        shadowColor: '#6D3DF5',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.22,
        shadowRadius: 10,
        elevation: 5,
    },
    imageContainer: {
        width: 72,
        height: 85,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    image: {
        width: 85,
        height: 100,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#EDE9FE',
        letterSpacing: 0.8,
    },
    stampRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 2,
    },
    currentStamp: {
        fontSize: 30,
        lineHeight: 34,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    totalStamp: {
        marginLeft: 2,
        fontSize: 18,
        fontWeight: '500',
        color: '#DDD6FE',
    },
    message: {
        marginTop: 1,
        fontSize: 12,
        fontWeight: '500',
        color: '#EDE9FE',
    },
    progressContainer: {
        width: 85,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
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