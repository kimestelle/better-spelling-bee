"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { username } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.push('/');
    }
  }, [username, router]);

  return <>{username ? children : null}</>;
};

export default ProtectedRoute;
