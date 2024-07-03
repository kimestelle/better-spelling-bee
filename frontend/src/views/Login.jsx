import LoginScene from '../components/login-components/LoginScene';
import LoginWindow from '../components/login-components/LoginWindow';

import logo from'../assets/logo.svg';

import '../styles/Login.css';

function Login() {
  return (
    <div className='screen flex-column' id='root'>
      <img src={logo} className='logo'/>
      <LoginWindow/>
      <LoginScene/>
    </div>
  );
}

export default Login;


