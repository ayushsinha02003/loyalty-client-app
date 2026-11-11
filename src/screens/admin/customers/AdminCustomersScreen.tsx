import React, { useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AlertCircle,
  CreditCard,
  Gift,
  Phone,
  PlusCircle,
  QrCode,
  Search,
  Star,
  User,
  Users,
  X,
} from 'lucide-react-native';
import { useBusinessCustomers } from '../../../hooks/useApi';
import PrimaryText from '../../../components/text/PrimaryText';
import { stampApi, rewardApi } from '../../../services/api';
import { AdminCustomersScreenSkeleton } from '../../../components/skeleton';
import { PALETTE, RADII, SHADOWS, TYPOGRAPHY } from '../../../constants/theme';

interface AdminCustomersScreenProps {
  onOpenScanner?: () => void;
}

export default function AdminCustomersScreen({
  onOpenScanner,
}: AdminCustomersScreenProps = {}) {
  const [search, setSearch] = useState('');
  const { customers, loading, error, refetch } = useBusinessCustomers();
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  if (loading && (!customers || customers.length === 0)) {
    return <AdminCustomersScreenSkeleton />;
  }

  const filtered =
    customers?.filter(
      (c: any) =>
        c.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.customer?.phone?.includes(search) ||
        c.loyaltyCard?.title?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const handleAddStamp = async (
    customerCardId: string,
    customerName: string
  ) => {
    setActionLoadingId(customerCardId);
    try {
      const response = await stampApi.addStampByCard(customerCardId);
      if (response.success) {
        Alert.alert('Stamp Added', `Awarded 1 stamp to ${customerName}.`);
        refetch();
      } else {
        Alert.alert('Error', response.message || 'Failed to add stamp');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to add stamp');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRedeemReward = async (
    customerCardId: string,
    customerName: string
  ) => {
    setActionLoadingId(customerCardId);
    try {
      const response = await rewardApi.redeem(customerCardId);
      if (response.success) {
        Alert.alert(
          'Reward Redeemed',
          `Reward claimed for ${customerName}!`
        );
        refetch();
      } else {
        Alert.alert('Error', response.message || 'Failed to redeem reward');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to redeem reward');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={PALETTE.surfaceAlt} />

      <View style={styles.header}>
        <View>
          <PrimaryText text="Membership" customStyle={styles.eyebrow} />
          <PrimaryText text="Customers" customStyle={styles.title} />
          <Text style={styles.subtitle}>
            {customers?.length || 0} active{' '}
            {customers?.length === 1 ? 'member' : 'members'} enrolled
          </Text>
        </View>

        {onOpenScanner && (
          <TouchableOpacity
            style={styles.scanHeaderButton}
            onPress={onOpenScanner}
            activeOpacity={0.85}
          >
            <QrCode size={16} strokeWidth={2} color={PALETTE.primary} />
            <Text style={styles.scanHeaderButtonText}>Scan QR</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Search Pill */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, phone, or card..."
            placeholderTextColor={PALETTE.onSurfaceMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch('')}
              hitSlop={10}
              style={styles.clearBtn}
            >
              <X size={16} strokeWidth={2} color={PALETTE.onSurfaceMuted} />
            </TouchableOpacity>
          )}
          <View style={styles.searchSubmitCircle}>
            <Search size={18} strokeWidth={2} color={PALETTE.onPrimary} />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor={PALETTE.primary}
          />
        }
      >
        {error ? (
          <View style={styles.errorCard}>
            <AlertCircle size={36} strokeWidth={2} color={PALETTE.primary} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filtered.length > 0 ? (
          filtered.map((customerCard: any) => {
            const customer = customerCard.customer || {};
            const card = customerCard.loyaltyCard || {};
            const isRewardReady = customerCard.isRewardAvailable;
            const isProcessing = actionLoadingId === customerCard._id;
            const initial = customer.name
              ? customer.name.charAt(0).toUpperCase()
              : null;

            return (
              <View key={customerCard._id} style={styles.customerCard}>
                <View style={styles.customerRow}>
                  <View style={styles.avatarCircle}>
                    {initial ? (
                      <Text style={styles.avatarInitial}>{initial}</Text>
                    ) : (
                      <User size={20} strokeWidth={2} color={PALETTE.primary} />
                    )}
                  </View>

                  <View style={styles.customerInfo}>
                    <Text style={styles.customerName} numberOfLines={1}>
                      {customer.name || 'Customer'}
                    </Text>
                    <View style={styles.detailRow}>
                      <Phone
                        size={12}
                        strokeWidth={2}
                        color={PALETTE.onSurfaceVariant}
                      />
                      <Text style={styles.customerPhone}>
                        {customer.phone || 'No phone'}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <CreditCard
                        size={12}
                        strokeWidth={2}
                        color={PALETTE.primary}
                      />
                      <Text style={styles.cardTitle} numberOfLines={1}>
                        {card.title || 'Loyalty Program'}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.stampBadge,
                      isRewardReady && styles.stampBadgeReady,
                    ]}
                  >
                    {isRewardReady ? (
                      <Gift size={12} strokeWidth={2} color={PALETTE.primary} />
                    ) : (
                      <Star
                        size={12}
                        strokeWidth={2}
                        color={PALETTE.warning}
                        fill={PALETTE.warning}
                      />
                    )}
                    <Text
                      style={[
                        styles.stampValue,
                        isRewardReady && styles.stampValueReady,
                      ]}
                    >
                      {customerCard.currentStamps || 0}/{card.totalStamps || 10}
                    </Text>
                  </View>
                </View>

                <View style={styles.actionRow}>
                  {isRewardReady ? (
                    <TouchableOpacity
                      style={styles.redeemButton}
                      onPress={() =>
                        handleRedeemReward(
                          customerCard._id,
                          customer.name || 'Customer'
                        )
                      }
                      disabled={isProcessing}
                      activeOpacity={0.85}
                    >
                      <Gift
                        size={16}
                        strokeWidth={2}
                        color={PALETTE.primary}
                      />
                      <Text style={styles.redeemButtonText}>
                        {isProcessing ? 'Redeeming...' : 'Redeem Reward'}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.addStampButton}
                      onPress={() =>
                        handleAddStamp(
                          customerCard._id,
                          customer.name || 'Customer'
                        )
                      }
                      disabled={isProcessing}
                      activeOpacity={0.85}
                    >
                      <PlusCircle
                        size={16}
                        strokeWidth={2}
                        color={PALETTE.onPrimary}
                      />
                      <Text style={styles.addStampButtonText}>
                        {isProcessing ? 'Adding Stamp...' : 'Add 1 Stamp'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Users size={28} strokeWidth={2} color={PALETTE.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Customers Found</Text>
            <Text style={styles.emptySubtitle}>
              {search
                ? 'No customers match your search.'
                : 'Customers who join your loyalty program will appear here.'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.surfaceAlt,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyebrow: {
    ...TYPOGRAPHY.labelUppercase,
    color: PALETTE.onSurfaceVariant,
    marginBottom: 4,
  },
  title: {
    ...TYPOGRAPHY.displayMd,
    color: PALETTE.onSurface,
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
    marginTop: 2,
  },
  scanHeaderButton: {
    backgroundColor: PALETTE.surfaceContrast,
    paddingHorizontal: 14,
    height: 40,
    borderRadius: RADII.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scanHeaderButtonText: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.surface,
  },
  searchWrapper: {
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.full,
    paddingLeft: 20,
    paddingRight: 7,
    height: 54,
    borderWidth: 1,
    borderColor: PALETTE.border,
    ...SHADOWS.softCard,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
    paddingRight: 8,
  },
  clearBtn: {
    padding: 6,
    marginRight: 4,
  },
  searchSubmitCircle: {
    width: 40,
    height: 40,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    gap: 14,
  },
  customerCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 18,
    ...SHADOWS.softCard,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarInitial: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.primary,
  },
  customerInfo: {
    flex: 1,
    marginRight: 8,
  },
  customerName: {
    ...TYPOGRAPHY.headlineSm,
    color: PALETTE.onSurface,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 3,
  },
  customerPhone: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.onSurfaceVariant,
  },
  cardTitle: {
    ...TYPOGRAPHY.caption,
    color: PALETTE.primary,
    fontWeight: '600',
    flex: 1,
  },
  stampBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: PALETTE.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADII.sm,
  },
  stampBadgeReady: {
    backgroundColor: PALETTE.surfaceContrast,
  },
  stampValue: {
    ...TYPOGRAPHY.labelSm,
    color: PALETTE.onSurface,
  },
  stampValueReady: {
    color: PALETTE.surface,
  },
  actionRow: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: PALETTE.border,
  },
  addStampButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: PALETTE.primary,
    height: 46,
    borderRadius: RADII.full,
    ...SHADOWS.btn,
  },
  addStampButtonText: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 14,
    color: PALETTE.onPrimary,
  },
  redeemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: PALETTE.surfaceContrast,
    height: 46,
    borderRadius: RADII.full,
  },
  redeemButtonText: {
    ...TYPOGRAPHY.labelSm,
    fontSize: 14,
    color: PALETTE.surface,
  },
  errorCard: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: 28,
    alignItems: 'center',
    gap: 12,
    ...SHADOWS.softCard,
  },
  errorText: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurface,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: PALETTE.primary,
    paddingHorizontal: 28,
    height: 48,
    borderRadius: RADII.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.btn,
  },
  retryButtonText: {
    ...TYPOGRAPHY.labelMd,
    color: PALETTE.onPrimary,
  },
  emptyState: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: PALETTE.border,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    ...SHADOWS.softCard,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: RADII.full,
    backgroundColor: PALETTE.illusCoralBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    ...TYPOGRAPHY.headlineMd,
    color: PALETTE.onSurface,
    marginBottom: 6,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.bodySm,
    color: PALETTE.onSurfaceVariant,
    textAlign: 'center',
  },
});
