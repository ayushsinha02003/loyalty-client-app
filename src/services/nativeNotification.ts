import { AppState, AppStateStatus, NativeModules, Platform } from 'react-native';
import { CustomerCard } from './api';

const { NotificationModule } = NativeModules;

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS !== 'android' || !NotificationModule) {
    return false;
  }
  try {
    return await NotificationModule.requestPermission();
  } catch {
    return false;
  }
}

export async function checkNotificationPermission(): Promise<boolean> {
  if (Platform.OS !== 'android' || !NotificationModule) {
    return false;
  }
  try {
    return await NotificationModule.checkPermission();
  } catch {
    return false;
  }
}

export async function showLocalNotification(
  id: number,
  title: string,
  message: string
): Promise<boolean> {
  if (Platform.OS !== 'android' || !NotificationModule) {
    return false;
  }
  try {
    return await NotificationModule.showNotification(id, title, message);
  } catch {
    return false;
  }
}

export async function scheduleLocalNotification(
  id: number,
  title: string,
  message: string,
  delaySeconds: number
): Promise<boolean> {
  if (Platform.OS !== 'android' || !NotificationModule) {
    return false;
  }
  try {
    return await NotificationModule.scheduleNotification(id, title, message, delaySeconds);
  } catch {
    return false;
  }
}

export async function cancelLocalNotification(id: number): Promise<boolean> {
  if (Platform.OS !== 'android' || !NotificationModule) {
    return false;
  }
  try {
    return await NotificationModule.cancelNotification(id);
  } catch {
    return false;
  }
}

/**
 * Fires an immediate device notification when a user earns a stamp.
 */
export async function notifyStampEarned(
  businessName: string,
  current: number,
  total: number
): Promise<void> {
  const isCompleted = current >= total;
  const title = isCompleted ? '🎉 Reward Unlocked!' : '⭐ Stamp Collected!';
  const message = isCompleted
    ? `Congratulations! You've unlocked your reward at ${businessName}. Open the app to claim.`
    : `You earned a stamp at ${businessName}! You now have ${current}/${total} stamps.`;

  await showLocalNotification(Date.now() % 100000, title, message);
}

/**
 * Monitors app lifecycle to schedule lockscreen/device notifications when the app is backgrounded or closed.
 */
export function setupBackgroundNotificationWatcher(getCards: () => CustomerCard[]): () => void {
  if (Platform.OS !== 'android' || !NotificationModule) {
    return () => {};
  }

  // Request permission upon setup
  requestNotificationPermission().catch(() => {});

  const handleAppStateChange = (nextState: AppStateStatus) => {
    if (nextState === 'background') {
      const cards = getCards();
      const readyCards = cards.filter(c => c.isRewardAvailable);

      if (readyCards.length > 0) {
        const topCard = readyCards[0];
        const store =
          (typeof topCard.loyaltyCard?.business === 'object'
            ? topCard.loyaltyCard.business?.businessName
            : undefined) || 'your favorite store';

        scheduleLocalNotification(
          7001,
          '🎁 Free Reward Waiting!',
          `You have an unlocked reward ready to claim at ${store}. Tap to open your wallet.`,
          10
        ).catch(() => {});
      } else if (cards.length > 0) {
        scheduleLocalNotification(
          7002,
          '⭐ Keep Collecting Stamps',
          'Remember to show your LoyaltyApp QR code on your next visit to earn rewards!',
          30
        ).catch(() => {});
      }
    } else if (nextState === 'active') {
      // User returned to app; cancel pending reminders
      cancelLocalNotification(7001).catch(() => {});
      cancelLocalNotification(7002).catch(() => {});
    }
  };

  const subscription = AppState.addEventListener('change', handleAppStateChange);

  return () => {
    subscription.remove();
  };
}

