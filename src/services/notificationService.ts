import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomerCard } from './api';

export interface AppNotification {
  id: string;
  type: 'reward' | 'stamp' | 'milestone' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  businessName?: string;
  rewardTitle?: string;
  cardId?: string;
}

const READ_NOTIFICATIONS_KEY = '@loyaltyapp_read_notifications_v1';

export async function getReadNotificationIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(READ_NOTIFICATIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function markNotificationAsRead(id: string): Promise<void> {
  try {
    const current = await getReadNotificationIds();
    if (!current.includes(id)) {
      current.push(id);
      await AsyncStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify(current));
    }
  } catch {
    // Ignore storage errors
  }
}

export async function markAllNotificationsAsRead(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage errors
  }
}

export function generateNotificationsFromCards(
  cards: CustomerCard[],
  readIds: string[]
): AppNotification[] {
  const notifications: AppNotification[] = [];

  // 1. Ready Rewards Notifications
  const readyCards = cards.filter(c => c.isRewardAvailable);
  readyCards.forEach(c => {
    const businessName =
      (typeof c.loyaltyCard?.business === 'object'
        ? c.loyaltyCard.business?.businessName
        : undefined) || 'Participating Store';
    const rewardTitle = c.loyaltyCard?.reward || 'Free Reward';
    const id = `reward_${c._id || c.loyaltyCard?._id}`;

    notifications.push({
      id,
      type: 'reward',
      title: '🎉 Reward Ready to Claim!',
      message: `You completed your stamps at ${businessName}! "${rewardTitle}" is ready to redeem in-store.`,
      timestamp: 'Available now',
      isRead: readIds.includes(id),
      businessName,
      rewardTitle,
      cardId: c.loyaltyCard?._id,
    });
  });

  // 2. Active Stamp Progress Notifications
  const activeCards = cards.filter(c => !c.isRewardAvailable && (c.currentStamps || 0) > 0);
  activeCards.forEach(c => {
    const businessName =
      (typeof c.loyaltyCard?.business === 'object'
        ? c.loyaltyCard.business?.businessName
        : undefined) || 'Store';
    const remaining = Math.max((c.loyaltyCard?.totalStamps || 10) - (c.currentStamps || 0), 0);
    const id = `stamp_${c._id || c.loyaltyCard?._id}_${c.currentStamps}`;

    if (remaining <= 2 && remaining > 0) {
      notifications.push({
        id: `milestone_${id}`,
        type: 'milestone',
        title: '🔥 Almost There!',
        message: `Only ${remaining} stamp${remaining > 1 ? 's' : ''} left at ${businessName} to unlock your reward!`,
        timestamp: 'Recent progress',
        isRead: readIds.includes(`milestone_${id}`),
        businessName,
        cardId: c.loyaltyCard?._id,
      });
    } else {
      notifications.push({
        id,
        type: 'stamp',
        title: '⭐ Stamp Added',
        message: `You have ${c.currentStamps}/${c.loyaltyCard?.totalStamps || 10} stamps collected at ${businessName}.`,
        timestamp: 'Active card',
        isRead: readIds.includes(id),
        businessName,
        cardId: c.loyaltyCard?._id,
      });
    }
  });

  // 3. Welcome / System Notification
  const welcomeId = 'system_welcome_loyalty';
  notifications.push({
    id: welcomeId,
    type: 'system',
    title: '👋 Welcome to LoyaltyApp',
    message: 'Explore local shops, scan QR codes at checkout, and earn free loyalty rewards on every visit.',
    timestamp: 'Always active',
    isRead: readIds.includes(welcomeId),
  });

  return notifications;
}
