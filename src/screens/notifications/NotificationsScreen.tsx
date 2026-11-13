import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  ChevronRight,
  Clock,
  Gift,
  Sparkles,
  Ticket,
} from 'lucide-react-native';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';
import { useCustomerDashboard } from '../../hooks/useApi';
import {
  AppNotification,
  generateNotificationsFromCards,
  getReadNotificationIds,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '../../services/notificationService';

interface NotificationsScreenProps {
  onBack: () => void;
  onNavigateToRewards?: () => void;
  onNavigateToCards?: () => void;
}

type FilterType = 'all' | 'reward' | 'stamp';

const NotificationsScreen = ({
  onBack,
  onNavigateToRewards,
  onNavigateToCards,
}: NotificationsScreenProps) => {
  const { dashboard, loading, refetch } = useCustomerDashboard();
  const [, setReadIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const loadNotifications = useCallback(async () => {
    const storedReadIds = await getReadNotificationIds();
    setReadIds(storedReadIds);
    const cards = dashboard?.customerCards || [];
    const generated = generateNotificationsFromCards(cards, storedReadIds);
    setNotifications(generated);
  }, [dashboard]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleMarkAllRead = async () => {
    const allIds = notifications.map(n => n.id);
    await markAllNotificationsAsRead(allIds);
    setReadIds(allIds);
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationPress = async (item: AppNotification) => {
    if (!item.isRead) {
      await markNotificationAsRead(item.id);
      setReadIds(prev => [...prev, item.id]);
      setNotifications(prev =>
        prev.map(n => (n.id === item.id ? { ...n, isRead: true } : n))
      );
    }

    if (item.type === 'reward' && onNavigateToRewards) {
      onNavigateToRewards();
    } else if ((item.type === 'stamp' || item.type === 'milestone') && onNavigateToCards) {
      onNavigateToCards();
    }
  };

  const filteredNotifications = notifications.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'reward') return item.type === 'reward';
    if (activeFilter === 'stamp') return item.type === 'stamp' || item.type === 'milestone';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'reward':
        return (
          <View style={[styles.iconBox, styles.rewardIconBox]}>
            <Gift size={22} strokeWidth={2} color={PALETTE.primary} />
          </View>
        );
      case 'milestone':
        return (
          <View style={[styles.iconBox, styles.milestoneIconBox]}>
            <Sparkles size={22} strokeWidth={2} color={PALETTE.warning} />
          </View>
        );
      case 'stamp':
        return (
          <View style={[styles.iconBox, styles.stampIconBox]}>
            <Ticket size={22} strokeWidth={2} color="#0284C7" />
          </View>
        );
      default:
        return (
          <View style={[styles.iconBox, styles.systemIconBox]}>
            <Bell size={22} strokeWidth={2} color={PALETTE.onSurface} />
          </View>
        );
    }
  };

  const renderItem = ({ item }: { item: AppNotification }) => {
    return (
      <TouchableOpacity
        style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.85}
      >
        <View style={styles.cardHeader}>
          {renderIcon(item.type)}
          <View style={styles.cardContent}>
            <View style={styles.titleRow}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {!item.isRead && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.itemMessage}>{item.message}</Text>
            <View style={styles.metaRow}>
              <Clock size={12} strokeWidth={2} color={PALETTE.onSurfaceMuted} />
              <Text style={styles.timestamp}>{item.timestamp}</Text>
              {item.type === 'reward' && (
                <View style={styles.actionPill}>
                  <Text style={styles.actionPillText}>Claim Reward</Text>
                  <ChevronRight size={12} strokeWidth={2.5} color={PALETTE.primary} />
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.8}
        >
          <ArrowLeft size={22} strokeWidth={2} color={PALETTE.onSurface} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.eyebrow}>UPDATES & ALERTS</Text>
          <View style={styles.titleWithBadge}>
            <Text style={styles.headerTitle}>Notifications</Text>
            {unreadCount > 0 && (
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </View>

        {unreadCount > 0 && (
          <TouchableOpacity
            style={styles.markReadButton}
            onPress={handleMarkAllRead}
            activeOpacity={0.8}
          >
            <CheckCheck size={16} strokeWidth={2} color={PALETTE.primary} />
            <Text style={styles.markReadText}>Read All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.filtersRow}>
        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'all' && styles.filterChipActive]}
          onPress={() => setActiveFilter('all')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.filterChipText,
              activeFilter === 'all' && styles.filterChipTextActive,
            ]}
          >
            All ({notifications.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'reward' && styles.filterChipActive]}
          onPress={() => setActiveFilter('reward')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.filterChipText,
              activeFilter === 'reward' && styles.filterChipTextActive,
            ]}
          >
            Rewards ({notifications.filter(n => n.type === 'reward').length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'stamp' && styles.filterChipActive]}
          onPress={() => setActiveFilter('stamp')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.filterChipText,
              activeFilter === 'stamp' && styles.filterChipTextActive,
            ]}
          >
            Stamps ({notifications.filter(n => n.type === 'stamp' || n.type === 'milestone').length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            tintColor={PALETTE.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Bell size={36} strokeWidth={1.8} color={PALETTE.onSurfaceMuted} />
            </View>
            <Text style={styles.emptyTitle}>You're All Caught Up!</Text>
            <Text style={styles.emptySubtitle}>
              New stamps, unlockable rewards, and activity alerts will appear here.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: PALETTE.surface,
    borderBottomWidth: 1,
    borderBottomColor: PALETTE.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 2,
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.headlineMd,
    color: PALETTE.onSurface,
    fontWeight: '800',
  },
  countBadge: {
    marginLeft: 8,
    backgroundColor: PALETTE.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADII.full,
  },
  countBadgeText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onPrimary,
    fontWeight: '700',
    fontSize: 11,
  },
  markReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
  },
  markReadText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.primary,
    marginLeft: 4,
    fontWeight: '700',
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
  },
  filterChipActive: {
    backgroundColor: PALETTE.surfaceContrast,
    borderColor: PALETTE.surfaceContrast,
  },
  filterChipText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onSurfaceVariant,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: PALETTE.surface,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  notificationCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: PALETTE.border,
    ...SHADOWS.softCard,
  },
  unreadCard: {
    borderColor: PALETTE.primary,
    backgroundColor: '#FFFAF9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: RADII.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rewardIconBox: {
    backgroundColor: PALETTE.illusCoralBg,
  },
  milestoneIconBox: {
    backgroundColor: '#FEF6EE',
  },
  stampIconBox: {
    backgroundColor: '#EFF8FF',
  },
  systemIconBox: {
    backgroundColor: PALETTE.surfaceAlt,
  },
  cardContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemTitle: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onSurface,
    fontWeight: '700',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.primary,
    marginLeft: 8,
  },
  itemMessage: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timestamp: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceMuted,
    marginLeft: 4,
    flex: 1,
  },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.illusCoralBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADII.full,
  },
  actionPillText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.primary,
    fontWeight: '700',
    fontSize: 11,
    marginRight: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceMuted,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
});
