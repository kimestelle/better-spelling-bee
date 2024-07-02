import { useState } from 'react';
import { Link } from "react-router-dom";

import LoginScene from '../components/login-components/LoginScene';

import eyeOff from '../assets/eye.svg';
import eye from '../assets/eye-off.svg';

import '../styles/Login.css';

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
 }

  const handleLogIn = () => {
    setLoggedIn(true);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
  };

  return (
    <div className='screen flex-column' id='root'>
        <h1 className='title-element'> better-spelling-bee </h1>

      {loggedIn ? (
        <div>
          <button className='login button' onClick={handleLogOut}>
            log out
          </button>
          <div className='play'>
            <Link to={'play'}>play!</Link>
          </div>
        </div>
      ) : (
        <div className='login-bar'>
          <input name='username' placeholder='username'>
          </input>
          <input 
            name='password' 
            placeholder='password'
            type={type}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"/>
            <img src={icon} onClick={handleToggle} className='eye'/>
          <button className='login button' onClick={handleLogIn}>
            log in
          </button>
          <button className='signup button'>
            create account
          </button>
        </div>
      )}
      <LoginScene/>
    </div>
  );
}

export default Login;