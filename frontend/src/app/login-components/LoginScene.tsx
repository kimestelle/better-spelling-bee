import './LoginScene.css'

export default function LoginScene() {
    return (
    <div className='flex items-end absolute bottom-0 z-10 h-[30svh] w-[180svh]'>
        <div className='tractor-box'>
            <div className='tractor-inner-box'>
            <img src='/game-assets/tractor.svg' alt="Login Scene" className='tractor' />
            <img src='/game-assets/tractor-wheel.svg' alt='tractor wheel' className='tractor-wheel rotating' />
            </div>
        </div>
        <div className='duck-box'>
            <img src='/game-assets/duck.svg' className='animated-duck'/>
        </div>
        <img src='/game-assets/windmill-arms.svg' alt='Windmill Arms' className='windmill-arms rotating'/>
        <img src='/game-assets/login-scene.svg' alt="Login Scene" className='w-full' />
    </div>
    )
}