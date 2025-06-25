import { removeToken } from '@/utils/auth';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await removeToken();
      router.replace('/login');
    };
    logout();
  }, []);

  return null;
}
