import { getToken } from '@/utils/auth';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';

const API_URL = 'https://685baa6a89952852c2da720a.mockapi.io/api/battery';

type BatteryEntry = {
  id: string;
  level: number;
  timestamp: string;
};

export default function ListScreen() {
  const [data, setData] = useState<BatteryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBatteryData = async () => {
      try {
        const token = await getToken();

        if (!token) {
          router.replace('/login');
          return;
        }

        const response = await fetch(API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (e) {
        console.error('Error fetching battery data', e);
        Alert.alert('Error', 'Unable to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchBatteryData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery History</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {new Date(item.timestamp).toLocaleString()} - {(item.level * 100).toFixed(0)}%
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  item: {
    fontSize: 18,
    marginVertical: 5,
  },
});
