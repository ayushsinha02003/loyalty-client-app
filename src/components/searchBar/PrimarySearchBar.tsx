import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

interface PrimarySearchBarProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
  showFilter?: boolean;
  onSubmitSearch?: () => void;
}

const PrimarySearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onFilterPress,
  showFilter = false,
  onSubmitSearch,
  ...props
}: PrimarySearchBarProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, focused && styles.containerFocused]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={PALETTE.onSurfaceMuted}
        style={styles.input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        returnKeyType="search"
        onSubmitEditing={onSubmitSearch}
        {...props}
      />

      {showFilter && onFilterPress ? (
        <Pressable
          style={styles.actionCircle}
          onPress={onFilterPress}
          accessibilityLabel="Filter results"
        >
          <SlidersHorizontal size={18} strokeWidth={2} color={PALETTE.surface} />
        </Pressable>
      ) : (
        <Pressable
          style={styles.actionCircle}
          onPress={onSubmitSearch}
          accessibilityLabel="Search"
        >
          <Search size={18} strokeWidth={2} color={PALETTE.surface} />
        </Pressable>
      )}
    </View>
  );
};

export default PrimarySearchBar;

const styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.full,
    paddingLeft: 20,
    paddingRight: 7,
    borderWidth: 1,
    borderColor: PALETTE.border,
    ...SHADOWS.softCard,
  },
  containerFocused: {
    borderColor: PALETTE.primary,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
    paddingRight: 10,
  },
  actionCircle: {
    width: 40,
    height: 40,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
