import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { setToken } from '../utils/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
        const response = await fetch(`https://685baa6a89952852c2da720a.mockapi.io/api/users?email=${email}`);
        const users = await response.json();

        if (users.length === 0) {
        throw new Error("User not found");
        }

        const user = users[0];

        if (user.password !== password) {
        throw new Error("Incorrect password");
        }

        await setToken(user.token);
        router.replace('/list');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Log in" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center'},
  input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 10 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
});
