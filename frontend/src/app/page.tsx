'use client'
import { useState } from 'react';
import LoginWindow from './login-components/LoginWindow';
import SignUpWindow from './login-components/SignUpWindow';
import LoginScene from './login-components/LoginScene';
import './login-components/LoginScene.css';

const Login = () => {
  const [loginScreen, setLoginScreen] = useState(true);

  return (
    <main className="flex flex-col h-full w-full items-center justify-start">
      <div className='h-[20svh] w-full p-3 flex justify-center items-end'>
        <img src='/logo.svg' alt="Logo" className='h-[7svh]' />
      </div>
      <div className='relative h-[55svh] w-full p-[5svh] flex justify-center items-end'>
        {loginScreen ? <LoginWindow setLoginScreen={setLoginScreen} /> : <SignUpWindow setLoginScreen={setLoginScreen} />}
      </div>
      <LoginScene/>
    </main>
  );
};

export default Login;
