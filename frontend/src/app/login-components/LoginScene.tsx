import './LoginScene.css'

export default function LoginScene() {
    return (
    <div className='flex items-end absolute bottom-0 z-10 h-[30svh] w-[180svh] select-none'>
        <div className='cloud-1'>
            <img src='background-assets/cloud-1.svg'/>
        </div>
        <div className='cloud-2'>
            <img src='background-assets/cloud-2.svg'/>
        </div>
        <div className='tractor-box'>
            <div className='tractor-inner-box'>
            <img src='/background-assets/tractor.svg' alt="Login Scene" className='tractor' />
            <img src='/background-assets/tractor-wheel.svg' alt='tractor wheel' className='tractor-wheel rotating' />
            </div>
        </div>
        <div className='duck-box'>
            <img src='/game-assets/duck.svg' className='animated-duck'/>
        </div>
        <img src='/background-assets/windmill-arms.svg' alt='Windmill Arms' className='windmill-arms rotating'/>
        <img src='/background-assets/login-scene.svg' alt="Login Scene" className='w-full' />
    </div>
    )
}