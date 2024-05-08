"use client"
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { Card, Skeleton } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { auth } from "@/configurations/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { gql, useQuery } from "@apollo/client";
import { useDarkMode } from "@/components/hooks/theme"
import NextTopLoader from "nextjs-toploader";
import "react-toastify/dist/ReactToastify.css";


const watchLaterDetails = gql`

query playlist($email: String) {
    getWatchLater(email: $email) {
        courseID
        courseFees
        videoId
        videoTitle
        channelLogo
        videoPublishedAt
        videoViews
        videoThumbnail
    }
  }

`
const WatchLater: React.FC = () => {

    const { isDarkMode } = useDarkMode();
    const [isLoaded, setIsLoaded] = React.useState(false);
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [watchLater, setWatchLater] = useState<any[]>([]);

    const [user] = useAuthState(auth);


    const { loading, error, data } = useQuery(watchLaterDetails, {
        variables: { email: email },
    });

    const formatTime = (timestampString: string) => {
        // Convert the string timestamp to a number
        const timestamp = parseInt(timestampString, 10);

        // Check if the converted timestamp is a valid number
        if (isNaN(timestamp)) {
            return "Invalid timestamp";
        }

        const currentDate = new Date();
        const publishedDate = new Date(timestamp);
        const diffInMs = currentDate.getTime() - publishedDate.getTime();
        const diffInSec = Math.floor(diffInMs / 1000);

        // Handle case where timestamp is in the future
        if (diffInSec < 0) {
            return "Future timestamp";
        }

        // Convert timestamp to readable format
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

    const handleRedirect = useCallback(async (videoId: string, courseFees: any, courseId: string) => {
        try {
            // Add video to history
            const historyResponse = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/features/addtohistory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    videoId: videoId
                })
            });
            const historyData = await historyResponse.json();
            console.log("Video added to history:", historyData);
        } catch (historyError) {
            console.error("Failed to add video to history:", historyError);
        }

        // Check if course is free
        if (courseFees === null) {
            // const videoUrl = `/video/${videoId}`;
            // window.location.href = videoUrl;
            // return;
            router.push(`/video/${videoId}`);
        }

        try {
            // Check if user is enrolled in the course
            const enrollResponse = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/api/isenroll`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    courseId: courseId
                })
            });
            const enrollData = await enrollResponse.json();

            // Redirect based on enrollment status
            if (enrollData.isEnrolled === true) {
                // const videoUrl = `/video/${videoId}`;
                // window.location.href = videoUrl;
                router.push(`/video/${videoId}`);
            } else {
                // const paymentUrl = `/payment/${courseId}`;
                // window.location.href = paymentUrl;
                router.push(`/payment/${courseId}`);
            }
        } catch (enrollError) {
            console.error("Failed to fetch enrollment status:", enrollError);
        }
    }, [email]);
    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
        }
        if (data && email) {
            setWatchLater(data.getWatchLater);
            console.log(data.getWatchLater);
        }

    }, [setEmail, data, user, setWatchLater]);

    return (
        <>
            <NextTopLoader />
            <Navbar query={""} />
            <Sidebar />
            {loading ? (
                <div className={`pt-40 pl-72 pb-10  min-h-screen ${isDarkMode ? "bg-white" : "bg-black"}`}>
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className='flex mb-5'>
                            <Skeleton isLoaded={isLoaded} className="w-72 mb-5 rounded-lg">
                                <div className="h-36 w-full rounded-lg bg-gray-500"></div>
                            </Skeleton>
                            <div className="w-full flex items-center gap-3 ml-7">
                                <div>
                                    <Skeleton className="flex rounded-full w-12 h-12" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`${isDarkMode ? "bg-white text-black" : "bg-black text-white"} pb-10`}>
                    <nav className="pt-20 pr-20 ">
                        <ul className="flex flex-row-reverse gap-10">
                            <Tooltip color="warning" delay={700} showArrow={true} content="clear all">
                                <li className={`flex ext-blue-500 ${isDarkMode ? "hover:bg-gray-300" : "hover:bg-gray-700"} font-semibold rounded-full cursor-default`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="m-2" height="24px" viewBox="0 0 24 24" width="24px" fill="#e30b13"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z" /></svg>
                                </li>
                            </Tooltip>
                            <li className="text-3xl font-bold text-amber-600" style={{ marginRight: "820px" }} >
                                Watch later list
                            </li>
                        </ul>
                    </nav>
                    <div className="ml-80 ">
                        <div
                            id="description-container"
                            className=""
                            style={{ marginTop: "40px" }}
                        >
                            {watchLater.map((item, index) => (
                                <div key={index} id="video-content" className="flex mb-10">
                                    {/* video content here*/}
                                    <img
                                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                                        height={200}
                                        width={200}
                                        src={item.videoThumbnail}
                                        onClick={() => {
                                            handleRedirect(item.videoId, item.courseFees, item.courseID)
                                        }}
                                        alt=""
                                    />
                                    <div className="flex mt-10 ml-5 justify-center mr-10">
                                        <div>
                                            {/* Profile picture here */}
                                            <img height={30} width={30} className="rounded-full m-1" src={item.channelLogo} alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <h1 className="font-bold">{item.videoTitle}</h1> {/* video title here*/}
                                            <p className="text-gray-500 text-sm">
                                                {item.videoViews} views - {formatTime(item.videoPublishedAt)} {/*Content details/analitics*/}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default WatchLater;