import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser, clearAuthData } from '../../services/authService';
import { customerApi } from '../../services/api';

interface ProfileScreenProps {
  onLogout?: () => void;
  onViewActivity?: () => void;
}

const menuItems = [
  'Activity History',
  'Membership Details',
  'Notifications',
  'Help & Support',
  'Terms of Service',
  'About Us',
];

const ProfileScreen = ({ onLogout, onViewActivity }: ProfileScreenProps) => {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ totalStamps: 0, rewardsRedeemed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }

        // Fetch customer dashboard for stats
        const response = await customerApi.getDashboard();
        if (response.success) {
          const raw = response.data || response;
          const customerCards = raw.customerCards || response.customerCards || [];
          const totalStamps = customerCards.reduce(
            (sum: number, card: any) => sum + (card.currentStamps || 0),
            0
          );
          const rewardsRedeemed = customerCards.filter(
            (card: any) => card.isRewardAvailable
          ).length;
          setStats({ totalStamps, rewardsRedeemed });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          clearAuthData();
          onLogout?.();
        },
      },
    ]);
  };

  const handleMenuPress = (item: string) => {
    if (item === 'Activity History') {
      onViewActivity?.();
    } else {
      Alert.alert(item, `${item} is active for your account.`);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7B3FF2" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: user?.profileImage || 'https://i.pravatar.cc/150?img=12',
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>{user?.name || 'Customer'}</Text>
          <Text style={styles.phone}>{user?.phone || 'No phone'}</Text>
          {user?.email ? <Text style={styles.email}>{user.email}</Text> : null}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Total Stamps</Text>
            <Text style={styles.statValue}>{stats.totalStamps}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Ready Rewards</Text>
            <Text style={styles.statValue}>{stats.rewardsRedeemed}</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuText}>{item}</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.logout}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    backgroundColor: '#7B3FF2',
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  name: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  phone: {
    color: '#E9D5FF',
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  email: {
    color: '#E9D5FF',
    marginTop: 2,
    fontSize: 13,
  },
  statsContainer: {
    marginHorizontal: 20,
    marginTop: -24,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  statTitle: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
  },
  statValue: {
    marginTop: 6,
    fontSize: 26,
    fontWeight: '800',
    color: '#1E293B',
  },
  menuContainer: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  arrow: {
    fontSize: 22,
    color: '#94A3B8',
    fontWeight: '300',
  },
  logout: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#64748B',
  },
});
