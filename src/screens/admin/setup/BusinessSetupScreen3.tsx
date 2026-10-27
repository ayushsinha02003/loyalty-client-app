import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface BusinessSetupScreen3Props {
  onBack?: () => void;
  onEdit?: () => void;
  onCreateBusiness?: () => void;
  businessName?: string;
  category?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export default function BusinessSetupScreen3({
  onBack,
  onEdit,
  onCreateBusiness,
  businessName = 'Brew & Beans',
  category = 'Coffee Shop',
  address = '123, MG Road, Indore, MP',
  phone = '+91 98765 43210',
  email = 'business@email.com',
}: BusinessSetupScreen3Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        {/* Header with Stepper */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <View style={styles.stepperContainer}>
            <View style={[styles.stepDot, styles.stepDotActive]} />
            <View style={[styles.stepLine, styles.stepLineActive]} />
            <View style={[styles.stepDot, styles.stepDotActive]} />
            <View style={[styles.stepLine, styles.stepLineActive]} />
            <View style={[styles.stepDot, styles.stepDotActive]} />
          </View>

          <View style={styles.placeholder} />
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Almost Done!{'\n'}Review & Confirm</Text>
        </View>

        {/* Business Preview Card */}
        <View style={styles.previewSection}>
          <Text style={styles.previewHeading}>Business Preview</Text>

          <View style={styles.previewCard}>
            {/* Business Logo & Name Row */}
            <View style={styles.cardHeader}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoEmoji}>☕</Text>
              </View>

              <View style={styles.cardHeaderInfo}>
                <Text style={styles.businessName}>{businessName}</Text>
                <Text style={styles.businessCategory}>{category}</Text>
              </View>

              <TouchableOpacity onPress={onEdit} style={styles.editButton}>
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Details List */}
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>📍</Text>
              <Text style={styles.detailText}>{address}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>📞</Text>
              <Text style={styles.detailText}>{phone}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>✉️</Text>
              <Text style={styles.detailText}>{email}</Text>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={onCreateBusiness}
          activeOpacity={0.85}
        >
          <Text style={styles.createButtonText}>Create Business</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: '#1E293B',
    fontWeight: '600',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E2E8F0',
  },
  stepDotActive: {
    backgroundColor: '#4F46E5',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stepLine: {
    width: 24,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  stepLineActive: {
    backgroundColor: '#4F46E5',
  },
  placeholder: {
    width: 44,
  },
  titleSection: {
    marginTop: 18,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    lineHeight: 36,
  },
  previewSection: {
    flex: 1,
  },
  previewHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 12,
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#065F46',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 26,
  },
  cardHeaderInfo: {
    flex: 1,
    marginLeft: 14,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  businessCategory: {
    fontSize: 14,
    color: '#64748B',
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 18,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#475569',
    flex: 1,
  },
  createButton: {
    backgroundColor: '#4F46E5',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
