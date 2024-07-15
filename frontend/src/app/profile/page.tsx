"use client";
import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';

import Avatar from './components/Avatar';
import Dashboard from './components/Dashboard';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [colorBottom, setColorBottom] = useState('#FFFFFF');
  const [colorTop, setColorTop] = useState('#FFFFFF');

  useEffect(() => {
    if (user) {
      setUsername(user!.user.username);
      setEmail(user!.user.email);
      setColorBottom(user!.color_bottom);
      setColorTop(user!.color_top);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ user: { id: user!.user.id, username, email }, color_bottom: colorBottom, color_top: colorTop });
  };

  return (
    <ProtectedRoute>
      <div className='w-full h-[100svh] flex flex-col items-center'>
        <Avatar />
        <Dashboard />
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
