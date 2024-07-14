
function Dashboard() {
    return (
        <div className='w-[100svw] h-[75svh] flex justify-center bg-blue-600 bg-opacity-20'>
            <div className='w-[50svh] h-full flex flex-col items-center border-red-500 p-[4svh]'>
                <h1>kestelle</h1>
                <span className='bg-white rounded-[1svh] p-[0.5svh] px-[1svh]'>tiny quacker</span>

                <div className='w-full h-[15svh] flex flex-row my-[10svh] justify-between'>
                    <div className='w-[20svh] h-full flex flex-col items-center bg-gradient-to-t from-white to-transparent rounded-[2svh]'>
                        <span className="text-[10svh] leading-[10svh] bg-gradient-to-t from-black to-gray-600 bg-clip-text text-transparent">
                        111
                        </span>
                        <span>
                            points
                        </span>
                    </div>
                    <div className='w-[20svh] h-full flex flex-col items-center bg-gradient-to-t from-white to-transparent rounded-[2svh]'>
                        <span className="text-[10svh] leading-[10svh] bg-gradient-to-t from-black to-gray-600 bg-clip-text text-transparent">
                            111
                        </span>
                        <span>
                            day streak
                        </span>
                    </div>
                </div>

                <div className='w-full h-[20svh] flex flex-col gap-[1.5svh] justify-center items-center'>
                    <div className='w-full h-[5svh] clickable'>
                        checkbox
                        <span className='text-[2.5svh]'>
                        PLAY the DAILY
                        </span>
                    </div>
                    <div className='w-full h-[5svh] clickable'>
                        checkbox
                        <span className='text-[2.5svh]'>
                            PLAY INFINITE
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;