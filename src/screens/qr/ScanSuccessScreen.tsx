import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface ScanSuccessScreenProps {
  businessName?: string;
  stampsEarned?: number;
  currentStamps?: number;
  totalStamps?: number;
  onViewCard?: () => void;
  onDone?: () => void;
}

export default function ScanSuccessScreen({
  businessName = 'Brew & Beans',
  stampsEarned = 1,
  currentStamps = 8,
  totalStamps = 10,
  onViewCard,
  onDone,
}: ScanSuccessScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        {/* Top Success Badge */}
        <View style={styles.successIconBadge}>
          <Text style={styles.checkmarkIcon}>✓</Text>
        </View>

        {/* Title & Subtitle */}
        <Text style={styles.title}>Stamp Added!</Text>
        <Text style={styles.subtitle}>You earned {stampsEarned} stamp</Text>

        {/* Central Celebratory Graphic */}
        <View style={styles.illustrationWrapper}>
          {/* Confetti Particles */}
          <Svg width={240} height={200} viewBox="0 0 200 180" style={styles.confettiSvg}>
            {/* Confetti dots and ribbons */}
            <Circle cx="30" cy="35" r="4" fill="#F59E0B" />
            <Circle cx="170" cy="40" r="3.5" fill="#EC4899" />
            <Circle cx="45" cy="110" r="3" fill="#10B981" />
            <Circle cx="165" cy="120" r="4" fill="#3B82F6" />
            <Rect x="20" y="70" width="8" height="4" rx="2" fill="#8B5CF6" transform="rotate(25 20 70)" />
            <Rect x="175" y="75" width="8" height="4" rx="2" fill="#F59E0B" transform="rotate(-30 175 75)" />
            <Rect x="50" y="145" width="7" height="3.5" rx="1.5" fill="#EF4444" transform="rotate(45 50 145)" />
            <Rect x="150" y="150" width="8" height="4" rx="2" fill="#10B981" transform="rotate(-20 150 150)" />

            {/* Glowing Big Center Circle */}
            <Circle cx="100" cy="90" r="58" fill="#6366F1" />
            <Circle cx="100" cy="90" r="48" fill="#4F46E5" />

            {/* Coffee Cup Icon */}
            {/* Cup Body */}
            <Path
              d="M80 78 L84 104 C84 110 88 114 94 114 L106 114 C112 114 116 110 116 104 L120 78 Z"
              fill="#FFFFFF"
            />
            {/* Cup Handle */}
            <Path
              d="M120 83 C127 83 129 93 120 95"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Steam Lines */}
            <Path
              d="M92 72 Q94 65 92 60"
              stroke="#E0E7FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <Path
              d="M100 70 Q102 63 100 58"
              stroke="#E0E7FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <Path
              d="M108 72 Q110 65 108 60"
              stroke="#E0E7FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </Svg>

          {/* Floating +1 Stamp Pill */}
          <View style={styles.stampPill}>
            <Text style={styles.stampPillText}>+{stampsEarned} Stamp</Text>
          </View>
        </View>

        {/* Card Progress Summary Box */}
        <View style={styles.cardSummaryBox}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardName}>{businessName}</Text>
            <Text style={styles.cardProgressCount}>
              {currentStamps}/{totalStamps} Stamps Collected
            </Text>
          </View>

          {/* Stamp Dots Row */}
          <View style={styles.stampDotsRow}>
            {Array.from({ length: totalStamps }).map((_, idx) => {
              const isFilled = idx < currentStamps;
              const isLast = idx === totalStamps - 1;
              return (
                <View
                  key={idx}
                  style={[
                    styles.stampDot,
                    isFilled && styles.stampDotFilled,
                    isLast && styles.stampDotGift,
                  ]}
                >
                  <Text style={styles.stampDotEmoji}>
                    {isLast ? '🎁' : isFilled ? '☕' : ''}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.viewCardButton}
            onPress={onViewCard}
            activeOpacity={0.85}
          >
            <Text style={styles.viewCardText}>View Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={onDone}
            activeOpacity={0.7}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  successIconBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  checkmarkIcon: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 14,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 4,
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 180,
  },
  confettiSvg: {
    position: 'absolute',
  },
  stampPill: {
    position: 'absolute',
    bottom: 8,
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  stampPillText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '700',
  },
  cardSummaryBox: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  cardProgressCount: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  stampDotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stampDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampDotFilled: {
    backgroundColor: '#6366F1',
  },
  stampDotGift: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  stampDotEmoji: {
    fontSize: 12,
  },
  buttonContainer: {
    width: '100%',
  },
  viewCardButton: {
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
  viewCardText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  doneButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  doneText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '600',
  },
});
