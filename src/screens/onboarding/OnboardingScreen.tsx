import React, { useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    FlatList,
    Dimensions,
    Pressable,
    NativeSyntheticEvent,
    NativeScrollEvent,
    ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryText from '../../components/text/PrimaryText';

const { width } = Dimensions.get('window');
interface OnboardingItem {
    id: number;
    title: string;
    highlight: string;
    description: string;
    image: ImageSourcePropType;
}
interface OnboardingScreenProps {
    onGetStarted: () => void;
}

const onboardingData: OnboardingItem[] = [
    {
        id: 1,
        title: 'Collect Stamps.',
        highlight: 'Earn Rewards.',
        description:
            'Visit your favorite places, collect stamps and enjoy exclusive rewards.',
        image: require('../../assets/images/onboarding/onboarding-1.png'),
    },
    {
        id: 2,
        title: 'Collect Stamps',
        highlight: 'Every Visit.',
        description:
            'Scan QR at the store or check-in to collect stamps on your digital loyalty cards.',
        image: require('../../assets/images/onboarding/onboarding-2.png'),
    },
    {
        id: 3,
        title: 'Earn Rewards',
        highlight: "You'll Love.",
        description:
            'Redeem exciting rewards and enjoy special offers from your favorite places.',
        image: require('../../assets/images/onboarding/onboarding-3.png'),
    },
];

const OnboardingScreen = ({
    onGetStarted,
}: OnboardingScreenProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList<OnboardingItem>>(null);

    const handleScroll = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
    };

    const handleGetStarted = () => {
        onGetStarted();
    };

    const handleSignIn = () => {
        console.log('Go to Login Screen');
    };

    const renderItem = ({
        item,
    }: {
        item: OnboardingItem;
    }) => {
        return (
            <View style={styles.slide}>
                <View style={styles.textSection}>
                    <PrimaryText
                        text={item.title}
                        customStyle={styles.title}
                    />
                    <PrimaryText
                        text={item.highlight}
                        customStyle={styles.highlight}
                    />
                    <PrimaryText
                        text={item.description}
                        customStyle={styles.description}
                    />
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={item.image}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={onboardingData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onMomentumScrollEnd={handleScroll}
            />

            <View style={styles.indicatorContainer}>
                {onboardingData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            currentIndex === index &&
                            styles.activeIndicator,
                        ]}
                    />
                ))}
            </View>

            <View style={styles.bottomSection}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={handleGetStarted}>
                    <PrimaryText
                        text="Get Started"
                        customStyle={styles.buttonText}
                    />
                </Pressable>
                <View style={styles.signInContainer}>
                    <PrimaryText
                        text="Already have an account?"
                        customStyle={styles.signInLabel}
                    />
                    <Pressable onPress={handleSignIn}>
                        <PrimaryText
                            text="Sign In"
                            customStyle={styles.signIn}
                        />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFBFF',
    },
    slide: {
        width,
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    textSection: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 30,
    },
    title: {
        fontSize: 45,
        lineHeight: 37,
        fontWeight: '800',
        color: '#07123B',
        textAlign: 'center',
    },
    highlight: {
        fontSize: 40,
        lineHeight: 37,
        fontWeight: '800',
        color: '#6938EF',
        textAlign: 'center',
    },
    description: {
        marginTop: 20,
        maxWidth: 310,
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '400',
        color: '#667085',
        textAlign: 'center',
    },
    imageContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    image: {
        width: '95%',
        height: '95%',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 9,
        marginBottom: 25,
    },
    indicator: {
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: '#DDD6FE',
    },
    activeIndicator: {
        backgroundColor: '#6938EF',
    },
    bottomSection: {
        paddingHorizontal: 28,
        paddingBottom: 28,
    },
    button: {
        height: 58,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6435E9',
        shadowColor: '#6435E9',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonPressed: {
        opacity: 0.85,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    signInLabel: {
        fontSize: 14,
        color: '#667085',
    },
    signIn: {
        marginLeft: 5,
        fontSize: 14,
        fontWeight: '700',
        color: '#6938EF',
    },
});