/**
 * Minimal React Native App
 * Ready for mobile development.
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, useColorScheme } from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Text style={styles.title}>LoyaltyApp</Text>
        <Text style={styles.subtitle}>Ready for mobile development.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 12,
    color: '#666',
  },
});

export default App;
