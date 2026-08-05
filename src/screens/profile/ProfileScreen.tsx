import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Profile</Text>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8fafc',
    },

    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
    },
});