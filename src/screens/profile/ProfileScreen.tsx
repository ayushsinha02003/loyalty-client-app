import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { getCurrentUser, clearAuthData } from '../../services/authService';
import { customerApi } from '../../services/api';
import { ProfileScreenSkeleton } from '../../components/skeleton';

interface ProfileScreenProps {
  onLogout?: () => void;
  onViewActivity?: () => void;
}

interface MenuOption {
  id: string;
  label: string;
  icon: React.ComponentProps<typeof MaterialDesignIcons>['name'];
  color: string;
  bgColor: string;
}

const menuOptions: MenuOption[] = [
  {
    id: 'Activity History',
    label: 'Activity History',
    icon: 'history',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
  },
  {
    id: 'Membership Details',
    label: 'Membership Details',
    icon: 'card-account-details-outline',
    color: '#0284C7',
    bgColor: '#E0F2FE',
  },
  {
    id: 'Notifications',
    label: 'Notifications',
    icon: 'bell-outline',
    color: '#EA580C',
    bgColor: '#FFEDD5',
  },
  {
    id: 'Help & Support',
    label: 'Help & Support',
    icon: 'help-circle-outline',
    color: '#10B981',
    bgColor: '#D1FAE5',
  },
];

const ProfileScreen = ({ onLogout, onViewActivity }: ProfileScreenProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStamps: 0,
    rewardsRedeemed: 0,
    activeCards: 0,
  });

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);

        const response = await customerApi.getDashboard();
        if (response.success && response.data) {
          const cards = response.data.customerCards || [];
          const totalStamps = cards.reduce(
            (acc: number, c: any) => acc + (c.currentStamps || 0),
            0
          );
          const rewardsRedeemed = cards.filter(
            (c: any) => c.isRewardAvailable
          ).length;

          setStats({
            totalStamps,
            rewardsRedeemed,
            activeCards: cards.length,
          });
        }
      } catch (err) {
        console.warn('Failed to fetch profile dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to log out of your account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
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
    return <ProfileScreenSkeleton />;
  }

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Hero */}
        <View style={styles.header}>
          {user?.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarInitial}>{initial}</Text>
            </View>
          )}

          <Text style={styles.name}>{user?.name || 'Customer'}</Text>
          <View style={styles.phoneBadge}>
            <MaterialDesignIcons name="phone-outline" size={13} color="#E9D5FF" style={styles.badgeIcon} />
            <Text style={styles.phone}>{user?.phone || 'No phone'}</Text>
          </View>
          {user?.email ? (
            <View style={styles.emailRow}>
              <MaterialDesignIcons name="email-outline" size={13} color="#E9D5FF" style={styles.badgeIcon} />
              <Text style={styles.email}>{user.email}</Text>
            </View>
          ) : null}
        </View>

        {/* Floating Stats Card */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <View style={styles.statIconCircle}>
              <MaterialDesignIcons name="credit-card-outline" size={18} color="#7C3AED" />
            </View>
            <Text style={styles.statValue}>{stats.activeCards}</Text>
            <Text style={styles.statTitle}>Cards</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, styles.statIconCircleAmber]}>
              <MaterialDesignIcons name="star" size={18} color="#F59E0B" />
            </View>
            <Text style={styles.statValue}>{stats.totalStamps}</Text>
            <Text style={styles.statTitle}>Stamps</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, styles.statIconCircleEmerald]}>
              <MaterialDesignIcons name="gift" size={18} color="#10B981" />
            </View>
            <Text style={styles.statValue}>{stats.rewardsRedeemed}</Text>
            <Text style={styles.statTitle}>Rewards</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuOptions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIconBox, { backgroundColor: item.bgColor }]}>
                  <MaterialDesignIcons name={item.icon} size={20} color={item.color} />
                </View>
                <Text style={styles.menuText}>{item.label}</Text>
              </View>
              <MaterialDesignIcons name="chevron-right" size={22} color="#94A3B8" />
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logout}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconBox, styles.logoutIconBox]}>
                <MaterialDesignIcons name="logout" size={20} color="#EF4444" />
              </View>
              <Text style={styles.logoutText}>Sign Out</Text>
            </View>
            <MaterialDesignIcons name="chevron-right" size={22} color="#FCA5A5" />
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
    backgroundColor: '#6D28D9',
    paddingTop: 28,
    paddingBottom: 44,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarFallback: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#5B21B6',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarInitial: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  name: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  phoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  phone: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  email: {
    color: '#E9D5FF',
    fontSize: 12,
  },
  badgeIcon: {
    marginRight: 4,
  },
  statsContainer: {
    marginHorizontal: 20,
    marginTop: -26,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statIconCircleAmber: {
    backgroundColor: '#FEF3C7',
  },
  statIconCircleEmerald: {
    backgroundColor: '#D1FAE5',
  },
  divider: {
    width: 1,
    height: '60%',
    alignSelf: 'center',
    backgroundColor: '#E2E8F0',
  },
  statTitle: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
  },
  menuContainer: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  logout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '700',
  },
  logoutIconBox: {
    backgroundColor: '#FEE2E2',
  },
});
