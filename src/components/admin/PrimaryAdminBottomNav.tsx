import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  Bookmark,
  Gift,
  Home,
  MoreHorizontal,
  Users,
} from 'lucide-react-native';
import { PALETTE, RADII, SHADOWS } from '../../constants/theme';

type Props = {
  onPress?: (item: string) => void;
  bottomInset?: number;
  activeItem?: string;
};

const NAV_ITEMS = [
  { key: 'Home', label: 'Home', Icon: Home },
  { key: 'Customers', label: 'Customers', Icon: Users },
  { key: 'Stamps', label: 'Stamps', Icon: Bookmark },
  { key: 'Rewards', label: 'Rewards', Icon: Gift },
  { key: 'More', label: 'More', Icon: MoreHorizontal },
] as const;

/**
 * Floating dark slate-indigo pill navigation bar for merchant/admin screens.
 */
export default function PrimaryAdminBottomNav({
  onPress,
  bottomInset = 0,
  activeItem = 'Home',
}: Props) {
  const bottomPadding = Math.max(bottomInset, 20);

  return (
    <View
      pointerEvents="box-none"
      style={[styles.outerContainer, { paddingBottom: bottomPadding }]}
    >
      <View style={styles.pillBar}>
        {NAV_ITEMS.map(({ key, label, Icon }) => {
          const isActive = activeItem === key;

          return (
            <Pressable
              key={key}
              accessibilityRole="button"
              accessibilityLabel={label}
              accessibilityState={{ selected: isActive }}
              style={styles.tabButton}
              onPress={() => onPress?.(key)}
            >
              <View style={styles.iconSlot}>
                <Icon
                  size={24}
                  strokeWidth={2}
                  color={isActive ? PALETTE.surface : PALETTE.onSurfaceMuted}
                />
                <View
                  style={[
                    styles.activeDot,
                    !isActive && styles.activeDotHidden,
                  ]}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  pillBar: {
    width: '100%',
    maxWidth: 355,
    height: 68,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surfaceContrast,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 14,
    ...SHADOWS.floatingNav,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSlot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: PALETTE.primary,
    marginTop: 5,
  },
  activeDotHidden: {
    opacity: 0,
  },
});
