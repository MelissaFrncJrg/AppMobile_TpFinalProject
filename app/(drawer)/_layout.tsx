import { removeToken } from '@/utils/auth';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Alert } from 'react-native';

function CustomDrawerContent(props: any) {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout??',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await removeToken();
            router.replace('/login');
          },
        },
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => router.navigate('/')}
        icon={({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitle: 'Battery App',
        drawerStyle: {
          backgroundColor: '#f6f6f6',
          width: 240,
        },
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          title: 'Battery App',
        }}
      />
    </Drawer>
  );
}