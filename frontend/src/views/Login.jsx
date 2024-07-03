import LoginScene from '../components/login-components/LoginScene';
import LoginWindow from '../components/login-components/LoginWindow';

import '../styles/Login.css';

function Login() {
  return (
    <div className='screen flex-column' id='root'>
      <h1 className='title-element'> better-spelling-bee </h1>
      <LoginWindow/>
      <LoginScene/>
    </div>
  );
}

export default Login;


