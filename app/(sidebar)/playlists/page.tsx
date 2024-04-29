"use client"
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Tooltip } from "@nextui-org/react";
import { auth } from "@/configurations/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { gql, useQuery } from "@apollo/client";

const playListDetails = gql`

query playlist($email: String) {
    getPlaylist(email: $email) {
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


const Playlist: React.FC = () => {


    const [email, setEmail] = useState<string>("");
    const [playList, setPlayList] = useState<any[]>([]);

    const [user] = useAuthState(auth);


    const { loading, error, data } = useQuery(playListDetails, {
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

    const handleRedirect = async (videoId: any, courseFees: any, courseId: any) => {
    //  console.log(courseFees, courseId, videoId );
        if (courseFees === null) {
            const url = `/video/${videoId}`;
            window.location.href = url;
        } else {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/api/isenroll`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        courseId: courseId
                    })
                });
                const data = await response.json();
                console.log(data);
                if (data.isEnrolled === true) {
                    console.log("hello")
                    const url = `/video/${videoId}`;
                    window.location.href = url;
                }
                else {
                    const url = `/payment/${courseId}`;
                    window.location.href = url;
                }
            } catch (error) {
                console.error("Failed to fetch", error);
            }

        }
    }

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
        }
        if (data && email) {
            setPlayList(data.getPlaylist);
            console.table(data.getPlaylist)
        }
    }, [setEmail, data, user, setPlayList]);


    return (
        <>
            <Navbar />
            <Sidebar />
            <nav className="mt-24 mr-20">
                <ul className="flex flex-row-reverse gap-10">
                    <Tooltip color="warning" delay={700} showArrow={true} content="Fiter platlist">
                        <li className="flex ext-blue-500 text-blue-500 font-semibold hover:bg-blue-200 px-2 rounded-2xl cursor-default py-1">
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#2e4bc9"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" /></svg>
                            Filter
                        </li>
                    </Tooltip>
                    <Tooltip color="warning" delay={700} showArrow={true} content="Manage your playlist">
                        <li className="text-blue-500 font-semibold hover:bg-blue-200 px-2 rounded-2xl cursor-default py-1">
                            Manage
                        </li>
                    </Tooltip>
                    <li className="text-3xl font-bold text-amber-600" style={{ marginRight: "650px" }} >
                        Saved Playlists
                    </li>
                </ul>
            </nav>
            <div className="ml-80 ">
                <div
                    id="description-container"
                    className=""
                    style={{ marginTop: "40px" }}
                >
                    {playList.map((video, index) => (
                        <div onClick={() => {
                            handleRedirect(video.videoId, video.courseFees, video.courseID)
                        }} key={index} id="video-content" className="flex mb-10 cursor-pointer">
                            {/* video content here*/}
                            <img
                                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                                height={200}
                                width={200}
                                src={video.videoThumbnail}

                                alt=""
                            />
                            <div className="flex mt-10 ml-5 justify-center mr-10">
                                <div>
                                    {/* Profile picture here */}
                                    <img height={30} width={30} className="rounded-full m-1" src={video.channelLogo} alt="" />
                                </div>
                                <div className="ml-3">
                                    <h1 className="">{video.videoTitle}</h1> {/* video title here*/}
                                    <p className="text-gray-500">
                                        {video.videoViews} views - {formatTime(video.videoPublishedAt)} {/*Content details/analitics*/}
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

export default Playlist;

function useEffects(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}
