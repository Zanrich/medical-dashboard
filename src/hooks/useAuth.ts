import { useState, useCallback } from 'react';
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setUser({
        id: '1',
        firstName: 'Adrian',
        lastName: 'Stefan',
        email: 'adrian@example.com',
        role: 'admin',
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return {
    user,
    loading,
    login,
    logout,
  };
};
