"use client"
import React, { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Button } from "@nextui-org/button";
import { Tabs, Tab } from "@nextui-org/react";
import { useDarkMode } from "@/components/hooks/theme"
import { gql, useQuery } from "@apollo/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/configurations/firebase/config";
import Lottie from "lottie-react";
import animationData from "@/public/Animation - 1714908454989.json"


const CHANNEL_DETAILS = gql`
query CHANNEL_DETAILS ($channelId: String, $email: String){
            getdetailsByChanneld(channelId: $channelId){
                channelId
                channelDescription
                channelLogo
                channelName
                coverPhoto
                noOfVideos
                subscribers
                link {
                  Discord
                  Facebook
                  Github
                  Instagram
                  LinkedIn
                  Twitter
                  any
                }
              }
              
              getCoursesbyChannelID(channelId: $channelId) {
                courseDescription
                courseId
                courseName
                courseThumb
                videos {
                  videoDescription
                  videoId
                  videoPublishedAt
                  videoThumbnail
                  videoTitle
                  videoUrl
                  videoViews
                }
              }
              getvideoByChannelId(channelId: $channelId) {
                videoId
                videoPublishedAt
                videoThumbnail
                videoTitle
                viewsCount
              }
              getFeatures(email: $email,channelId: $channelId) {
                subscribedchannel
              }
        }
        
`
interface Props {
    params: {
        id: string;
    };
}

const ChannelPage: React.FC<Props> = ({ params }) => {
    const { isDarkMode } = useDarkMode();
    const [homeTab, setHomeTab] = useState<boolean>(true);
    const [shortTab, setShortTab] = useState<boolean>(false);
    const [courseTab, setCourseTab] = useState<boolean>(false);
    const [courseStates, setCourseStates] = useState<{ [key: string]: boolean }>({});
    const [communityTab, setCommunityTab] = useState<boolean>(false);
    const [searchTab, setSearchTab] = useState<boolean>(false);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
    const [isSubsCribed, setIsSubsribed] = useState<boolean>(false);
    const [channelDetails, setChannelDetails] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [videos, setVideos] = useState<any[]>([]);
    const [email, setEmail] = useState<string>("");

    const [user] = useAuthState(auth);

    const channelId: any = decodeURIComponent(params.id)

    const { loading, error, data, refetch } = useQuery(CHANNEL_DETAILS, {
        variables: { channelId: channelId, email: email },
    });


    const toggleSubscribe = () => {
        setIsSubsribed(!isSubsCribed);
    }

    const handleSubscribe = useCallback(async () => {
        toggleSubscribe();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/api/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    // creatorEmail: creatorEmail,
                    channelId: channelId,
                }),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                toggleSubscribe();
            }
        } catch (error) {
            console.log(error);
        }
    }, [email, toggleSubscribe /*creatorEmail*/, channelId])

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


    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
        }
        if (data && email != "") {
            console.log(data);
            setIsSubsribed(data.getFeatures[0].subscribedchannel);
            setChannelDetails(data.getdetailsByChanneld)
            setCourses(data.getCoursesbyChannelID)
            setVideos(data.getvideoByChannelId)
        }

    }, [user, setEmail, setIsSubsribed, setChannelDetails, setCourses, setVideos, data]);

    return (
        <>
            <Navbar query={""} />
            <Sidebar />
            {loading ? (
                <div className={`pt-20 pb-11 ${isDarkMode ? "bg-white" : "bg-black"}`}>
                    <div className={`w-[700px] mt-20 ml-[600px]`}>
                        <Lottie animationData={animationData} />
                    </div>
                </div>
            ) : (
                <div>
                    <div className={`pb-20 ${isDarkMode ? "bg-white" : "bg-black"}`}>
                        <div style={{ maxWidth: "1400px", paddingLeft: "360px", paddingTop: "100px" }}>
                            {channelDetails.map((item, index) => (
                                <div key={index} className="">
                                    <img style={{ width: "1400px" }} className="h-40 rounded-xl" src={item.coverPhoto} alt="" />
                                    <div className="flex mt-10">
                                        <img className="rounded-full h-40" src={item.channelLogo} alt="" />
                                        <div className="ml-10">
                                            <h1 className={`text-3xl ${isDarkMode ? "text-black" : "text-white"} font-bold mb-3`}>{item.channelName}</h1>
                                            <p className={`mb-2 space-x-3 text-sm font-semibold`}>
                                                <span className="text-blue-600">{item.channelId}</span>
                                                <span className="text-gray-500">{item.subscribers} subscribers</span>
                                                <span className="text-gray-500">{item.noOfVideos} videos</span>
                                            </p>
                                            <p className="text-sm mb-2 text-slate-500">{item.channelDescription}</p>
                                            <p className="text-sm mb-3 space-x-3">
                                                <span className="text-blue-500">{item.link.any}</span>
                                                <span className="text-slate-500">  and some more links</span>
                                            </p>
                                            <Button
                                                className={`${isSubsCribed ? `bg-transparent ${isDarkMode ? "text-black bg-gray-200" : "text-white bg-gray-700 "} border-default-200` : ""}`}
                                                color="primary"
                                                radius="full"
                                                size="md"
                                                variant={isSubsCribed ? "bordered" : "solid"}
                                                onPress={() => handleSubscribe()}
                                            >
                                                {isSubsCribed ? "Unsubscribe" : "Subscribe"}
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap gap-7 mt-10">
                                            <Tabs color="warning" variant="underlined" aria-label="Tabs variants">
                                                <Tab
                                                    key="Home"
                                                    title={
                                                        <div onClick={() => handlechangeTab("home")} className="flex items-center space-x-2">
                                                            <span className="text-rose-500">Home</span>
                                                        </div>
                                                    }
                                                />
                                                <Tab
                                                    key="Courses"
                                                    title={
                                                        <div onClick={() => handlechangeTab("course")} className="flex items-center space-x-2">
                                                            <span className="text-rose-500">Courses</span>
                                                        </div>
                                                    }
                                                />
                                                <Tab
                                                    key="Shorts"
                                                    title={
                                                        <div onClick={() => handlechangeTab("short")} className="flex items-center space-x-2">
                                                            <span className="text-rose-500">Shorts</span>
                                                        </div>
                                                    }
                                                />
                                                <Tab
                                                    key="Community"
                                                    title={
                                                        <div onClick={() => handlechangeTab("community")} className="flex items-center space-x-2">
                                                            <span className="text-rose-500">Community</span>
                                                        </div>
                                                    }
                                                />
                                                <Tab
                                                    onClick={() => handlechangeTab("search")}
                                                    key="Search"
                                                    title={
                                                        <div className="flex items-center space-x-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FF007F" ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                                                        </div>
                                                    }
                                                />
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div>
                                <div>
                                    {homeTab &&
                                        <div
                                            id="description-container"
                                            className="gap-12 grid grid-cols-3 mt-10"
                                        >
                                            {videos.map((video, index) => (
                                                <div key={index} className='cursor-pointer' id="video-content">
                                                    <img
                                                        className="transition h-48 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
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
                                                {courses.map((course) => (
                                                    <div
                                                        key={course.courseId}
                                                        className={` pt-3 ${isDarkMode ? "bg-gray-300" : "bg-gray-700"} pl-3 pr-3 pb-1  rounded-lg mt-10 cursor-pointer`}
                                                    >
                                                        <div className="">
                                                            <div
                                                                onClick={() => setSelectedCourseId(course.courseId)}
                                                                id="video-content"
                                                                className="flex mb-10"
                                                            >
                                                                {/* Video thumbnail */}
                                                                <img
                                                                    className="rounded-md h-40"
                                                                    width={300}
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
                                                                                width={250}
                                                                                className="h-36 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                                                                                src={video.videoThumbnail}
                                                                                alt=""
                                                                            />
                                                                            <div className="flex ml-5 mr-10">
                                                                                <div className="ml-3">
                                                                                    {/* Video title */}
                                                                                    <h1 className={`font-bold ${isDarkMode ? "text-black" : "text-white"}`}>{video.videoTitle}</h1>
                                                                                    <p className={`mt-2 ${isDarkMode ? "text-slate-600" : "text-gray-300"} text-sm`}>{video.videoDescription}</p>
                                                                                    <p className="text-sm mt-3 text-gray-500">
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
                                                                    style={{ marginLeft: "480px" }}
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
                                                                    style={{ marginLeft: "480px" }}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChannelPage;