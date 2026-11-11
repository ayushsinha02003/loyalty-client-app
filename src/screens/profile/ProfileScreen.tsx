import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  ChevronRight,
  CreditCard,
  Gift,
  HelpCircle,
  History,
  IdCard,
  LogOut,
  Mail,
  Phone,
  Star,
} from 'lucide-react-native';
import { getCurrentUser, clearAuthData } from '../../services/authService';
import { customerApi } from '../../services/api';
import { ProfileScreenSkeleton } from '../../components/skeleton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';

interface ProfileScreenProps {
  onLogout?: () => void;
  onViewActivity?: () => void;
}

const MENU_OPTIONS = [
  { id: 'Activity History', label: 'Activity History', Icon: History },
  { id: 'Membership Details', label: 'Membership Details', Icon: IdCard },
  { id: 'Notifications', label: 'Notifications', Icon: Bell },
  { id: 'Help & Support', label: 'Help & Support', Icon: HelpCircle },
] as const;

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
        onPress: async () => {
          await clearAuthData();
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topHeader}>
          <Text style={styles.eyebrow}>Account</Text>
          <Text style={styles.screenTitle}>Profile</Text>
        </View>

        {/* Member Hero Card */}
        <View style={styles.heroCard}>
          {user?.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarInitial}>{initial}</Text>
            </View>
          )}

          <Text style={styles.name}>{user?.name || 'Customer'}</Text>

          <View style={styles.contactBadges}>
            <View style={styles.contrastPill}>
              <Phone size={12} strokeWidth={2} color={PALETTE.primary} />
              <Text style={styles.contrastPillText}>
                {user?.phone || 'Member'}
              </Text>
            </View>

            {user?.email ? (
              <View style={styles.secondaryPill}>
                <Mail
                  size={12}
                  strokeWidth={2}
                  color={PALETTE.onSurfaceVariant}
                />
                <Text style={styles.secondaryPillText} numberOfLines={1}>
                  {user.email}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <View style={styles.statIconCircle}>
              <CreditCard size={18} strokeWidth={2} color={PALETTE.primary} />
            </View>
            <Text style={styles.statValue}>{stats.activeCards}</Text>
            <Text style={styles.statTitle}>Cards</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, styles.statIconAmber]}>
              <Star
                size={18}
                strokeWidth={2}
                color={PALETTE.warning}
                fill={PALETTE.warning}
              />
            </View>
            <Text style={styles.statValue}>{stats.totalStamps}</Text>
            <Text style={styles.statTitle}>Stamps</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, styles.statIconDark]}>
              <Gift size={18} strokeWidth={2} color={PALETTE.surface} />
            </View>
            <Text style={styles.statValue}>{stats.rewardsRedeemed}</Text>
            <Text style={styles.statTitle}>Ready</Text>
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.menuContainer}>
          {MENU_OPTIONS.map(item => {
            const { Icon } = item;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.id)}
                activeOpacity={0.8}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIconBox}>
                    <Icon size={20} strokeWidth={2} color={PALETTE.onSurface} />
                  </View>
                  <Text style={styles.menuText}>{item.label}</Text>
                </View>
                <ChevronRight
                  size={20}
                  strokeWidth={2}
                  color={PALETTE.onSurfaceMuted}
                />
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={styles.logoutCard}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.logoutIconBox}>
                <LogOut size={20} strokeWidth={2} color={PALETTE.primary} />
              </View>
              <Text style={styles.logoutText}>Sign Out</Text>
            </View>
            <ChevronRight size={20} strokeWidth={2} color={PALETTE.primary} />
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
    backgroundColor: PALETTE.surfaceAlt,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  topHeader: {
    paddingTop: 16,
    paddingBottom: 14,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 4,
  },
  screenTitle: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.onSurface,
  },
  heroCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 24,
    alignItems: 'center',
    ...SHADOWS.softCard,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: RADII.full,
  },
  avatarFallback: {
    width: 84,
    height: 84,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusWarmYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.surfaceContrast,
  },
  name: {
    ...TYPOGRAPHY.headlineLg,
    color: PALETTE.onSurface,
    marginTop: 14,
  },
  contactBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  contrastPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PALETTE.surfaceContrast,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADII.full,
  },
  contrastPillText: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 12,
    color: PALETTE.surface,
  },
  secondaryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: PALETTE.surfaceAlt,
    borderWidth: 1,
    borderColor: PALETTE.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADII.full,
    maxWidth: '100%',
  },
  secondaryPillText: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginTop: 16,
    ...SHADOWS.softCard,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statIconCircle: {
    width: 40,
    height: 40,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statIconAmber: {
    backgroundColor: PALETTE.border,
  },
  statIconDark: {
    backgroundColor: PALETTE.surfaceContrast,
  },
  statValue: {
    ...TYPOGRAPHY.headlineLg,
    color: PALETTE.onSurface,
  },
  statTitle: {
    ...TYPOGRAPHY.labelUppercase,
    fontSize: 10,
    color: PALETTE.onSurfaceVariant,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 44,
    backgroundColor: PALETTE.border,
  },
  menuContainer: {
    marginTop: 20,
    gap: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 16,
    ...SHADOWS.softCard,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    ...TYPOGRAPHY.labelMd,
    fontSize: 15,
    color: PALETTE.onSurface,
  },
  logoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 16,
    marginTop: 6,
    ...SHADOWS.softCard,
  },
  logoutIconBox: {
    width: 40,
    height: 40,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    ...TYPOGRAPHY.labelMd,
    fontSize: 15,
    color: PALETTE.primary,
  },
});
