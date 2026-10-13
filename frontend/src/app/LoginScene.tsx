import './LoginScene.css';
import { asset } from '../game/rules';

export default function LoginScene() {
    return (
    <div className='opening-scene' aria-hidden='true'>
        <div className='cloud-1'>
            <img alt="" src={asset('background-assets/cloud-1.svg')}/>
        </div>
        <div className='cloud-2'>
            <img alt="" src={asset('background-assets/cloud-2.svg')}/>
        </div>
        <div className='tractor-box'>
            <div className='tractor-inner-box'>
            <img alt="" src={asset('background-assets/tractor.svg')} className='tractor' />
            <img alt="" src={asset('background-assets/tractor-wheel.svg')} className='tractor-wheel rotating' />
            </div>
        </div>
        <div className='duck-box'>
            <img alt="" src={asset('game-assets/duck.svg')} className='animated-duck'/>
        </div>
        <img alt="" src={asset('background-assets/windmill-arms.svg')} className='windmill-arms rotating'/>
        <img alt="" src={asset('background-assets/login-scene.svg')} className='scene-landscape' />
    </div>
    )
}