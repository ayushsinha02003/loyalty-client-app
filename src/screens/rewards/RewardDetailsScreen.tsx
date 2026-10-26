import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface RewardDetailsScreenProps {
  title?: string;
  stampsCost?: number;
  description?: string;
  imageUrl?: string;
  validityDays?: number;
  onBack?: () => void;
  onRedeem?: () => void;
}

export default function RewardDetailsScreen({
  title = 'Free Coffee',
  stampsCost = 100,
  description = 'Enjoy any hot coffee on us. Valid in all our branches.',
  imageUrl = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
  validityDays = 30,
  onBack,
  onRedeem,
}: RewardDetailsScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Navigation Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.headerButton}
          activeOpacity={0.7}
        >
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Reward Details</Text>

        <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
          <Text style={styles.headerIcon}>♡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Large Hero Image */}
        <View style={styles.imageCard}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Title & Cost Badge */}
        <View style={styles.detailsSection}>
          <View style={styles.titleRow}>
            <Text style={styles.rewardTitle}>{title}</Text>
          </View>

          <View style={styles.costBadge}>
            <Text style={styles.costBadgeText}>{stampsCost} Stamps</Text>
          </View>

          <Text style={styles.descriptionText}>{description}</Text>

          {/* Terms & Conditions Section */}
          <View style={styles.termsSection}>
            <View style={styles.termItem}>
              <View style={styles.termIconCircle}>
                <Text style={styles.termIcon}>✓</Text>
              </View>
              <Text style={styles.termText}>Valid for {validityDays} days</Text>
            </View>

            <View style={styles.termItem}>
              <View style={styles.termIconCircle}>
                <Text style={styles.termIcon}>✓</Text>
              </View>
              <Text style={styles.termText}>One time use only</Text>
            </View>

            <View style={styles.termItem}>
              <View style={styles.termIconCircle}>
                <Text style={styles.termIcon}>✓</Text>
              </View>
              <Text style={styles.termText}>Not valid with other offers</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.redeemButton}
          onPress={onRedeem}
          activeOpacity={0.85}
        >
          <Text style={styles.redeemButtonText}>Redeem Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 20,
    color: '#1E293B',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  imageCard: {
    marginTop: 12,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  heroImage: {
    width: '100%',
    height: 220,
  },
  detailsSection: {
    marginTop: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rewardTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E293B',
  },
  costBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 16,
  },
  costBadgeText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '700',
  },
  descriptionText: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 24,
  },
  termsSection: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  termIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  termIcon: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '800',
  },
  termText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#F1F5F9',
  },
  redeemButton: {
    backgroundColor: '#6366F1',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  redeemButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
