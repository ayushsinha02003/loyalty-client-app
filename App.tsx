import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import BottomNav, {
  type TabId,
} from './src/components/common/BottomNav';

import HomeScreen from './src/screens/home/HomeScreen';
import MyCardsScreen from './src/screens/my-cards/MyCardsScreen';
import RewardsScreen from './src/screens/rewards/RewardsScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import SplashScreen from '#/screens/auth/splashScreen/SplashScreen';
import LoginScreen from '#/screens/auth/login/LoginScreen';


function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111' : '#fff'}
      />

      {showSplash ? (
        <SplashScreen
          onFinish={() => setShowSplash(false)}
        />
      ) : showOnboarding ? (
        <OnboardingScreen
          onGetStarted={() => {
            setShowOnboarding(false);
            setShowLogin(true);
          }}
        />
      ) : showLogin ? (
        <LoginScreen
          role="customer"
          onLogin={() => setShowLogin(false)}
          onSignup={() => { }}
        />
      ) : (
        <AppContent />
      )}
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>('Home');

  const insets = useSafeAreaInsets();

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;

      case 'MyCards':
        return <MyCardsScreen />;

      case 'Rewards':
        return <RewardsScreen />;

      case 'Profile':
        return <ProfileScreen />;

      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>

      <BottomNav
        activeTab={activeTab}
        onTabPress={setActiveTab}
        bottomInset={insets.bottom}
      />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});