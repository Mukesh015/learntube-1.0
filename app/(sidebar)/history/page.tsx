"use client"

import React, { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Switch, cn } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { gql, useQuery } from "@apollo/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/configurations/firebase/config";


const historyDetails = gql`

query history($email: String) {
    getHistory(email: $email) {
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

const History: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [history, setHistory] = useState<any[]>([]);
    const [user] = useAuthState(auth);

    const { loading, error, data } = useQuery(historyDetails, {
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
            setHistory(data.getHistory);
            console.table(data.getHistory)
        }

    }, [setEmail, data, setHistory, email, user]);
    return (
        <>
            <Navbar />
            <Sidebar />
            <nav className="mt-24 mr-20">
                <ul className="flex flex-row-reverse gap-10">
                    <Tooltip color="warning" delay={700} showArrow={true} content="Fiter videos">
                        <li className="flex ext-blue-500 text-blue-500 font-semibold hover:bg-blue-200 px-2 rounded-2xl cursor-default py-1">
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#2e4bc9"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" /></svg>
                            Filter
                        </li>
                    </Tooltip>
                    <Tooltip color="warning" delay={700} showArrow={true} content="Save watch history">
                        <li>
                            <Switch
                                classNames={{
                                    base: cn(
                                        "inline-flex flex-row-reverse w-full max-w-md items-center",
                                        "justify-between cursor-pointer rounded-lg gap-2 p-2 ",
                                        "data-[selected=true]:border-primary",
                                    ),
                                    wrapper: "p-0 h-4 overflow-visible",
                                    thumb: cn("w-6 h-6 border-2 shadow-lg",
                                        "group-data-[hover=true]:border-primary",
                                        //selected
                                        "group-data-[selected=true]:ml-6",
                                        // pressed
                                        "group-data-[pressed=true]:w-7",
                                        "group-data-[selected]:group-data-[pressed]:ml-4",
                                    ),
                                }}
                            >
                            </Switch>
                        </li>
                    </Tooltip>
                    <li className="text-3xl font-bold text-amber-600" style={{ marginRight: "680px" }} >
                        Watch History
                    </li>
                </ul>
            </nav>
            <div className="ml-80 ">
                <div
                    id="description-container"
                    className=""
                    style={{ marginTop: "40px" }}
                >
                    <p className="text-xl mb-7">Today</p>
                    {history.map((item, index) => (
                        <div key={index} id="video-content" className="flex mb-10">
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
                                    <h1>{item.videoTitle}</h1> {/* video title here*/}
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

export default History;
