"use client"
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { auth } from "@/configurations/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { gql, useQuery } from "@apollo/client";


const watchLaterDetails = gql`

query likedVideos($email: String) {
    getLikedVideos(email: $email) {
        courseFees
        courseId
        videoId
        videoTitle
        channelLogo
        videoPublishedAt
        videoViews
        videoThumbnail
    }
  }
`
const Likedvideo: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [likedVideo, setLikedVideo] = useState<any[]>([]);

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
            const videoUrl = `/video/${videoId}`;
            window.location.href = videoUrl;
            return;
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
                window.location.href = videoUrl;
            } else {
                const paymentUrl = `/payment/${courseId}`;
                window.location.href = paymentUrl;
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
            setLikedVideo(data.getLikedVideos);
            console.log(data.getLikedVideos)
        }

    }, [setEmail, data, user, setLikedVideo]);


    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="ml-80 mt-28">
                <div
                    id="description-container"
                    className=""
                    style={{ marginTop: "40px" }}
                >
                    <p className="text-3xl font-bold text-amber-600 mb-7">Liked videos</p>
                    {likedVideo.map((item, index) => (

                        <div id="video-content" className="flex mb-10">
                            {/* video content here*/}
                            <img
                                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                                height={200}
                                width={200}
                                src={item.videoThumbnail}
                                alt=""
                                onClick={() => {
                                    handleRedirect(item.videoId, item.courseFees, item.courseId)
                                }}
                            />
                            <div className="flex mt-10 ml-5 justify-center mr-10">
                                <div>
                                    {/* Profile picture here */}
                                    <img height={30} width={30} className="rounded-full m-1" src={item.channelLogo} alt="" />
                                </div>
                                <div className="ml-3">
                                    <h1 className="">{item.videoTitle}</h1> {/* video title here*/}
                                    <p className="text-gray-500">
                                        {item.videoViews} views - {formatTime(item.videoPublishedAt)} {/*Content details/analitics*/}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Likedvideo;