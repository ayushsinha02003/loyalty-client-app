import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  BarChart3,
  Bookmark,
  Gift,
  QrCode,
  Sparkles,
  Store,
  UserPlus,
  Users,
} from 'lucide-react-native';
import PrimaryText from '../text/PrimaryText';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

type ActionIconComponent = React.ComponentType<{
  size?: number;
  strokeWidth?: number;
  color?: string;
}>;

type Action = {
  label: string;
  icon: string | ActionIconComponent;
};

interface PrimaryAdminActionGridProps {
  actions: Action[];
  onPressAction?: (index: number) => void;
}

const ICON_MAP: Record<string, ActionIconComponent> = {
  'account-plus': UserPlus,
  'gift-outline': Gift,
  'qrcode-scan': QrCode,
  'chart-bar': BarChart3,
  bookmark: Bookmark,
  users: Users,
  store: Store,
};

export default function PrimaryAdminActionGrid({
  actions,
  onPressAction,
}: PrimaryAdminActionGridProps) {
  return (
    <View style={styles.grid}>
      {actions.map((action, index) => {
        const IconComp =
          typeof action.icon === 'string'
            ? ICON_MAP[action.icon] || Sparkles
            : action.icon;

        return (
          <TouchableOpacity
            key={action.label}
            style={styles.action}
            activeOpacity={0.85}
            onPress={() => onPressAction?.(index)}
          >
            <View style={styles.icon}>
              <IconComp size={22} strokeWidth={2} color={PALETTE.primary} />
            </View>
            <PrimaryText
              text={action.label}
              customStyle={styles.label}
              numberOfLines={2}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: 10,
  },
  action: {
    flex: 1,
    minHeight: 112,
    borderRadius: RADII.lg,
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 12,
    ...SHADOWS.softCard,
  },
  icon: {
    width: 46,
    height: 46,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 11,
    color: PALETTE.onSurface,
    textAlign: 'center',
  },
});
