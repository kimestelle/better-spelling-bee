import loginScene from '../../assets/login-scene.svg';
import windmillArms from '../../assets/windmill-arms.svg';
import duck from '../../assets/duck.svg';
import tractor from '../../assets/tractor.svg';
import tractorwheel from '../../assets/tractor-wheel.svg';

import './LoginScene.css'

const LoginScene = () => {

    return (
        <>
        <div className='tractor-box'>
            <div className='tractor-inner-box'>
            <img src={tractor} className='tractor'/>
            <img src={tractorwheel} className='rotating tractor-wheel'/>
            </div>
        </div>
        <div className='duck-box'>
            <img src={duck} className='animated-duck'/>
        </div>
        <img src={windmillArms} className='rotating windmill-arms'/>
        <img src={loginScene} className='login-scene'/>
        </>
    )
}

export default LoginScene