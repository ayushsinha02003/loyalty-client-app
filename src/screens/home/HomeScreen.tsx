import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PrimaryHeader from '../../components/common/PrimaryHeader';
import PrimaryStampProgressCard from '../../components/cards/stampProgressCard/PrimaryStampProgressCard';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <PrimaryHeader
        name="Ayush"
        subtitle="Collect stamps. Earn rewards."
        notificationCount={3}
        onMenuPress={() => {
          console.log('Menu pressed');
        }}
        onNotificationPress={() => {
          console.log('Notification pressed');
        }}
      />

      <View style={styles.content}>
        <PrimaryStampProgressCard
          currentStamps={7}
          totalStamps={10}
        />
        <Text>Home Screen</Text>
      </View>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    flex: 1,
    padding: 5,
  },
});