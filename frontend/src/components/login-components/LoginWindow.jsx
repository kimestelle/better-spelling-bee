import { Link } from 'react-router-dom';
import { useState } from 'react';

import eyeOff from '../../assets/eye.svg';
import eye from '../../assets/eye-off.svg';

import './LoginWindow.css'

const LoginWindow = () => {
    const [statusMessage, setStatusMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
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
  
   const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      login(data); 
      navigate('/spelling-bee-ducks/profile');
    } else {
        setStatusMessage('username or password not found')
      console.error('Error logging in');
    } 
  };
  
    const handleLogOut = () => {
      setLoggedIn(false);
    };
  
    return(
    <>
    {loggedIn ? (
        <div>
          <p>
            {statusMessage}
          </p>
          <button className='login button' onClick={handleLogOut}>
            log out
          </button>
          <div className='play'>
            <Link to={'play'}>play!</Link>
          </div>
        </div>
      ) : (
        <div className='login-bar'>
            
          <input 
            name='username' 
            placeholder='username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
           />
          <input 
            name='password' 
            placeholder='password'
            type={type}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            />
            <img src={icon} onClick={handleToggle} className='eye'/>
          <button className='login button clickable' onClick={handleSubmit}>
            log in
          </button>
          <button className='signup button'>
            create account
          </button>
        </div>
      )}
      </>
      )
}

export default LoginWindow;