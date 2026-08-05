import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to LoyaltyApp</Text>

      <Text style={styles.subtitle}>
        Collect stamps and unlock rewards.
      </Text>
    </View>
  );
};

export default HomeScreen;

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

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#6b7280',
  },
});