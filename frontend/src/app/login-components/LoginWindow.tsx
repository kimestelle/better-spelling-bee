'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

interface LoginWindowProps {
  setLoginScreen: (value: boolean) => void;
}

const LoginWindow: React.FC<LoginWindowProps> = ({ setLoginScreen }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(username, password);
      console.log('logged in');
      router.push('/profile');
    } catch (err) {
      setError('Login failed: Incorrect username or password.');
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center gap-y-[1svh] justify-center bg-sand rounded-lg box-shadow'>
      {error}
      <input
        type="text"
        id="username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        id="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
