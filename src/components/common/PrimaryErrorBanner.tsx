import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { PALETTE, RADII } from '../../constants/theme';

export interface PrimaryErrorBannerProps {
  message?: string | null;
  icon?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function PrimaryErrorBanner({
  message,
  icon,
  style,
  textStyle,
}: PrimaryErrorBannerProps) {
  if (!message) return null;

  return (
    <View style={[styles.container, style]}>
      {icon ? (
        <Text style={styles.legacyIcon}>{icon}</Text>
      ) : (
        <View style={styles.iconMargin}>
          <AlertCircle size={18} color={PALETTE.primary} strokeWidth={2} />
        </View>
      )}
      <Text style={[styles.text, textStyle]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.illusCoralBg,
    borderWidth: 1,
    borderColor: 'rgba(255, 106, 85, 0.3)',
    borderRadius: RADII.lg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  iconMargin: {
    marginRight: 10,
  },
  legacyIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  text: {
    flex: 1,
    color: PALETTE.onSurface,
    fontSize: 13,
    fontWeight: '600',
  },
});
