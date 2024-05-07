"use client"
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { auth } from "@/configurations/firebase/config";
import { gql, useQuery } from "@apollo/client";
import NextTopLoader from "nextjs-toploader";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-toastify/dist/ReactToastify.css";
import { useDarkMode } from "@/components/hooks/theme"
import { useRouter } from "next/navigation";
import { Card, Skeleton } from "@nextui-org/react";
import Lottie from "lottie-react";
import animationData1 from "@/public/Animation - 1714890965505.json"


const searchQuery = gql`
query searchQuery( $query: String){
    getSearchQueryDetails(query: $query) {
        videoDescription
        courseID
        courseFees
        videoID
        videoTags
        videoUrl
        videoTitle
        videoPublishedAt
        videoThumbnail
        videoViews
        channelName
        channelLogo
      }
}`;
interface Props {
    params: {
        query: string;
    };
}
const SerachResult: React.FC<Props> = ({ params }) => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const { isDarkMode } = useDarkMode();
    const [searQuery, setSearchQuery] = useState<any[]>([]);
    const [user] = useAuthState(auth);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const query: any = decodeURIComponent(params.query)

    const { loading, error, data } = useQuery(searchQuery, {
        variables: { query: query },
    });


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
            const videoUrl = `/video/${videoId}`;
            router.push(videoUrl);
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
                const videoUrl = `/video/${videoId}`;
                router.push(videoUrl);

            } else {
                const paymentUrl = `/payment/${courseId}`;
                router.push(paymentUrl);

            }
        } catch (enrollError) {
            console.error("Failed to fetch enrollment status:", enrollError);
        }
    }, [email]);
    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
        }
        if (data) {
            setSearchQuery(data.getSearchQueryDetails);
            console.log(data.getSearchQueryDetails)

        }
    }, [setSearchQuery, data, setEmail, user]);
    return (
        <>
            <NextTopLoader />
            <Navbar query={query} />
            <Sidebar />
            {loading ? (
                <div className={`pt-44 pl-72 pb-10  min-h-screen ${isDarkMode ? "bg-white" : "bg-black"}`}>
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
                <div className={`pt-20 pl-72 pb-10 ${isDarkMode ? "bg-white" : "bg-black"}`}>
                    <h1 className={`mb-10 ${isDarkMode ? "text-black" : "text-white"} text-medium`}>Based on your search</h1>
                    {searQuery.map((video, index) => (
                        <div key={index} className="flex cursor-pointer mb-10">
                            <img
                                width={350}
                                className="rounded-lg"
                                src={video.videoThumbnail}
                                alt=""
                                onClick={() => {
                                    handleRedirect(video.videoID, video.courseFees, video.courseID)
                                }}
                            />
                            <div className="ml-6">
                                <p className={`text-xl ${isDarkMode ? "text-black" : "text-white"}`}>{video.videoTitle}</p>
                                <p className="text-medium text-gray-600 mt-3 flex font-semibold">
                                    {video.videoViews} views - 9 months ago
                                    {video.courseFees !== null &&
                                        <Lottie className="h-5 ml-3" animationData={animationData1} />
                                    }
                                </p>
                                <div className="mt-5 mb-2 flex">
                                    <img
                                        className="h-8 rounded-full"
                                        src={video.channelLogo}
                                        alt=""
                                    />
                                    <p className={`font-semibold ${isDarkMode ? "text-black" : "text-white"} ml-3`}>{video.channelName}</p>
                                </div>
                                <p className="text-sm text-gray-600">{video.videoDescription}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default SerachResult;