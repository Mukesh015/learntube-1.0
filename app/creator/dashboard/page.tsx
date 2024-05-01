"use client"
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { gql, useQuery } from '@apollo/client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/configurations/firebase/config';

const CREATOR_DETAILS = gql`
query GetAllVideoUrl ($email: String){
    getYourVideo(email: $email) {
        videoId
        videoPublishedAt
        videoTitle
        viewsCount
        videoThumbnail
      }
      getchannelDetails(email: $email) {
        Discord
        Facebook
        Gender
        Github
        Instagram
        LinkedIn
        Name
        PinCode
        RecoveryEmail
        Twitter
        addressLine
        channelDescription
        channelId
        channelLogo
        channelName
        city
        country
        coverPhotoURL
        email
        phoneNumber
        state
        websiteURL
      }
      getCreatorCard(email: $email) {
        subscriber
        totalComments
        watchTime
      }
      getCreatorCourses (email: $email){
        courseDescription
        courseId
        courseName
        courseThumb
       
        videos {
          videoPublishedAt
          videoDescription
          videoId
          videoThumbnail
          videoTitle
          videoUrl
          videoViews
        }
      }
}
`

const CardGrid: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [home, setHome] = useState<any[]>([]);
    const [creatorCard, setCreatorCard] = useState<any[]>([]);

    const [channelDeatails, setChannelDetails] = useState<any[]>([]);

    const [user] = useAuthState(auth);

    const { loading, error, data } = useQuery(CREATOR_DETAILS, {
        variables: { email: email },
    });


    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
        }
        if (data && email) {
            setHome(data.getYourVideo)
            setCreatorCard(data.getCreatorCard)
            setChannelDetails(data.getchannelDetails)
        }

    }, [setEmail, user, data, setHome, setCreatorCard, setChannelDetails]);
    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

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
            <div className='ml-5 mr-5'>
                <Accordion variant="shadow">
                    <AccordionItem key="1" aria-label="Accordion 1" title="Personal informations">
                        <div className='bg-gray-700 ml-5 mr-5 rounded-xl'>
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
                    </AccordionItem>
                </Accordion>
            </div>
            <div className='ml-5 mr-5 mt-5'>
                <Accordion variant="shadow">
                    <AccordionItem key="1" aria-label="Accordion 1" title="Channel information">
                        <div className='bg-gray-700 ml-5 mr-5 rounded-xl'>
                            <div className='flex ml-10 mb-5 gap-28'>
                                <div className='mt-5 flex'>
                                    <p className='font-semibold'>Channel name:</p>
                                    <span className='text-gray-400 ml-1'>Gaming aura</span>
                                    <li className='ml-1 p-1 list-none hover:bg-slate-200 justify-center item-center  rounded-full'>
                                        <svg className='hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" /></svg>
                                    </li>

                                </div>
                                <div className='mt-5 flex'>
                                    <p className='font-semibold'>Recovery email address:</p>
                                    <span className='text-gray-400 ml-1'>mukesh@gmail.com</span>
                                    <li className='ml-1 p-1 list-none hover:bg-slate-200 justify-center item-center  rounded-full'>
                                        <svg className='hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" /></svg>
                                    </li>
                                </div>
                                <div className='mt-5 flex'>
                                    <p className='font-semibold'>Status:</p>
                                    <span className='text-gray-400  ml-1'>Active</span>
                                </div>
                                <div className='mt-5 flex'>
                                    <p className='font-semibold'>Created:</p>
                                    <span className='text-gray-400  ml-1'>10/10/2024</span>
                                </div>
                            </div>


                            <div className='ml-10 pb-10'>
                                <div>
                                    <div className='flex'>
                                        <p className='font-semibold'>Channel description:</p>
                                        <li className='ml-1 p-1 list-none hover:bg-slate-200 justify-center item-center  rounded-full'>
                                            <svg className='hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" /></svg>
                                        </li>
                                    </div>

                                    <span className='text-gray-300 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam exercitationem culpa delectus illo rem repellat quasi modi veritatis non minima! Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum illo dolores ipsam officia odio! Impedit iste quas porro rem numquam.</span>
                                </div>
                                <div className='mt-5 '>
                                    <div className='flex'>
                                        <p className='font-semibold'>Provided links:</p>
                                        <li className='ml-1 p-1 list-none hover:bg-slate-200 justify-center item-center  rounded-full'>
                                            <svg className='hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" /></svg>
                                        </li>
                                    </div>
                                    <span className='text-gray-300'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda delectus obcaecati, possimus doloremque illum esse magnam expedita praesentium dicta asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate enim doloremque nobis quos. Natus, aperiam? Debitis ratione nostrum rerum? Asperiores.</span>
                                </div>
                            </div>
                        </div>
                    </AccordionItem>
                </Accordion>
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
            <div className='mt-48 justify-center item-center text-center' style={{ maxWidth: "600px", marginLeft: "480px" }}>
                <p>@gamergift.com - 81 laks subscribers - 200 videos</p>
                <p className='text-sm text-gray-500 mt-3'>Hi there! My name is Piyush Garg and I'm a software engineer with over 5 years of experience in the industry. I love all things tech and coding, and on my channel, read more</p>
            </div>
            <div className='mt-5 justify-center item-center text-center' style={{ maxWidth: "600px", marginLeft: "480px" }}>
                links
            </div>
            <div className='mt-10'>
                <div className="flex w-full flex-col">
                    <Tabs
                        className='ml-80 mr-96'
                        aria-label="Options"
                        color="primary"
                        variant="underlined"
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                            cursor: "w-full bg-[#22d3ee]",
                            tab: "max-w-fit px-0 h-12",
                            tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                        }}
                    >
                        <Tab
                            key="Home"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>Home</span>
                                </div>
                            }
                        />
                        <Tab
                            key="Courses"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>Courses</span>
                                </div>
                            }
                        />
                        <Tab
                            key="videos"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>Videos</span>
                                </div>
                            }
                        />
                        <Tab
                            key="Playlists"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>Playlists</span>
                                </div>
                            }
                        />
                        <Tab
                            key="Community"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>Community</span>
                                </div>
                            }
                        />
                        <Tab
                            key="Search"
                            title={
                                <div className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                                    <span>Search</span>
                                </div>
                            }
                        />
                    </Tabs>
                </div>
            </div>
            <div
                id="description-container"
                className="gap-12 grid grid-cols-3 hover m-20"
            >
                <div id="video-content">
                    {/* video content here*/}
                    <img
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                        height={350}
                        width={350}
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                        alt=""
                    />
                    <div className="mt-3 justify-center">
                        <h1 className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, soluta!</h1> {/* video title here*/}
                        <p className="text-gray-500">
                            20k views - 4 hours ago {/*Content details/analitics*/}
                        </p>
                    </div>
                </div>
                <div id="video-content">
                    {/* video content here*/}
                    <img
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                        height={350}
                        width={350}
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                        alt=""
                    />
                    <div className="mt-3 justify-center">
                        <h1 className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, soluta!</h1> {/* video title here*/}
                        <p className="text-gray-500">
                            20k views - 4 hours ago {/*Content details/analitics*/}
                        </p>
                    </div>
                </div>
                <div id="video-content">
                    {/* video content here*/}
                    <img
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                        height={350}
                        width={350}
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                        alt=""
                    />
                    <div className="mt-3 justify-center">
                        <h1 className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, soluta!</h1> {/* video title here*/}
                        <p className="text-gray-500">
                            20k views - 4 hours ago {/*Content details/analitics*/}
                        </p>
                    </div>
                </div>
                <div id="video-content">
                    {/* video content here*/}
                    <img
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                        height={350}
                        width={350}
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                        alt=""
                    />
                    <div className="mt-3 justify-center">
                        <h1 className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, soluta!</h1> {/* video title here*/}
                        <p className="text-gray-500">
                            20k views - 4 hours ago {/*Content details/analitics*/}
                        </p>
                    </div>
                </div>
                <div id="video-content">
                    {/* video content here*/}
                    <img
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                        height={350}
                        width={350}
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                        alt=""
                    />
                    <div className="mt-3 justify-center">
                        <h1 className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, soluta!</h1> {/* video title here*/}
                        <p className="text-gray-500">
                            20k views - 4 hours ago {/*Content details/analitics*/}
                        </p>
                    </div>
                </div>
                <div id="video-content">
                    {/* video content here*/}
                    <img
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                        height={350}
                        width={350}
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                        alt=""
                    />
                    <div className="mt-3 justify-center">
                        <h1 className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, soluta!</h1> {/* video title here*/}
                        <p className="text-gray-500">
                            20k views - 4 hours ago {/*Content details/analitics*/}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardGrid;
