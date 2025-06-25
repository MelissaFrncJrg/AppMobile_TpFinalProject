import { getToken } from '@/utils/auth';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function TabLayout() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const check = async () => {
      const token = await getToken();
      setIsConnected(!!token);
      setAuthChecked(true);
    };
    check();
  }, []);

  if (!authChecked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isConnected) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
      }}
    >
      <Tabs.Screen
        name="send"
        options={{
          title: 'Envoyer',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="send" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'Historique',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}