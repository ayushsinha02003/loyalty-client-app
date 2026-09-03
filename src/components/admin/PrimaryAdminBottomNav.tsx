import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import PrimaryText from '../text/PrimaryText';

type Props = {
  onPress?: (item: string) => void;
  bottomInset?: number;
  activeItem?: string;
};
const items = [
  { label: 'Home', icon: 'home-outline' as const, active: 'home' as const },
  {
    label: 'Customers',
    icon: 'account-group-outline' as const,
    active: 'account-group' as const,
  },
  {
    label: 'Stamps',
    icon: 'bookmark-outline' as const,
    active: 'bookmark' as const,
  },
  { label: 'Rewards', icon: 'gift-outline' as const, active: 'gift' as const },
  {
    label: 'More',
    icon: 'dots-horizontal' as const,
    active: 'dots-horizontal' as const,
  },
];

export default function PrimaryAdminBottomNav({
  onPress,
  bottomInset = 0,
  activeItem = 'Home',
}: Props) {
  return (
    <View
      style={[styles.wrapper, { paddingBottom: Math.max(bottomInset, 10) }]}
    >
      <View style={styles.navbar}>
        {items.map(item => {
          const selected = activeItem === item.label;
          return (
            <Pressable
              key={item.label}
              onPress={() => onPress?.(item.label)}
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}
              android_ripple={{ color: '#EDE9FE', borderless: true }}
            >
              <View
                style={[
                  styles.iconContainer,
                  selected && styles.iconContainerActive,
                ]}
              >
                <MaterialDesignIcons
                  name={selected ? item.active : item.icon}
                  size={24}
                  color={selected ? '#FFFFFF' : '#9CA3AF'}
                />
              </View>
              {selected && (
                <PrimaryText
                  text={item.label}
                  customStyle={styles.activeLabel}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
  },
  navbar: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 7,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  iconContainer: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  iconContainerActive: { backgroundColor: '#7C3AED', borderRadius: 14 },
  activeLabel: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '700',
    color: '#7C3AED',
  },
  pressed: { opacity: 0.7 },
});
