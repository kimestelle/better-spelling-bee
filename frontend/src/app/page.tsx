'use client'
import { useState } from 'react';
import LoginWindow from './login-components/LoginWindow';
import SignUpWindow from './login-components/SignUpWindow';
import './login-components/LoginScene.css';

const Login = () => {
  const [loginScreen, setLoginScreen] = useState(true);

  return (
    <main className="flex flex-col h-full w-full items-center justify-start">
      <div className='h-[20svh] w-full p-3 flex justify-center items-end'>
        <img src='/logo.svg' alt="Logo" />
      </div>
      <div className='relative h-[55svh] w-full p-[5svh] flex justify-center items-end'>
        {loginScreen ? <LoginWindow setLoginScreen={setLoginScreen} /> : <SignUpWindow setLoginScreen={setLoginScreen} />}
      </div>
      <div className='flex items-end absolute bottom-0 z-10 h-[30svh] w-[180svh]'>
        <div className='absolute h-[5svh] w-[4svh] l-[10svh]'>
          <img src='/game-assets/tractor.svg' alt="Login Scene" className='' />
        </div>
        <img src='/game-assets/login-scene.svg' alt="Login Scene" className='w-full' />
      </div>
    </main>
  );
};

export default Login;
