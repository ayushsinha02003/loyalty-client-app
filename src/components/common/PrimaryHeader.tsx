import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Bell } from 'lucide-react-native';
import PrimaryText from '../text/PrimaryText';
import { PALETTE, RADII, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface PrimaryHeaderProps {
  name?: string;
  eyebrow?: string;
  subtitle?: string;
  notificationCount?: number;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  style?: ViewStyle;
}

const getTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const PrimaryHeader = ({
  name = 'User',
  eyebrow = 'YOUR LOYALTY WALLET',
  subtitle,
  notificationCount = 0,
  onNotificationPress,
  style,
}: PrimaryHeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <PrimaryText text={eyebrow} customStyle={styles.eyebrow} />
        <PrimaryText
          text={`${getTimeGreeting()}, ${name}`}
          customStyle={styles.greeting}
          numberOfLines={1}
        />
        {subtitle ? (
          <PrimaryText text={subtitle} customStyle={styles.subtitle} />
        ) : null}
      </View>

      <Pressable
        onPress={onNotificationPress}
        hitSlop={10}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Bell size={20} color={PALETTE.onSurface} strokeWidth={2} />
        {notificationCount > 0 && <View style={styles.coralDot} />}
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
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.gutter,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: PALETTE.surfaceAlt,
  },
  content: {
    flex: 1,
    marginRight: 16,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 4,
  },
  greeting: {
    ...TYPOGRAPHY.headlineLg,
    color: PALETTE.onSurface,
  },
  subtitle: {
    ...TYPOGRAPHY.bodySm,
    marginTop: 2,
    color: PALETTE.onSurfaceVariant,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: RADII.full,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    ...SHADOWS.softCard,
    position: 'relative',
  },
  buttonPressed: {
    transform: [{ scale: 0.94 }],
    backgroundColor: PALETTE.surfaceAlt,
  },
  coralDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PALETTE.primary,
    borderWidth: 1.5,
    borderColor: PALETTE.surface,
  },
});
