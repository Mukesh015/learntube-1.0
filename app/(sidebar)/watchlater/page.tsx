"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Switch, cn } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { auth } from "@/configurations/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { gql, useQuery } from "@apollo/client";

const watchLaterDetails = gql`

query playlist($email: String) {
    getWatchLater(email: $email) {
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
            <Navbar />
            <Sidebar />
            <nav className="mt-24 mr-20">
                <ul className="flex flex-row-reverse gap-10">
                    <Tooltip color="warning" delay={700} showArrow={true} content="clear all">
                        <li className="flex ext-blue-500 font-semibold hover:bg-gray-700 rounded-full cursor-default">
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
                        <div id="video-content" className="flex mb-10">
                            {/* video content here*/}
                            <img
                                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                                height={200}
                                width={200}
                                src={item.videoThumbnail}
                                alt=""
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

export default WatchLater;