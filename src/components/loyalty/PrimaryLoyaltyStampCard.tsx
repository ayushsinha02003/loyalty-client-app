import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ChevronRight, Gift, Star, Store } from 'lucide-react-native';
import PrimaryText from '../../components/text/PrimaryText';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

const STEPS = [
  {
    id: 1,
    title: 'Visit',
    description: 'Visit a business',
    Icon: Store,
    backgroundColor: PALETTE.illusCoralBg,
    iconColor: PALETTE.primary,
  },
  {
    id: 2,
    title: 'Collect',
    description: 'Collect stamps',
    Icon: Star,
    backgroundColor: PALETTE.border,
    iconColor: PALETTE.warning,
  },
  {
    id: 3,
    title: 'Redeem',
    description: 'Redeem rewards',
    Icon: Gift,
    backgroundColor: PALETTE.surfaceContrast,
    iconColor: PALETTE.surface,
  },
] as const;

const LoyaltySteps = () => {
  return (
    <View style={styles.container}>
      <View style={styles.stepsRow}>
        {STEPS.map((step, index) => {
          const { Icon } = step;
          return (
            <React.Fragment key={step.id}>
              <View style={styles.step}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: step.backgroundColor },
                  ]}
                >
                  <Icon size={22} strokeWidth={2} color={step.iconColor} />
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

              {index < STEPS.length - 1 && (
                <View style={styles.connectorContainer}>
                  <View style={styles.connector} />
                  <ChevronRight
                    size={14}
                    strokeWidth={2}
                    color={PALETTE.onSurfaceMuted}
                  />
                </View>
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

export default LoyaltySteps;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: PALETTE.surface,
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    ...SHADOWS.softCard,
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
    borderRadius: RADII.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onSurface,
    textAlign: 'center',
  },
  description: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '500',
    color: PALETTE.onSurfaceVariant,
    textAlign: 'center',
  },
  connectorContainer: {
    width: 36,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -10,
    marginTop: 20,
  },
  connector: {
    flex: 1,
    height: 1,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: PALETTE.illusNeutralCream,
  },
});
