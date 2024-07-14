"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import UserDataService from '../services/UserDataService';

interface LoginWindowProps {
  setLoginScreen: (value: boolean) => void;
}

const LoginWindow: React.FC<LoginWindowProps> = ({ setLoginScreen }) => {
  const { setUsername, setPassword } = useAuth();
  const [localUsername, setLocalUsername] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const user = { username: localUsername, password: localPassword };
    const isValid = UserDataService.login(user);

    if (isValid) {
      setUsername(localUsername);
      setPassword(localPassword);
      router.push('/profile');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center gap-y-[1svh] justify-center bg-sand rounded-lg box-shadow'>
      <input
        type="text"
        id="username"
        placeholder="username"
        value={localUsername}
        onChange={(e) => setLocalUsername(e.target.value)}
      />
      <input
        type="password"
        id="password"
        placeholder="password"
        value={localPassword}
        onChange={(e) => setLocalPassword(e.target.value)}
      />
      <button className='mt-[3svh]' onClick={handleLogin}>
        log in
      </button>
      <span className='clickable' onClick={() => setLoginScreen(false)}>
        sign up
      </span>
    </div>
  );
};

export default LoginWindow;
