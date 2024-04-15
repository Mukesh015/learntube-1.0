import React from 'react';

const CardGrid: React.FC = () => {
    return (
        <>
            <div id='cards' className="w-full px-6 py-6 mx-auto">
                <div className="flex flex-wrap -mx-3">
                    {/* Card 1 */}
                    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                        <div className="relative flex flex-col min-w-0 break-words bg-gray-700 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                            <div className="flex-auto p-4">
                                <div className="flex flex-row -mx-3">
                                    <div className="flex-none w-2/3 max-w-full px-3">
                                        <div>
                                            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Subscribers</p>
                                            <h5 className="mb-2 font-bold dark:text-white">$53,000</h5>
                                            <p className="mb-0 dark:text-white dark:opacity-60">
                                                <span className="text-sm font-bold leading-normal text-emerald-500">+55%</span>
                                                since yesterday
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-3 text-right basis-1/3">
                                        <div className="inline-block w-16 h-16 rounded-full text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                                            <i className="ni leading-none ni-money-coins text-lg top-3.5">
                                                <svg className='ml-2 mt-2' xmlns="http://www.w3.org/2000/svg" fill='#FFFFFF' height="48" viewBox="0 -960 960 960" width="48"><path d="M157.694-100.001q-23.616 0-40.654-17.039-17.039-17.038-17.039-40.654v-404.612q0-23.616 17.039-40.654 17.038-17.039 40.654-17.039h644.612q23.616 0 40.654 17.039 17.039 17.038 17.039 40.654v404.612q0 23.616-17.039 40.654-17.038 17.039-40.654 17.039H157.694Zm257.384-126.385L613.384-360 415.078-492.614v266.228Zm-253-463.613v-45.384h635.844v45.384H162.078Zm127.923-115.385v-45.383h379.998v45.383H290.001Z" /></svg>

                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                        <div className="relative flex flex-col min-w-0 break-words bg-gray-700 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                            <div className="flex-auto p-4">
                                <div className="flex flex-row -mx-3">
                                    <div className="flex-none w-2/3 max-w-full px-3">
                                        <div>
                                            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Total watch time</p>
                                            <h5 className="mb-2 font-bold dark:text-white">2,300</h5>
                                            <p className="mb-0 dark:text-white dark:opacity-60">
                                                <span className="text-sm font-bold leading-normal text-emerald-500">+3%</span>
                                                since last week
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-3 text-right basis-1/3">
                                        <div className="inline-block w-16 h-16 rounded-full text-center rounded-circle bg-gradient-to-tl from-red-600 to-orange-600">
                                            <i className="ni leading-none ni-world text-lg top-3.5 text-white">
                                                <svg className='ml-2 mt-2' xmlns="http://www.w3.org/2000/svg" fill='#FFFFFF' height="48" viewBox="0 -960 960 960" width="48"><path d="M480.208-344.232q64.638 0 110.099-45.669 45.461-45.67 45.461-110.307 0-64.638-45.669-110.099-45.67-45.461-110.307-45.461-64.638 0-110.099 45.669-45.461 45.67-45.461 110.307 0 64.638 45.669 110.099 45.67 45.461 110.307 45.461Zm-.511-44.922q-46.312 0-78.428-32.418-32.115-32.419-32.115-78.731t32.418-78.428q32.419-32.115 78.731-32.115t78.428 32.418q32.115 32.419 32.115 78.731t-32.418 78.428q-32.419 32.115-78.731 32.115Zm.358 169.153q-137.593 0-249.823-77.038Q118.001-374.078 61.54-500q56.461-125.922 168.637-202.961 112.175-77.038 249.768-77.038 137.593 0 249.823 77.038Q841.999-625.922 898.46-500q-56.461 125.922-168.637 202.961-112.175 77.038-249.768 77.038Z" /></svg>

                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                        <div className="relative flex flex-col min-w-0 break-words bg-gray-700 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                            <div className="flex-auto p-4">
                                <div className="flex flex-row -mx-3">
                                    <div className="flex-none w-2/3 max-w-full px-3">
                                        <div>
                                            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">total comments</p>
                                            <h5 className="mb-2 font-bold dark:text-white">+3,462</h5>
                                            <p className="mb-0 dark:text-white dark:opacity-60">
                                                <span className="text-sm font-bold leading-normal text-red-600">-2%</span>
                                                since last quarter
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-3 text-right basis-1/3">
                                        <div className="inline-block w-16 h-16 rounded-full text-center rounded-circle bg-gradient-to-tl from-emerald-500 to-teal-400">
                                            <i className="ni leading-none ni-paper-diploma text-lg top-3.5 text-white">
                                                <svg className='ml-2 mt-2' xmlns="http://www.w3.org/2000/svg" fill='#FFFFFF' height="48" viewBox="0 -960 960 960" width="48"><path d="M250.001-410.001h459.998v-45.383H250.001v45.383Zm0-127.307h459.998v-45.384H250.001v45.384Zm0-127.308h459.998v-45.383H250.001v45.383Zm-92.307 404.615q-23.616 0-40.654-17.039-17.039-17.038-17.039-40.654v-484.612q0-23.616 17.039-40.654 17.038-17.039 40.654-17.039h644.612q23.616 0 40.654 17.039 17.039 17.038 17.039 40.654v683.842L718.461-260.001H157.694Z" /></svg>

                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
                        <div className="relative flex flex-col min-w-0 break-words bg-gray-700 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                            <div className="flex-auto p-4">
                                <div className="flex flex-row -mx-3">
                                    <div className="flex-none w-2/3 max-w-full px-3">
                                        <div>
                                            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">total likes</p>
                                            <h5 className="mb-2 font-bold dark:text-white">$103,430</h5>
                                            <p className="mb-0 dark:text-white dark:opacity-60">
                                                <span className="text-sm font-bold leading-normal text-emerald-500">+5%</span>
                                                than last month
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-3 text-right basis-1/3">
                                        <div className="inline-block w-16 h-16 rounded-full text-center rounded-circle bg-gradient-to-tl from-orange-500 to-yellow-500">
                                            <i className="ni leading-none ni-cart text-lg top-3.5 text-white">
                                                <svg className='ml-2 mt-2' xmlns="http://www.w3.org/2000/svg" height="48" fill='#FFFFFF' viewBox="0 -960 960 960" width="48"><path d="M709.845-140.001H264.77v-474.305l264.153-269.538 21.461 16.384q9.076 7.231 12.384 15.885t3.308 18.961v7.308l-43.077 211h319.307q22.231 0 39.962 17.73 17.731 17.731 17.731 39.962v66.229q0 9.462-2.116 21.462-2.115 11.999-5.961 20.692L780.153-187.924q-8.616 19.846-28.539 33.884-19.923 14.039-41.769 14.039ZM219.386-614.306v474.305H100.001v-474.305h119.385Z" /></svg>
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-700 ml-5 mr-5 rounded-xl'>
                <h1 className='text-center justify-center text-teal-500 text-xl font-semibold p-3'>Personal Informations</h1>
                <div className='flex ml-10 mb-5'>
                    <div className='w-96 mt-5'>
                        <p className='font-semibold'>Your name :</p>
                        <span className='text-gray-400'>Mukesh Gupta</span>
                    </div>
                    <div className='w-96 mt-5'>
                        <p className='font-semibold'>Email address :</p>
                        <span className='text-gray-400'>mukesh@gmail.com</span>
                    </div>
                    <div className='w-96 mt-5'>
                        <p className='font-semibold'>Phone number :</p>
                        <span className='text-gray-400'>7851523698</span>
                    </div>
                    <div className='w-96 mt-5'>
                        <p className='font-semibold'>Gender :</p>
                        <span className='text-gray-400'>Male</span>
                    </div>
                </div>
                <div className='flex ml-10 mb-5'>
                    <div className='w-96'>
                        <p className='font-semibold'>Address :</p>
                        <span className='text-gray-400'>Kamrarmath, bankura</span>
                    </div>
                    <div className='w-96'>
                        <p className='font-semibold'>City :</p>
                        <span className='text-gray-400'>Bankura</span>
                    </div>
                    <div className='w-96'>
                        <p className='font-semibold'>State :</p>
                        <span className='text-gray-400'>West Bengal</span>
                    </div>
                    <div className='w-96'>
                        <p className='font-semibold'>Country :</p>
                        <span className='text-gray-400'>India</span>
                    </div>
                </div>
                <div className='flex ml-10 pb-5'>
                    <div className='w-96'>
                        <p className='font-semibold'>Pin code :</p>
                        <span className='text-gray-400'>722101</span>
                    </div>
                    <div className='w-96'>
                        <p className='font-semibold'>Occupation</p>
                        <span className='text-gray-400'>S/W Engeneer</span>
                    </div>
                    <div className='w-96'>
                        <p className='font-semibold'>Recovery email :</p>
                        <span className='text-gray-400'>mukesh@gmail.com</span>
                    </div>
                    <div className='w-96'>
                        <p className='font-semibold'>Channel name :</p>
                        <span className='text-gray-400'>learntube</span>
                    </div>
                </div>
            </div>
            <div className='mt-5 flex'>
                <div className='w-36 ml-10 mt-28'>
                    <h1 className='text-xl font-semibold'>Your channel :</h1>
                </div>
                <div className='ml-36'>
                    <img style={{ width: "1000px" }} className='h-60 rounded-md absolute' src="https://cdn.create.vista.com/downloads/b2940106-cf8e-44dd-9ced-f2804030bd66_1024.jpeg" alt="" />
                    <img className='opacity-95 rounded-full h-40 absolute ml-96 mt-36' src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1713207600&semt=sph" alt="" />
                </div>
            </div>
        </>
    );
}

export default CardGrid;
