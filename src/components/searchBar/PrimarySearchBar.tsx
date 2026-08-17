import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps,
    Pressable,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

interface PrimarySearchBarProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onFilterPress?: () => void;
    showFilter?: boolean;
}

const PrimarySearchBar = ({
    value,
    onChangeText,
    placeholder = 'Search...',
    onFilterPress,
    showFilter = false,
    ...props
}: PrimarySearchBarProps) => {
    const [focused, setFocused] = useState(false);

    return (
        <View
            style={[
                styles.container,
                focused && styles.containerFocused,
            ]}
        >
            <View style={styles.iconContainer}>
                <MaterialDesignIcons
                    name="magnify"
                    size={20}
                    color="#7C3AED"
                />
            </View>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#94A3B8"
                style={styles.input}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
            />

            {showFilter && (
                <Pressable
                    style={styles.filterButton}
                    onPress={onFilterPress}
                >
                    <MaterialDesignIcons
                        name="tune-vertical"
                        size={18}
                        color="#FFFFFF"
                    />
                </Pressable>
            )}
        </View>
    );
};

export default PrimarySearchBar;

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ECECEC',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 5,
    },
    containerFocused: {
        borderColor: '#7C3AED',
        shadowColor: '#7C3AED',
        shadowOpacity: 0.15,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F3E8FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 15,
        fontWeight: '500',
        color: '#111827',
    },
    filterButton: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: '#7C3AED',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
});