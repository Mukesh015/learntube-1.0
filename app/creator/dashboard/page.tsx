"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { Tabs, Tab } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { gql, useQuery } from '@apollo/client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/configurations/firebase/config';
import { useDarkMode } from "@/components/hooks/theme"
import NextTopLoader from 'nextjs-toploader';
import "react-toastify/dist/ReactToastify.css";
import { Select, SelectItem } from "@nextui-org/react";
import { Modal, Button, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from "@nextui-org/react";


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
        channelCreatedDate
      }
      getCreatorCard(email: $email) {
        subscriber
        totalComments
        watchTime
        totalLike
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
    const { isDarkMode } = useDarkMode();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const [email, setEmail] = useState<string>("");
    const [home, setHome] = useState<any[]>([]);
    const [creatorCard, setCreatorCard] = useState<any[]>([]);
    const [channelDeatails, setChannelDetails] = useState<any[]>([]);
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
    const [updateddata, setUpdateddata] = useState<string>("");
    const [spinnerButton, setspinnerButton] = useState<boolean>(false);
    const [headerText, setHeaderText] = useState<string>("");
    const [changeLinkModel, setChangeLinkModel] = useState<boolean>(false);
    const [toUpdate, setToUpdate] = useState<string>("");

    const [homeTab, setHomeTab] = useState<boolean>(true);
    const [shortTab, setShortTab] = useState<boolean>(false);
    const [courseTab, setCourseTab] = useState<boolean>(false);
    const [courseStates, setCourseStates] = useState<{ [key: string]: boolean }>({});
    const [communityTab, setCommunityTab] = useState<boolean>(false);
    const [searchTab, setSearchTab] = useState<boolean>(false);

    const [user] = useAuthState(auth);

    const { loading, error, data } = useQuery(CREATOR_DETAILS, {
        variables: { email: email },
    });

    const handlePlatformChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPlatform = event.target.value;
        setToUpdate(selectedPlatform);
    }, [setToUpdate]);


    const handleModelOpen = useCallback(async (modelName: string) => {
        if (modelName === "channelName") {
            setHeaderText("Change your channel name");
            setToUpdate("channelName")
            onOpen();
        }
        else if (modelName === "RecoveryEmail") {
            setHeaderText("Change your recovery email");
            setToUpdate("RecoveryEmail")
            onOpen();
        }
        else if (modelName === "channelDescription") {
            setHeaderText("Change your channel description");
            setToUpdate("channelDescription")
            onOpen();
        }
        else if (modelName === "channelLogo") {
            setHeaderText("Change your channel logo");
            setToUpdate("channelLogo")
            onOpen();
        }
        else if (modelName === "channelCoverPhoto") {
            setHeaderText("Change your cover photo");
            setToUpdate("channelCoverPhoto")
            onOpen();
        }
        else if (modelName === "socialMedia") {
            setHeaderText("Change your social media link");
            setChangeLinkModel(true);
            onOpen();
        }
    }, [setHeaderText, setToUpdate, setChangeLinkModel, onOpen]);

    const formatTime = (timestampString: string) => {
        const timestamp = parseInt(timestampString, 10);
        if (isNaN(timestamp)) {
            return "Invalid timestamp";
        }
        const currentDate = new Date();
        const publishedDate = new Date(timestamp);
        const diffInMs = currentDate.getTime() - publishedDate.getTime();
        const diffInSec = Math.floor(diffInMs / 1000);

        if (diffInSec < 0) {
            return "Future timestamp";
        }
        if (diffInSec < 60) {
            return `${diffInSec} seconds ago`;
        } else if (diffInSec < 3600) {
            return `${Math.floor(diffInSec / 60)} minutes ago`;
        } else if (diffInSec < 86400) {
            return `${Math.floor(diffInSec / 3600)} hours ago`;
        } else {
            return `${Math.floor(diffInSec / 86400)} days ago`;
        }
    };

    const handleShowDropdown = (courseId: string) => {
        setSelectedCourseId(courseId);
        setCourseStates((prevState) => ({
            ...prevState,
            [courseId]: !prevState[courseId],
        }));
    };
    const handlechangeTab = useCallback(async (tab: string) => {
        if (tab === "home") {
            setHomeTab(true);
            setShortTab(false);
            setCourseTab(false);
            setCommunityTab(false);
            setSearchTab(false);
        }
        if (tab === "shorts") {
            setHomeTab(false);
            setShortTab(true);
            setCourseTab(false);
            setCommunityTab(false);
            setSearchTab(false);
        }
        if (tab === "course") {
            setHomeTab(false);
            setShortTab(false);
            setCourseTab(true);
            setCommunityTab(false);
            setSearchTab(false);
        }
        if (tab === "community") {
            setHomeTab(false);
            setShortTab(false);
            setCourseTab(false);
            setCommunityTab(true);
            setSearchTab(false);
        }
        if (tab === "search") {
            setHomeTab(false);
            setShortTab(false);
            setCourseTab(false);
            setCommunityTab(false);
            setSearchTab(true);
        }
    }, [setHomeTab, setShortTab, setCourseTab, setCommunityTab, setSearchTab])

    const handleInfoChange = useCallback(async () => {
        console.log("toUpdate: ", toUpdate)
        console.log("updatedData: ", updateddata)
        setspinnerButton(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/features/${toUpdate}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    [toUpdate]: updateddata
                })
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } catch (error) {
            console.log("Failed to change informations, server error", error);
        }
    }, [toUpdate, updateddata,setspinnerButton, email])

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
        }
        if (data && email) {
            setHome(data.getYourVideo)
            setCreatorCard(data.getCreatorCard)
            setChannelDetails(data.getchannelDetails)
            setAllCourses(data.getCreatorCourses)
            console.log(home, creatorCard, channelDeatails, allCourses)
        }

    }, [setEmail, allCourses, user, data, home, creatorCard, channelDeatails, setHome, setCreatorCard, setChannelDetails]);

    return (
        <>
            <NextTopLoader />
            <div className={`${isDarkMode ? "bg-white" : "bg-black"} pb-10`}>
                <div id='cards' className="w-full px-6 py-6 mx-auto">
                    {creatorCard.map((item, index) => (
                        <div className="flex flex-wrap -mx-3">
                            {/* Card 1 */}
                            <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                                <div className={`relative flex flex-col min-w-0 ${isDarkMode ? "bg-white shadow-lg shadow-gray-600" : "bg-gray-700"} break-words shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border`}>
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-row -mx-3">
                                            <div className="flex-none w-2/3 max-w-full px-3">
                                                <div>
                                                    <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase text-yellow-600">Subscribers</p>
                                                    <h5 className={`mb-2 ${isDarkMode ? "text-slate-700" : "text-white"} font-bold`}>{item.subscriber}</h5>
                                                    <p className="mb-0 dark:text-white dark:opacity-60">
                                                        <span className="text-sm font-bold leading-normal text-emerald-500">+55%</span>
                                                        <span className={`${isDarkMode ? "text-blue-900" : ""}`}>since yesterday</span>

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
                                <div className={`relative flex flex-col min-w-0 ${isDarkMode ? "bg-white shadow-lg shadow-gray-600" : "bg-gray-700"} break-words shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border`}>
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-row -mx-3">
                                            <div className="flex-none w-2/3 max-w-full px-3">
                                                <div>
                                                    <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase text-yellow-600">Total watch time</p>
                                                    <h5 className="mb-2 font-bold text-slate-600">{item.watchTime}</h5>
                                                    <p className="mb-0 dark:text-white dark:opacity-60">
                                                        <span className="text-sm font-bold leading-normal text-emerald-500">+3%</span>
                                                        <span className='text-blue-900'>
                                                            since last week
                                                        </span>
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
                                <div className={`relative flex flex-col min-w-0 ${isDarkMode ? "bg-white shadow-lg shadow-gray-600" : "bg-gray-700"} break-words shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border`}>
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-row -mx-3">
                                            <div className="flex-none w-2/3 max-w-full px-3">
                                                <div>
                                                    <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase text-yellow-600">total comments</p>
                                                    <h5 className="mb-2 font-bold text-slate-700">{item.totalComments}</h5>
                                                    <p className="mb-0 dark:text-white dark:opacity-60">
                                                        <span className="text-sm font-bold leading-normal text-red-600">-2%</span>
                                                        <span className='text-red-900'>since last quarter</span>
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
                                <div className={`relative flex flex-col min-w-0 ${isDarkMode ? "bg-white shadow-lg shadow-gray-600" : "bg-gray-700"} break-words shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border`}>
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-row -mx-3">
                                            <div className="flex-none w-2/3 max-w-full px-3">
                                                <div>
                                                    <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase text-yellow-600 ">total likes</p>
                                                    <h5 className="mb-2 font-bold text-slate-700">{item.totalLike}</h5>
                                                    <p className="mb-0 dark:text-white dark:opacity-60">
                                                        <span className="text-sm font-bold leading-normal text-emerald-500">+5%</span>
                                                        <span className='text-blue-900'>than last month</span>
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
                    ))}
                </div>
                {channelDeatails.map((item, index) => (
                    <div>
                        <div className='ml-5 mr-5'>
                            <Accordion variant="shadow">
                                <AccordionItem key="1" aria-label="Accordion 1" title="Personal informations">
                                    <div className='bg-gray-700 ml-5 mr-5 rounded-xl'>
                                        <div className='flex ml-10 mb-5'>
                                            <div className='w-96 mt-5'>
                                                <p className='font-semibold'>Your name :</p>
                                                <span className='text-gray-400'>{item.Name}</span>
                                            </div>
                                            <div className='w-96 mt-5'>
                                                <p className='font-semibold'>Email address :</p>
                                                <span className='text-gray-400'>{item.email}</span>
                                            </div>
                                            <div className='w-96 mt-5'>
                                                <p className='font-semibold'>Phone number :</p>
                                                <span className='text-gray-400'>{item.phoneNumber}</span>
                                            </div>
                                            <div className='w-96 mt-5'>
                                                <p className='font-semibold'>Gender :</p>
                                                <span className='text-gray-400'>{item.Gender}</span>
                                            </div>
                                        </div>
                                        <div className='flex ml-10 mb-5'>
                                            <div className='w-96'>
                                                <p className='font-semibold'>Address :</p>
                                                <span className='text-gray-400'>{item.addressLine}</span>
                                            </div>
                                            <div className='w-96'>
                                                <p className='font-semibold'>City :</p>
                                                <span className='text-gray-400'>{item.city}</span>
                                            </div>
                                            <div className='w-96'>
                                                <p className='font-semibold'>State :</p>
                                                <span className='text-gray-400'>{item.state}</span>
                                            </div>
                                            <div className='w-96'>
                                                <p className='font-semibold'>Country :</p>
                                                <span className='text-gray-400'>{item.country}</span>
                                            </div>
                                        </div>
                                        <div className='flex ml-10 pb-5'>
                                            <div className='w-96'>
                                                <p className='font-semibold'>Pin code :</p>
                                                <span className='text-gray-400'>{item.PinCode}</span>
                                            </div>
                                            <div className='w-96'>
                                                <p className='font-semibold'>Occupation</p>
                                                <span className='text-gray-400'>{item.Occupation}</span>
                                            </div>
                                            <div className='w-96'>
                                                <p className='font-semibold'>Recovery email :</p>
                                                <span className='text-gray-400'>{item.RecoveryEmail}</span>
                                            </div>
                                            <div className='w-96'>
                                                <p className='font-semibold'>Channel name :</p>
                                                <span className='text-gray-400'>{item.channelName}</span>
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
                                                <span className='text-gray-400 ml-1'>{item.channelName}</span>
                                                <li onClick={() => { handleModelOpen("channelName") }} className='ml-1 p-1 list-none hover:bg-slate-200 justify-center item-center  rounded-full'>
                                                    <svg className='hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" /></svg>
                                                </li>

                                            </div>
                                            <div className='mt-5 flex'>
                                                <p className='font-semibold'>Recovery email address:</p>
                                                <span className='text-gray-400 ml-1'>{item.RecoveryEmail}</span>
                                                <li onClick={() => { handleModelOpen("RecoveryEmail") }} className='ml-1 p-1 list-none hover:bg-slate-200 justify-center item-center  rounded-full'>
                                                    <svg className='hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" /></svg>
                                                </li>
                                            </div>
                                            <div className='mt-5 flex'>
                                                <p className='font-semibold'>Status:</p>
                                                <span className='text-gray-400  ml-1'>Active(HC)</span>
                                            </div>
                                            <div className='mt-5 flex'>
                                                <p className='font-semibold'>Created:</p>
                                                <span className='text-gray-400  ml-1'>10/10/2024(HC)</span>
                                            </div>
                                        </div>
                                        <div className='ml-10 pb-10'>
                                            <div>
                                                <div className='flex'>
                                                    <p className='font-semibold'>Channel description:</p>
                                                    <li onClick={() => { handleModelOpen("channelDescription") }} className='ml-1 p-1 list-none hover:bg-slate-200 justify-center item-center  rounded-full'>
                                                        <svg className='hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" /></svg>
                                                    </li>
                                                </div>
                                                <span className='text-gray-300 '>{item.channelDescription}</span>
                                            </div>
                                            <div className='mt-5 '>
                                                <div className='flex'>
                                                    <p className='font-semibold'>Provided links:</p>
                                                    <li onClick={() => handleModelOpen("socialMedia")} className='ml-1 p-1 list-none hover:bg-slate-200 justify-center item-center  rounded-full'>
                                                        <svg className='hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" /></svg>
                                                    </li>
                                                </div>
                                                <div>
                                                    <span className='text-gray-300 flex mb-3 mt-2'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32"><path fill="#8c9eff" d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z" /></svg>

                                                        <span className='ml-5 text-blue-500 hover:underline cursor-pointer'>{item.Discord}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='ml-2 mt-1.5' height="14px" viewBox="0 0 24 24" width="14px" fill="#09ebd0"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg>
                                                    </span>
                                                    <span className='text-gray-300 flex mb-3 mt-2'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32"><linearGradient id="rL2wppHyxHVbobwndsT6Ca" x1="4" x2="44" y1="23.508" y2="23.508" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4c4c4c" /><stop offset="1" stop-color="#343434" /></linearGradient><path fill="url(#rL2wppHyxHVbobwndsT6Ca)" d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z" /><path d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z" opacity=".05" /><path d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z" opacity=".07" /><path fill="#fff" d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z" /></svg>

                                                        <span className='ml-5 cursor-pointer text-blue-500 hover:underline'>{item.Github}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='ml-2 mt-1.5' height="14px" viewBox="0 0 24 24" width="14px" fill="#09ebd0"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg>
                                                    </span>
                                                    <span className='text-gray-300 flex mb-3 mt-2'>
                                                        <svg
                                                            height="28px"
                                                            viewBox="0 0 512 512"
                                                            width="28px"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        >
                                                            <g>
                                                                <path
                                                                    d="M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z"
                                                                    fill="#1877f2"
                                                                />
                                                                <path
                                                                    d="M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z"
                                                                    fill="#fff"
                                                                />
                                                            </g>
                                                        </svg>
                                                        <span className='ml-5 cursor-pointer text-blue-500 hover:underline'>{item.Facebook}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='ml-2 mt-1.5' height="14px" viewBox="0 0 24 24" width="14px" fill="#09ebd0"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg>
                                                    </span>
                                                    <span className='text-gray-300 flex mb-3 mt-2'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32px" height="32px"><path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z" /><path d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z" opacity=".05" /><path d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z" opacity=".07" /><path fill="#fff" d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z" /></svg>

                                                        <span className='ml-5 cursor-pointer text-blue-500 hover:underline'>{item.LinkedIn}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='ml-2 mt-1.5' height="14px" viewBox="0 0 24 24" width="14px" fill="#09ebd0"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg>
                                                    </span>
                                                    <span className='text-gray-300 flex mb-3 mt-2'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32px" height="32px"><radialGradient id="yOrnnhliCrdS2gy~4tD8ma" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5" /><stop offset=".328" stop-color="#ff543f" /><stop offset=".348" stop-color="#fc5245" /><stop offset=".504" stop-color="#e64771" /><stop offset=".643" stop-color="#d53e91" /><stop offset=".761" stop-color="#cc39a4" /><stop offset=".841" stop-color="#c837ab" /></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z" /><radialGradient id="yOrnnhliCrdS2gy~4tD8mb" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9" /><stop offset=".999" stop-color="#4168c9" stop-opacity="0" /></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z" /><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z" /><circle cx="31.5" cy="16.5" r="1.5" fill="#fff" /><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z" /></svg>

                                                        <span className='ml-5 cursor-pointer text-blue-500 hover:underline'>{item.Instagram}</span>

                                                        <svg xmlns="http://www.w3.org/2000/svg" className='ml-2 mt-1.5' height="14px" viewBox="0 0 24 24" width="14px" fill="#09ebd0"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg>

                                                    </span>
                                                    <span className='text-gray-300 flex mb-3 mt-2'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="32px" height="32px"><path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z" /></svg>

                                                        <span className='ml-5 cursor-pointer text-blue-500 hover:underline'>{item.Twitter}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='ml-2 mt-1.5' height="14px" viewBox="0 0 24 24" width="14px" fill="#09ebd0"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg>
                                                    </span>
                                                    <span className='text-gray-300 flex mb-3 mt-2'>
                                                        <img className='h-7 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS24dMkt2CdVg3JyaHv-rcMJruLWJi9nIhiOTOLs4tE6A&s" alt="" />

                                                        <span className='ml-5 cursor-pointer text-blue-500 hover:underline'>{item.websiteURL}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='ml-2 mt-1.5' height="14px" viewBox="0 0 24 24" width="14px" fill="#09ebd0"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <div className='mt-5 flex'>
                            <div className='w-36 ml-10 mt-28'>
                                <h1 className={`text-xl ${isDarkMode ? "text-black" : "text-white"} font-semibold`}>Your channel :</h1>
                            </div>
                            <div className='ml-36'>
                                <img style={{ width: "1000px" }} className='h-60 rounded-md absolute' src={item.coverPhotoURL} alt="" />
                                <img className='opacity-95 rounded-full h-40 absolute ml-96 mt-36' src={item.channelLogo} alt="" />
                            </div>
                        </div>
                        {creatorCard.map((sub, index) => (
                            <div className={`mt-48 justify-center ${isDarkMode ? "text-black" : "text-white"} item-center text-center`} style={{ maxWidth: "600px", marginLeft: "480px" }}>
                                <p>{item.channelId} - {sub.subscriber} subscribers - {home.length} videos</p>
                                <p className='text-sm text-gray-500 mt-3'>{item.channelDescription}</p>
                            </div>
                        ))}
                    </div>
                ))}

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
                                    <div onClick={() => handlechangeTab("home")} className="flex items-center space-x-2">
                                        <span>Home</span>
                                    </div>
                                }
                            />
                            <Tab

                                key="Courses"
                                title={
                                    <div onClick={() => handlechangeTab("course")} className="flex items-center space-x-2">
                                        <span>Courses</span>
                                    </div>
                                }
                            />
                            <Tab
                                key="Shorts"
                                title={
                                    <div onClick={() => handlechangeTab("shorts")} className="flex items-center space-x-2">
                                        <span>Shorts</span>
                                    </div>
                                }
                            />
                            <Tab
                                key="Community"
                                title={
                                    <div onClick={() => handlechangeTab("community")} className="flex items-center space-x-2">
                                        <span>Community</span>
                                    </div>
                                }
                            />
                            <Tab
                                key="Search"
                                title={
                                    <div onClick={() => handlechangeTab("search")} className="flex items-center space-x-2">

                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#c7b7ba' : '#FFFFFF'} ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                                    </div>
                                }
                            />
                        </Tabs>
                    </div>
                </div>
                <div>
                    {homeTab &&
                        <div
                            id="description-container"
                            className="gap-12 grid grid-cols-3 hover m-20"
                        >
                            {home.map((video, index) => (
                                <div key={index} className='cursor-pointer' id="video-content">
                                    <img
                                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                                        height={350}
                                        width={350}
                                        src={video.videoThumbnail}
                                        alt=""
                                    />
                                    <div className={`mt-3 ${isDarkMode ? "text-black" : "text-white"} justify-center`}>
                                        <h1 className='font-bold'>{video.videoTitle}</h1> {/* video title here*/}
                                        <p className="text-gray-500 text-sm">
                                            {video.viewsCount} views - {formatTime(video.videoPublishedAt)} {/*Content details/analitics*/}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <div className="mb-60">
                    {courseTab &&
                        <div>
                            <div>
                                {allCourses.map((course) => (
                                    <div
                                        key={course.courseId}
                                        className={`ml-20 pt-3 ${isDarkMode ? "bg-gray-300" : "bg-gray-700"} pl-3 pr-3 pb-1 mr-20 rounded-lg mt-10 cursor-pointer`}
                                    >
                                        <div className="">
                                            <div
                                                onClick={() => setSelectedCourseId(course.courseId)}
                                                id="video-content"
                                                className="flex mb-10"
                                            >
                                                {/* Video thumbnail */}
                                                <img
                                                    className="rounded-md"
                                                    height={200}
                                                    width={200}
                                                    src={course.courseThumb}
                                                    alt=""
                                                />
                                                <div className="flex ml-5 justify-center mr-10">
                                                    <div className="ml-3">
                                                        {/* Course title */}
                                                        <h1 className={`mb-3 ${isDarkMode ? "text-black" : "text-white"} font-bold  `}>{course.courseName}</h1>
                                                        <p className="text-gray-500 text-sm">{course.courseDescription}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Course videos */}
                                            {courseStates[course.courseId] && selectedCourseId === course.courseId && (
                                                <div className="ml-20 mb-10">
                                                    {course.videos.map((video: any) => (
                                                        <div className="flex mb-10" key={video.videoId}>
                                                            {/* Video thumbnail */}
                                                            <img
                                                                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                                                                height={100}
                                                                width={300}
                                                                src={video.videoThumbnail}
                                                                alt=""
                                                            />
                                                            <div className="flex mt-10 ml-5 justify-center mr-10">
                                                                <div className="ml-3">
                                                                    {/* Video title */}
                                                                    <h1 className={`font-bold ${isDarkMode ? "text-black" : "text-white"}`}>{video.videoTitle}</h1>
                                                                    <p className={`mb-5 ${isDarkMode ? "text-slate-600" : "text-gray-300"} mt-5 text-sm`}>{video.videoDescription}</p>
                                                                    <p className="text-sm text-gray-500">
                                                                        {video.videoViews} views - {formatTime(video.videoPublishedAt)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Toggle dropdown icon */}
                                            {courseStates[course.courseId] ? (
                                                <svg
                                                    onClick={() => handleShowDropdown(course.courseId)}
                                                    style={{ marginLeft: "600px" }}
                                                    className="animate-bounce rotate-90 w-10  h-10 p-2 bg-slate-500 rounded-full"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    width="24px"
                                                    fill="#09e3d1"
                                                >
                                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                                    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
                                                </svg>
                                            ) : (
                                                <svg
                                                    onClick={() => handleShowDropdown(course.courseId)}
                                                    style={{ marginLeft: "600px" }}
                                                    className="animate-bounce w-10  h-10 p-2 bg-slate-500 rounded-full"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="24px"
                                                    viewBox="0 0 24 24"
                                                    width="24px"
                                                    fill="#09e3d1"
                                                >
                                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                                    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    <div>
                        {communityTab &&
                            <h1>This tab is not implemented.</h1>
                        }
                    </div>
                    <div>
                        {searchTab &&
                            <h1>Search bar is currently disabled.</h1>
                        }
                    </div>
                    <div>
                        {shortTab &&
                            <h1>This tab is not implemented.</h1>
                        }
                    </div>
                </div>
            </div>
            <Modal
                backdrop="opaque"
                size="3xl"
                isOpen={isOpen}
                onClose={onClose}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeInOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader id="model-header" className="flex flex-col gap-1">{headerText}</ModalHeader>
                            <ModalBody>
                                {changeLinkModel &&
                                    <Select
                                        variant="faded"
                                        label="Select a platform"
                                        className="w-full"
                                        onChange={handlePlatformChange}
                                    >
                                        <SelectItem key="Github" value="Github">
                                            Github
                                        </SelectItem>
                                        <SelectItem key="Discord" value="Discord">
                                            Discord
                                        </SelectItem>
                                        <SelectItem key="LinkedIn" value="LinkedIn">
                                            LinkedIn
                                        </SelectItem>
                                        <SelectItem key="Twitter" value="Twitter">
                                            Twitter
                                        </SelectItem>
                                        <SelectItem key="Facebook" value="Facebook">
                                            Facebook
                                        </SelectItem>
                                        <SelectItem key="Instagram" value="Instagram">
                                            Instagram
                                        </SelectItem>
                                        <SelectItem key="any" value="any">
                                            any
                                        </SelectItem>
                                    </Select>
                                }
                                <Input
                                    onChange={(e) => setUpdateddata(e.target.value)}
                                    classNames={{
                                        base: "max-w-full h-10",
                                        mainWrapper: "h-full",
                                        input: "text-small",
                                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                    }}
                                    placeholder="Enter something here..."
                                    size="sm"
                                    type="search"
                                />
                                <p className="text-red-500">
                                    This operation have to performs page reload.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                {!spinnerButton ? (
                                    <Button onClick={() => handleInfoChange()} color="primary" >
                                        Change
                                    </Button>
                                ) : (
                                    <Button isLoading color="primary" >
                                        Changing...
                                    </Button>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}


export default CardGrid;
