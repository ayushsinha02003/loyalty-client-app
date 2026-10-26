import React, { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import PrimaryBottomNav, {
  type TabId,
  isTabId,
} from './src/components/common/BottomNav';
import PrimaryAdminBottomNav from './src/components/admin/PrimaryAdminBottomNav';

import HomeScreen from './src/screens/home/HomeScreen';
import AdminHomeScreen from './src/screens/home/AdminHomeScreen';
import MyCardsScreen from './src/screens/my-cards/MyCardsScreen';
import RewardsScreen from './src/screens/rewards/RewardsScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import SplashScreen from '#/screens/auth/splashScreen/SplashScreen';
import LoginScreen from '#/screens/auth/loginSignUp/LoginScreen';
import SignUpScreen from './src/screens/auth/loginSignUp/SignUpScreen';
import ScreenAccessScreen, {
  type ScreenId,
} from './src/screens/ScreenAccessScreen';
import WelcomeScreen from './src/screens/welcome/WelcomeScreen';
import OtpVerificationScreen from './src/screens/otp/OtpVerificationScreen';
import QrScannerScreen from './src/screens/qr/QrScannerScreen';
import ScanSuccessScreen from './src/screens/qr/ScanSuccessScreen';
import RewardDetailsScreen from './src/screens/rewards/RewardDetailsScreen';
import ActivityScreen from './src/screens/activity/ActivityScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111' : '#fff'}
      />

      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
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
          onSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      ) : showSignup ? (
        <SignUpScreen
          onLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
          onSignup={() => setShowSignup(false)}
        />
      ) : (
        <AppContent />
      )}
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>('All');
  const [selectedScreen, setSelectedScreen] = useState<ScreenId | null>(null);

  const insets = useSafeAreaInsets();

  const handleTabPress = (tab: TabId) => {
    setActiveTab(tab);
    setSelectedScreen(tab);
  };

  const handleScreenSelect = (screen: ScreenId) => {
    if (screen === 'All') {
      setActiveTab('All');
    } else if (isTabId(screen)) {
      setActiveTab(screen);
    } else {
      setActiveTab('All');
    }

    setSelectedScreen(screen);
  };

  const handleAdminNavPress = (item: string) => {
    switch (item) {
      case 'Home':
        setSelectedScreen('AdminHome');
        break;
      case 'Customers':
        setSelectedScreen('MyCards');
        break;
      case 'Rewards':
        setSelectedScreen('Rewards');
        break;
      case 'Stamps':
      case 'More':
      default:
        setSelectedScreen('AdminHome');
    }
  };

  const renderScreen = () => {
    if (selectedScreen === null || selectedScreen === 'All') {
      return <ScreenAccessScreen onSelectScreen={handleScreenSelect} />;
    }

    switch (selectedScreen) {
      case 'Home':
        return <HomeScreen />;

      case 'MyCards':
        return <MyCardsScreen />;

      case 'Rewards':
        return <RewardsScreen />;

      case 'Profile':
        return <ProfileScreen />;

      case 'AdminHome':
        return <AdminHomeScreen />;

      case 'Splash':
        return <SplashScreen onFinish={() => setSelectedScreen('All')} />;

      case 'Onboarding':
        return (
          <OnboardingScreen
            onGetStarted={() => setSelectedScreen('Welcome')}
          />
        );

      case 'Welcome':
        return (
          <WelcomeScreen
            onCreateAccount={() => setSelectedScreen('Signup')}
            onSignIn={() => setSelectedScreen('Login')}
          />
        );

      case 'Login':
        return (
          <LoginScreen
            role="customer"
            onLogin={() => setSelectedScreen('Home')}
            onSignup={() => setSelectedScreen('Signup')}
          />
        );

      case 'Signup':
        return (
          <SignUpScreen
            onSignup={() => setSelectedScreen('Otp')}
            onLogin={() => setSelectedScreen('Login')}
          />
        );

      case 'Otp':
        return (
          <OtpVerificationScreen
            onBack={() => setSelectedScreen('Signup')}
            onVerify={() => setSelectedScreen('Home')}
          />
        );

      case 'QrScanner':
        return (
          <QrScannerScreen
            onBack={() => setSelectedScreen('Home')}
            onScanSuccess={() => setSelectedScreen('ScanSuccess')}
            onEnterCode={() => setSelectedScreen('ScanSuccess')}
          />
        );

      case 'ScanSuccess':
        return (
          <ScanSuccessScreen
            onViewCard={() => setSelectedScreen('MyCards')}
            onDone={() => setSelectedScreen('Home')}
          />
        );

      case 'RewardDetails':
        return (
          <RewardDetailsScreen
            onBack={() => setSelectedScreen('Rewards')}
            onRedeem={() => setSelectedScreen('Rewards')}
          />
        );

      case 'Activity':
        return (
          <ActivityScreen
            onBack={() => setSelectedScreen('Profile')}
          />
        );

      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>

      {selectedScreen === 'AdminHome' ? (
        <PrimaryAdminBottomNav
          onPress={handleAdminNavPress}
          bottomInset={insets.bottom}
        />
      ) : (
        <PrimaryBottomNav
          activeTab={activeTab}
          onTabPress={handleTabPress}
          bottomInset={insets.bottom}
        />
      )}
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
