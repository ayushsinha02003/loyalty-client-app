import React, { ReactNode } from 'react';
import {
    Text,
    StyleSheet,
    TextStyle,
    StyleProp,
    TextProps,
} from 'react-native';

interface PrimaryTextProps extends TextProps {
    text: ReactNode;
    customStyle?: StyleProp<TextStyle>;
}

const PrimaryText = ({
    text,
    customStyle,
    ...props
}: PrimaryTextProps) => {
    return (
        <Text
            style={[styles.text, customStyle]}
            {...props}>
            {text}
        </Text>
    );
};

export default PrimaryText;

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
    },
});