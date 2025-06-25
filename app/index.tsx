import { getToken, removeToken } from '@/utils/auth';
import { useBatteryLevel } from 'expo-battery';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const batteryLevel = useBatteryLevel();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      setConnected(!!token);
      setLoading(false);
    };
    checkToken();
  }, []);

  const handleLogout = async () => {
    await removeToken();
    router.replace('/login');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>
        Current Battery Level:{' '}
        {batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : 'Loading...'}
      </Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Send Data" onPress={() => router.push('/send')} />
        <Button title="View History" onPress={() => router.push('/list')} />
        {connected && (
          <View style={{ marginTop: 10 }}>
            <Button title="Logout" color="red" onPress={handleLogout} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
