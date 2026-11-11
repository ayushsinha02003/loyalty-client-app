import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  CreditCard,
  Gift,
  Home,
  QrCode,
  User,
} from 'lucide-react-native';
import { PALETTE, RADII, SHADOWS } from '../../constants/theme';

type TabId = 'Home' | 'MyCards' | 'Scan' | 'Rewards' | 'Profile' | 'All';

interface BottomNavProps {
  activeTab: TabId;
  onTabPress: (tab: TabId) => void;
  bottomInset?: number;
}

const tabs: Array<{
  id: TabId;
  label: string;
  isPrimary?: boolean;
}> = [
  { id: 'Home', label: 'Home' },
  { id: 'MyCards', label: 'My Cards' },
  { id: 'Scan', label: 'Scan QR', isPrimary: true },
  { id: 'Rewards', label: 'Rewards' },
  { id: 'Profile', label: 'Profile' },
];

export type { TabId };
export function isTabId(value: string): value is TabId {
  return tabs.some((tab) => tab.id === value) || value === 'All';
}

export default function BottomNav({
  activeTab,
  onTabPress,
  bottomInset = 0,
}: BottomNavProps) {
  const renderIcon = (id: TabId, color: string) => {
    switch (id) {
      case 'Home':
        return <Home size={24} color={color} strokeWidth={2} />;
      case 'MyCards':
        return <CreditCard size={24} color={color} strokeWidth={2} />;
      case 'Scan':
        return <QrCode size={22} color="#FFFFFF" strokeWidth={2} />;
      case 'Rewards':
        return <Gift size={24} color={color} strokeWidth={2} />;
      case 'Profile':
      default:
        return <User size={24} color={color} strokeWidth={2} />;
    }
  };

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        {
          paddingBottom: Math.max(bottomInset + 8, 24),
        },
      ]}
    >
      <View style={styles.navbar}>
        {tabs.map((tab) => {
          const selected = activeTab === tab.id;
          const isPrimary = tab.isPrimary;
          const iconColor = selected
            ? PALETTE.onPrimary
            : 'rgba(255, 255, 255, 0.4)';

          if (isPrimary) {
            return (
              <Pressable
                key={tab.id}
                onPress={() => onTabPress(tab.id)}
                hitSlop={8}
                style={({ pressed }) => [
                  styles.scanButton,
                  pressed && styles.pressed,
                ]}
              >
                {renderIcon(tab.id, PALETTE.onPrimary)}
              </Pressable>
            );
          }

          return (
            <Pressable
              key={tab.id}
              onPress={() => onTabPress(tab.id)}
              hitSlop={10}
              style={({ pressed }) => [
                styles.navItem,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.iconSlot}>
                {renderIcon(tab.id, iconColor)}
                {selected && <View style={styles.activeDot} />}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  navbar: {
    width: '100%',
    maxWidth: 355,
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PALETTE.surfaceContrast,
    borderRadius: RADII.full,
    paddingHorizontal: 24,
    ...SHADOWS.floatingNav,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  iconSlot: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    bottom: -10,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: PALETTE.primary,
  },
  scanButton: {
    width: 46,
    height: 46,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.btn,
  },
  pressed: {
    transform: [{ scale: 0.9 }],
  },
});
