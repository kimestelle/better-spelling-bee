import loginScene from '../../assets/login-scene.svg';
import windmillArms from '../../assets/windmill-arms.svg';
import duck from '../../assets/duck.svg';

import './LoginScene.css'

const LoginScene = () => {

    return (
        <>
        <div className='duck-box'>
            <img src={duck} className='animated-duck'/>
        </div>
        <img src={windmillArms} className='windmill-arms'/>
        <img src={loginScene} className='login-scene'/>
        </>
    )
}

export default LoginScene