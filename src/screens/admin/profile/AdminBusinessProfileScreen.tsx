import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface AdminBusinessProfileScreenProps {
  onEdit?: () => void;
}

export default function AdminBusinessProfileScreen({
  onEdit,
}: AdminBusinessProfileScreenProps) {
  const profileFields = [
    { label: 'Business Name', value: 'Brew & Beans' },
    { label: 'Category', value: 'Coffee Shop' },
    { label: 'Address', value: '123, MG Road, Indore, MP' },
    { label: 'Contact Number', value: '+91  98765 43210' },
    { label: 'Email', value: 'business@email.com' },
    { label: 'Working Hours', value: '9:00 AM - 10:00 PM' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Business Profile</Text>
        <TouchableOpacity
          onPress={onEdit}
          style={styles.editButton}
          activeOpacity={0.7}
        >
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Business Avatar & Branding */}
        <View style={styles.brandingCard}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>☕</Text>
          </View>
          <Text style={styles.businessName}>Brew & Beans</Text>
          <Text style={styles.businessCategory}>Coffee Shop</Text>
        </View>

        {/* Profile Field Details */}
        <View style={styles.fieldsContainer}>
          {profileFields.map((field, idx) => (
            <View key={idx} style={styles.fieldItem}>
              <View style={styles.fieldInfo}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <Text style={styles.fieldValue}>{field.value}</Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    fontSize: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  brandingCard: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#065F46',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  logoEmoji: {
    fontSize: 38,
  },
  businessName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  businessCategory: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  fieldsContainer: {
    marginTop: 8,
  },
  fieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  fieldInfo: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 3,
  },
  fieldValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#CBD5E1',
    fontWeight: '300',
  },
});
