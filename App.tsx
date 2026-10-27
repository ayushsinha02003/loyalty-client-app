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

// Admin Screen Imports
import BusinessSetupScreen1 from './src/screens/admin/setup/BusinessSetupScreen1';
import BusinessSetupScreen2 from './src/screens/admin/setup/BusinessSetupScreen2';
import BusinessSetupScreen3 from './src/screens/admin/setup/BusinessSetupScreen3';
import AdminCustomersScreen from './src/screens/admin/customers/AdminCustomersScreen';
import AdminStampCardsScreen from './src/screens/admin/stamp-cards/AdminStampCardsScreen';
import AdminAddStampCardScreen from './src/screens/admin/stamp-cards/AdminAddStampCardScreen';
import AdminRewardsScreen from './src/screens/admin/rewards/AdminRewardsScreen';
import AdminAddRewardScreen from './src/screens/admin/rewards/AdminAddRewardScreen';
import AdminQrCodeScreen from './src/screens/admin/qr/AdminQrCodeScreen';
import AdminAnalyticsScreen from './src/screens/admin/analytics/AdminAnalyticsScreen';
import AdminActivityScreen from './src/screens/admin/activity/AdminActivityScreen';
import AdminBusinessProfileScreen from './src/screens/admin/profile/AdminBusinessProfileScreen';
import AdminMoreScreen from './src/screens/admin/more/AdminMoreScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [initialScreen, setInitialScreen] = useState<ScreenId | null>(null);

  const handleAuthSuccess = (data?: any) => {
    const role =
      data?.data?.user?.role ||
      data?.user?.role ||
      data?.data?.role ||
      data?.role;
    setShowLogin(false);
    setShowSignup(false);
    if (role === 'business' || role === 'admin') {
      setInitialScreen('AdminHome');
    } else {
      setInitialScreen('Home');
    }
  };

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
          onLogin={handleAuthSuccess}
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
          onSignup={handleAuthSuccess}
        />
      ) : (
        <AppContent initialScreen={initialScreen || undefined} />
      )}
    </SafeAreaProvider>
  );
}

function AppContent({ initialScreen }: { initialScreen?: ScreenId }) {
  const [activeTab, setActiveTab] = useState<TabId>(
    initialScreen === 'Home' ? 'Home' : 'All'
  );
  const [selectedScreen, setSelectedScreen] = useState<ScreenId | null>(
    initialScreen || null
  );

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
        setSelectedScreen('AdminCustomers');
        break;
      case 'Stamps':
        setSelectedScreen('AdminStampCards');
        break;
      case 'Rewards':
        setSelectedScreen('AdminRewards');
        break;
      case 'More':
        setSelectedScreen('AdminMore');
        break;
      default:
        setSelectedScreen('AdminHome');
    }
  };

  const isAdminTabScreen =
    selectedScreen === 'AdminHome' ||
    selectedScreen === 'AdminCustomers' ||
    selectedScreen === 'AdminStampCards' ||
    selectedScreen === 'AdminAddStampCard' ||
    selectedScreen === 'AdminRewards' ||
    selectedScreen === 'AdminAddReward' ||
    selectedScreen === 'AdminQrCode' ||
    selectedScreen === 'AdminAnalytics' ||
    selectedScreen === 'AdminActivity' ||
    selectedScreen === 'AdminBusinessProfile' ||
    selectedScreen === 'AdminMore';

  const getAdminActiveItem = () => {
    switch (selectedScreen) {
      case 'AdminHome':
        return 'Home';
      case 'AdminCustomers':
        return 'Customers';
      case 'AdminStampCards':
      case 'AdminAddStampCard':
        return 'Stamps';
      case 'AdminRewards':
      case 'AdminAddReward':
        return 'Rewards';
      case 'AdminMore':
      case 'AdminBusinessProfile':
      case 'AdminAnalytics':
      case 'AdminActivity':
      case 'AdminQrCode':
        return 'More';
      default:
        return 'Home';
    }
  };

  const renderScreen = () => {
    if (selectedScreen === null || selectedScreen === 'All') {
      return <ScreenAccessScreen onSelectScreen={handleScreenSelect} />;
    }

    switch (selectedScreen) {
      // Customer Screens
      case 'Home':
        return <HomeScreen />;

      case 'MyCards':
        return <MyCardsScreen />;

      case 'Rewards':
        return <RewardsScreen />;

      case 'Profile':
        return <ProfileScreen />;

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
            onLogin={data => {
              const role =
                data?.data?.user?.role ||
                data?.user?.role ||
                (data as any)?.role;
              if (role === 'business' || role === 'admin') {
                setSelectedScreen('AdminHome');
              } else {
                setSelectedScreen('Home');
              }
            }}
            onSignup={() => setSelectedScreen('Signup')}
          />
        );

      case 'Signup':
        return (
          <SignUpScreen
            onSignup={data => {
              const role =
                data?.data?.user?.role ||
                data?.user?.role ||
                data?.data?.role ||
                (data as any)?.role;
              if (role === 'business' || role === 'admin') {
                setSelectedScreen('AdminHome');
              } else {
                setSelectedScreen('Home');
              }
            }}
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

      // Admin Screens
      case 'AdminLogin':
        return (
          <LoginScreen
            onLogin={data => {
              const role =
                data?.data?.user?.role ||
                data?.user?.role ||
                (data as any)?.role;
              if (role === 'business' || role === 'admin') {
                setSelectedScreen('AdminHome');
              } else {
                setSelectedScreen('Home');
              }
            }}
            onSignup={() => setSelectedScreen('Signup')}
          />
        );

      case 'BusinessSetup1':
        return (
          <BusinessSetupScreen1
            onBack={() => setSelectedScreen('All')}
            onNext={() => setSelectedScreen('BusinessSetup2')}
          />
        );

      case 'BusinessSetup2':
        return (
          <BusinessSetupScreen2
            onBack={() => setSelectedScreen('BusinessSetup1')}
            onNext={() => setSelectedScreen('BusinessSetup3')}
          />
        );

      case 'BusinessSetup3':
        return (
          <BusinessSetupScreen3
            onBack={() => setSelectedScreen('BusinessSetup2')}
            onEdit={() => setSelectedScreen('BusinessSetup1')}
            onCreateBusiness={() => setSelectedScreen('AdminHome')}
          />
        );

      case 'AdminHome':
        return <AdminHomeScreen />;

      case 'AdminCustomers':
        return <AdminCustomersScreen />;

      case 'AdminStampCards':
        return (
          <AdminStampCardsScreen
            onAddCard={() => setSelectedScreen('AdminAddStampCard')}
          />
        );

      case 'AdminAddStampCard':
        return (
          <AdminAddStampCardScreen
            onBack={() => setSelectedScreen('AdminStampCards')}
            onSave={() => setSelectedScreen('AdminStampCards')}
          />
        );

      case 'AdminRewards':
        return (
          <AdminRewardsScreen
            onAddReward={() => setSelectedScreen('AdminAddReward')}
          />
        );

      case 'AdminAddReward':
        return (
          <AdminAddRewardScreen
            onBack={() => setSelectedScreen('AdminRewards')}
            onSave={() => setSelectedScreen('AdminRewards')}
          />
        );

      case 'AdminQrCode':
        return <AdminQrCodeScreen />;

      case 'AdminAnalytics':
        return <AdminAnalyticsScreen />;

      case 'AdminActivity':
        return <AdminActivityScreen />;

      case 'AdminBusinessProfile':
        return (
          <AdminBusinessProfileScreen
            onEdit={() => setSelectedScreen('BusinessSetup1')}
          />
        );

      case 'AdminMore':
        return (
          <AdminMoreScreen
            onSelectOption={option => {
              if (option === 'profile') setSelectedScreen('AdminBusinessProfile');
              else if (option === 'staff') setSelectedScreen('AdminCustomers');
            }}
            onLogout={() => setSelectedScreen('All')}
          />
        );

      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>

      {isAdminTabScreen ? (
        <PrimaryAdminBottomNav
          onPress={handleAdminNavPress}
          bottomInset={insets.bottom}
          activeItem={getAdminActiveItem()}
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
