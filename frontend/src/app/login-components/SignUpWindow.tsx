"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UserDataService, { User } from '../services/UserDataService';

interface SignUpWindowProps {
  setLoginScreen: (value: boolean) => void;
}

const SignUpWindow: React.FC<SignUpWindowProps> = ({ setLoginScreen }) => {
  const { setUsername, setPassword } = useAuth();
  const [localUsername, setLocalUsername] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailUpdates, setEmailUpdates] = useState(false);

  const handleSignUp = async () => {
    const user: User = {
      username: localUsername,
      password: localPassword,
      email: email,
      emailUpdates: emailUpdates,
    };

    const isValid = UserDataService.signUp(user);

    if (isValid) {
      setUsername(localUsername);
      setPassword(localPassword);
      setLoginScreen(true);
    } else {
      alert('Invalid input');
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center gap-y-[1svh] justify-center bg-sand rounded-lg box-shadow'>
      <input
        type="text"
        id="new-username"
        placeholder="username"
        value={localUsername}
        onChange={(e) => setLocalUsername(e.target.value)}
      />
      <input
        type="password"
        id="new-password"
        placeholder="password"
        value={localPassword}
        onChange={(e) => setLocalPassword(e.target.value)}
      />
      <input
        type="email"
        id="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex align-center gap-[0.5svh] clickable">
        <input
          type="checkbox"
          id="email_updates"
          checked={emailUpdates}
          onChange={(e) => setEmailUpdates(e.target.checked)}
        />
        <label htmlFor="email_updates" className='clickable'>get email updates!</label>
      </div>
      <button className='mt-[3svh]' onClick={handleSignUp}>
        create account
      </button>
      <span className='clickable' onClick={() => setLoginScreen(true)}>
        back
      </span>
    </div>
  );
};

export default SignUpWindow;