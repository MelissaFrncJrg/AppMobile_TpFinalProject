import { getToken } from '@/utils/auth';
import { useBatteryLevel } from 'expo-battery';
import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

const API_URL = 'https://685baa6a89952852c2da720a.mockapi.io/api/battery';

export default function SendScreen() {
  const batteryLevel = useBatteryLevel();

  const handleSend = async () => {
    if (batteryLevel === null) {
      Alert.alert('Error', 'Battery level is not available yet.');
      return;
    }

    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Error', 'You are not authenticated.');
        return;
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          level: batteryLevel,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Unknown error');
      }

      Alert.alert('Success', 'Battery data sent!');
    } catch (error) {
      console.error('POST Error:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('Error', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Battery Level: {(batteryLevel * 100).toFixed(0)}%
      </Text>
      <Button title="Send to API" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 24, marginBottom: 20,
  },
});
