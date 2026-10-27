import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

import PrimaryText from '../../components/text/PrimaryText';

interface StepItem {
    id: number;
    title: string;
    description: string;
    icon: string;
    backgroundColor: string;
    iconColor: string;
}

const steps: StepItem[] = [
    {
        id: 1,
        title: 'Visit',
        description: 'Visit a business',
        icon: 'storefront-outline',
        backgroundColor: '#EDE9FE',
        iconColor: '#7C3AED',
    },
    {
        id: 2,
        title: 'Collect',
        description: 'Collect stamps',
        icon: 'star',
        backgroundColor: '#FEF3C7',
        iconColor: '#475569',
    },
    {
        id: 3,
        title: 'Redeem',
        description: 'Redeem rewards',
        icon: 'gift-outline',
        backgroundColor: '#DCFCE7',
        iconColor: '#475569',
    },
];

const LoyaltySteps = () => {
    return (
        <View style={styles.container}>
            {/* Icons + connecting lines */}
            <View style={styles.stepsRow}>
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <View style={styles.step}>
                            <View
                                style={[
                                    styles.iconContainer,
                                    {
                                        backgroundColor: step.backgroundColor,
                                    },
                                ]}>
                                <MaterialDesignIcons
                                    name={step.icon as any}
                                    size={24}
                                    color={step.iconColor}
                                />
                            </View>
                            <PrimaryText
                                text={`${step.id}. ${step.title}`}
                                customStyle={styles.title}
                            />
                            <PrimaryText
                                text={step.description}
                                customStyle={styles.description}
                                numberOfLines={1}
                            />
                        </View>

                        {/* Connector */}
                        {index < steps.length - 1 && (
                            <View style={styles.connectorContainer}>
                                <View style={styles.connector} />
                                <MaterialDesignIcons
                                    name="chevron-right"
                                    size={14}
                                    color="#C4B5FD"
                                />
                            </View>
                        )}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
};

export default LoyaltySteps;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        borderRadius: 16,
    },
    stepsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    step: {
        flex: 1,
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 7,
    },
    title: {
        fontSize: 13,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
    },
    description: {
        marginTop: 2,
        fontSize: 10,
        fontWeight: '400',
        color: '#64748B',
        textAlign: 'center',
    },
    connectorContainer: {
        width: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: -10,
        marginTop: 23,
    },
    connector: {
        flex: 1,
        height: 1,
        borderTopWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#C4B5FD',
    },
});