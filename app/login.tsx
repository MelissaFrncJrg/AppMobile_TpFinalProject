import { setToken } from '@/utils/auth';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://685baa6a89952852c2da720a.mockapi.io/api/users?email=${email}`);
      const users = await response.json();

      if (users.length === 0) throw new Error('User not found');
      const user = users[0];

      if (user.password !== password) throw new Error('Incorrect password');

      await setToken(user.token);
      router.replace('/list');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Log in" onPress={handleLogin} />
    </View>
  );
}