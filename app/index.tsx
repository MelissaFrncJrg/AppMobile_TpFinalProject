import { useBatteryLevel } from 'expo-battery';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function App() {
  const batteryLevel = useBatteryLevel();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>
        Current Battery Level: {batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : 'Loading...'}
      </Text>

      <View>
        <Button title="Send Data" onPress={() => router.push('/send')} />
        <Button title="View History" onPress={() => router.push('/list')} />
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
  },
});
