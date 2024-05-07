"use client"
import dynamic from 'next/dynamic'
import Navbar from "@/components/navbar";
import { useRouter } from 'next/navigation';
import { User } from "@nextui-org/react"
import { Button, ButtonGroup } from "@nextui-org/button";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";
import { gql, useQuery } from "@apollo/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/configurations/firebase/config";
import { useDarkMode } from "@/components/hooks/theme"
import NextTopLoader from 'nextjs-toploader';
import "react-toastify/dist/ReactToastify.css";
import { Card, Skeleton } from "@nextui-org/react";
import animationData1 from "@/public/Animation - 1714890965505.json"
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });


const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const VideoUrl = gql`
query GetVideoUrl( $email: String, $videoId: String,$channelId: String) {
    getFeatures(email: $email, videoID: $videoId, channelId: $channelId) {
        dislikedVideos
        hasInHistory
        haveInMyVideos
        haveInPlaylist
        haveInWatchLater
        isLiked
        subscribedchannel
        totalSubscriber
      }
      getAllVideoUrl {
        allEmail
        allThumbnailUrls
        allVideoTitles
        allVideoUrls
        channelLogo
        channelName
        courseFees
        courseId
        uploadAt
        videoId
        views
      }
      getVideoUrl (email: $email, videoID: $videoId) {
        channelId
        channelName
        channelLogo
        creatorEmail
        videoDescription
        videoPublishedAt
        videoTags
        videoTitle
        videoURl
        videoViews
      }
      getComments(videoID: $videoId) {
        count
        comments
        timeStamp
        user
        channelId
        channelLogo
      }
    }
`;

interface Props {
    params: {
        id: string;
    };
}

const VideoPage: React.FC<Props> = ({ params }) => {

    const [user] = useAuthState(auth);
    const { isDarkMode } = useDarkMode();
    const [isLoaded, setIsLoaded] = React.useState(false);
    const router = useRouter();
    const [isAddedToPlaylist, setIsAddedToPlaylist] = useState<boolean>(false);
    const [isAddedToWatchLater, setIsAddedToWatchLater] = useState<boolean>(false);
    const [isLikedVideo, setIsLikedVideo] = useState<boolean>(false);
    const [isDisLikedVideo, setIsDisLikedVideo] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>("")
    const [email, setEmail] = useState<string>("");
    const [allVideos, setAllVideos] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const [subscribers, setSubscribers] = useState<string>("");

    const [videoTitle, setVideoTitle] = useState<string>("");
    const [videoDescription, setVideoDescription] = useState<string>("");
    const [channelName, setChannelName] = useState<string>("");
    const [channelLogo, setChannelLogo] = useState<string>("");
    const [videoViews, setVideoViews] = useState<string>("");
    const [videoPublishedAt, setVideoPublishedAt] = useState<string>("");
    const [videoTags, setVideoTags] = useState<string>("");
    const [creatorEmail, setCreatorEmail] = useState<string>("");
    const [isSubsCribed, setIsSubsribed] = useState<boolean>(false);
    const [channelId, setChannelId] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [logo, setLogo] = useState<string>("");
    const [watchTime, setWatchTime] = useState<number>(0);


    const toggleSubscribe = () => {
        setIsSubsribed(!isSubsCribed);
    }

    const toggleAddToPlaylist = () => {
        setIsAddedToPlaylist(!isAddedToPlaylist);
    }

    const toggleAddToWatchLater = () => {
        setIsAddedToWatchLater(!isAddedToWatchLater);
    }

    const videoId: any = decodeURIComponent(params.id)
    const { loading, error, data, refetch } = useQuery(VideoUrl, {
        variables: { email: email, videoId: videoId, channelId: channelId },
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

    const handleSubscribe = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/api/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    creatorEmail: creatorEmail,
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
    }, [email, toggleSubscribe, creatorEmail, channelId])

    const handleDislikeVideo = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/features/addtodislikevideo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    videoId: videoId
                })
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setIsDisLikedVideo(true);
                setIsLikedVideo(false);
            }
        } catch (error) {
            console.error("Failed to fetch", error);
        }
    }, [setIsDisLikedVideo, setIsLikedVideo, email, videoId]);

    const handleLikedVideo = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/features/addtolikedvideos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    videoId: videoId
                })
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setIsLikedVideo(true);
                setIsDisLikedVideo(false);
            }
        } catch (error) {
            console.error("Failed to like this video", error)
        }
    }, [setIsLikedVideo, email, setIsDisLikedVideo, videoId]);

    const handleAddToWatchLater = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/features/addtowatchlater`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    videoId: videoId
                })
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                toggleAddToWatchLater();
            }
        } catch (error) {
            console.error("Failed to add watch later", error)
        }
    }, [email, videoId, toggleAddToWatchLater])


    const handleAddToPlaylist = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/features/addtoplaylist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    videoId: videoId
                })
            });
            if (response.ok) {
                toggleAddToPlaylist();
                console.log("video added successfully")
            }
        } catch (error) {
            console.error("Failed to add to playlist", error);
        }
    }, [email, videoId, toggleAddToPlaylist])

    const timeSinceUpload = (uploadAt: string) => {
        const uploadDate = new Date(uploadAt);
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate.getTime() - uploadDate.getTime());
        const hours = Math.floor(timeDiff / (1000 * 3600));
        const days = Math.floor(hours / 24);

        if (days >= 1) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        }
    };


    const handleAddComment = useCallback(async () => {
        console.log(creatorEmail, email)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/video/addcomment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    videoId: videoId,
                    comment: comment,
                    logo: logo,
                    user: email,
                    creatorEmail: creatorEmail
                })
            });
            const data = await response.json();
            console.log(data);
            setComment("")
        } catch (error) {
            console.error("Failed to add comment, server error", error);
        }
    }, [creatorEmail, videoId, comment, logo, email, setComment]);

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
            router.push(`/video/${videoId}`);
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
    }, [email, router]);

    const startWatchTime = () => {
        const startTime = Date.now();
        setWatchTime(startTime);
    };

    const stopWatchTime = async () => {
        if (watchTime !== 0) {
            const endTime = Date.now();
            const duration = endTime - watchTime;
            console.log(`Watch time: ${duration} milliseconds:${email}`);
            setWatchTime(0);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/features/calculatewatchtime`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: creatorEmail,
                        watchTime: duration
                    })
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Failed to add comment, server error", error);
            }
        }
    };


    useEffect(() => {
        startWatchTime();
        return () => {
            stopWatchTime();
        };
    }, []);


    useEffect(() => {
        if (data) {
            setVideoUrl(data.getVideoUrl[0].videoURl);
            setChannelId(data.getVideoUrl[0].channelId);
            setIsAddedToPlaylist(data.getFeatures[0].haveInPlaylist)
            setIsAddedToWatchLater(data.getFeatures[0].haveInWatchLater)
            setIsLikedVideo(data.getFeatures[0].isLiked)
            setIsSubsribed(data.getFeatures[0].subscribedchannel)
            setIsDisLikedVideo(data.getFeatures[0].dislikedVideos)
            setAllVideos(data.getAllVideoUrl);
            setCreatorEmail(data.getVideoUrl[0].creatorEmail);
            setVideoTitle(data.getVideoUrl[0].videoTitle);
            setVideoDescription(data.getVideoUrl[0].videoDescription);
            setChannelName(data.getVideoUrl[0].channelName);
            setChannelLogo(data.getVideoUrl[0].channelLogo);
            setVideoViews(data.getVideoUrl[0].videoViews);
            setVideoPublishedAt(data.getVideoUrl[0].videoPublishedAt);
            setVideoTags(data.getVideoUrl[0].videoTags);
            setComments(data.getComments)
            setSubscribers(data.getFeatures[0].totalSubscriber)
            console.log(data);
        }
        if (user) {
            setEmail(user.email || "");
            setLogo(user.photoURL || "");
            refetch()
        }
    }, [user, setLogo, setEmail, channelId, setChannelId, setCreatorEmail, setAllVideos, setVideoPublishedAt, setChannelName, setChannelLogo,
        setVideoViews, setSubscribers, setVideoUrl, setVideoTitle, setVideoDescription, setVideoTags, setIsAddedToPlaylist, data, setComments]);

    return (
        <>
            <NextTopLoader />
            <Navbar query={''} />
            {loading ? (
                <div className={`p-10 ${isDarkMode ? "bg-white" : "bg-black"} pt-24 flex`}>
                    <div style={{ width: "1000px" }}>
                        <div className={`rounded-lg mr-5 ${isDarkMode ? "bg-gray-200" : "bg-gray-700"} `} style={{ height: "500px " }}>
                            <div className='flex space-x-2 justify-center items-center'>
                                <div className="w-4 h-4 rounded-full mt-60 animate-pulse dark:bg-violet-600"></div>
                                <div className="w-4 h-4 rounded-full mt-60 animate-pulse dark:bg-violet-600"></div>
                                <div className="w-4 h-4 rounded-full mt-60 animate-pulse dark:bg-violet-600"></div>
                            </div>
                        </div>
                        <div className='mt-5 mr-5'>
                            <Skeleton isLoaded={isLoaded} className="w-full mb-5 rounded-lg">
                                <div className="h-3 w-full  rounded-lg bg-gray-500"></div>
                            </Skeleton>
                            <div className="w-full flex items-center gap-3">
                                <div>
                                    <Skeleton className="flex rounded-full w-12 h-12" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        {[...Array(5)].map((_, index) => (
                            <Card key={index} className={`w-[500px] ${isDarkMode ? "bg-slate-100" : "bg-slate-600"} space-y-7 p-4 mb-5 h-32 radius="lg`}>
                                <div className='flex'>
                                    <div className='mr-8'>
                                        <Skeleton className="h-20 w-40 rounded-lg" />
                                    </div>
                                    <div className="max-w-[300px] w-full flex items-center gap-3">
                                        <div>
                                            <Skeleton className="flex rounded-full w-12 h-12" />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <Skeleton className="h-3 w-3/5 rounded-lg" />
                                            <Skeleton className="h-3 w-4/5 rounded-lg" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={`py-20 ${isDarkMode ? "bg-white" : "bg-black"}  px-10 flex`}>
                    <div id="video-container" style={{ maxWidth: "950px" }}>
                        <ReactPlayer width={960} height={550} controls url={videoUrl} onPlay={startWatchTime}
                            onPause={stopWatchTime} />
                        <div>
                            <h1 className={`text-xl font-bold mt-3 ${isDarkMode ? "text-black" : "text-white"} mb-5`}>{videoTitle}</h1>
                            <nav className="mb-5">
                                <ul className="flex gap-4">
                                    <li>
                                        <Tooltip color="warning" delay={700} showArrow={true} content="Jane's channel">
                                            <User
                                                onClick={() => router.push(`/channel/${channelId}`)}
                                                className={`${isDarkMode ? "text-black" : "text-white"}`}
                                                name={channelName}
                                                description={`${subscribers} subscribers`}
                                                avatarProps={{
                                                    src: channelLogo
                                                }}
                                            />
                                        </Tooltip>
                                    </li>
                                    <li>
                                        <Tooltip color="warning" delay={700} showArrow={true} content="Subscribe">
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
                                        </Tooltip>
                                    </li>
                                    <li className="ml-16">
                                        <ButtonGroup variant="bordered">
                                            <Tooltip color="warning" delay={700} showArrow={true} content="Like">
                                                <Button onPress={handleLikedVideo}>
                                                    {isLikedVideo ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                                            height="24" viewBox="0 -960 960 960" width="24"><path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z" /></svg>

                                                    ) : (

                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                                        ><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" /><path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z" /></svg>
                                                    )}
                                                </Button>
                                            </Tooltip>
                                            <Tooltip color="warning" delay={700} showArrow={true} content="Dislike">
                                                <Button onPress={handleDislikeVideo}>
                                                    {isDisLikedVideo ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                                            height="24" viewBox="0 -960 960 960" width="24"><path d="M240-840h400v520L360-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 1.5-15t4.5-15l120-282q9-20 30-34t44-14Zm480 520v-520h160v520H720Z" /></svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                                        ><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" /><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm0 12-4.34 4.34L12 14H3v-2l3-7h9v10zm4-12h4v12h-4z" /></svg>
                                                    )}

                                                </Button>
                                            </Tooltip>
                                        </ButtonGroup>
                                    </li>
                                    <li>
                                        <Tooltip color="warning" delay={700} showArrow={true} content="Share this video">

                                            <Button className={`flex ${isDarkMode ? " text-black" : ""}`} variant="bordered">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                                ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" /></svg>
                                                Share
                                            </Button>
                                        </Tooltip>
                                    </li>
                                    <li>
                                        <Tooltip color="warning" delay={700} showArrow={true} content="Add to playlist">
                                            <Button onPress={handleAddToPlaylist} className={`flex ${isDarkMode ? " text-black" : ""}`} variant="bordered">
                                                {isAddedToPlaylist ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                                    ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>

                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                                    ><g><rect fill="none" height="24" width="24" /></g><g><path d="M14,10H3v2h11V10z M14,6H3v2h11V6z M18,14v-4h-2v4h-4v2h4v4h2v-4h4v-2H18z M3,16h7v-2H3V16z" /></g></svg>
                                                )}
                                                Save
                                            </Button>
                                        </Tooltip>
                                    </li>
                                    <li>
                                        <Tooltip color="warning" delay={700} showArrow={true} content="Add to watch later">
                                            <Button onPress={handleAddToWatchLater} className={`flex ${isDarkMode ? " text-black" : ""}`} variant="bordered">
                                                {isAddedToWatchLater ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                                    ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                                    ><g><rect fill="none" height="24" width="24" x="0" /></g><g><g><path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M12.5,7H11v6l5.2,3.2l0.8-1.3l-4.5-2.7V7z" /></g></g></svg>
                                                )}
                                                Watch later
                                            </Button>
                                        </Tooltip>
                                    </li>
                                    <li>
                                        <svg className='mt-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                        ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>

                                    </li>
                                </ul>
                            </nav>
                            <Tooltip color="warning" delay={700} showArrow={true} content="Video details">
                                <Accordion variant="shadow">
                                    <AccordionItem className="text-gray-300" key="1" aria-label="Accordion 1" title="Video Description">
                                        <h1 className="mb-5">{videoViews} views  {videoPublishedAt} - {videoTags}</h1>
                                        <h2 className="mb-5">
                                            {videoTitle}
                                        </h2>
                                        <p>
                                            {videoDescription}
                                        </p>
                                    </AccordionItem>
                                </Accordion>
                            </Tooltip>
                            <div className={`mt-5 ${isDarkMode ? "text-black" : "text-white"} flex`}>
                               <h3>{comments.length ? `${comments.length} comments` : "No comments"}</h3>
                                <Tooltip color="warning" delay={700} showArrow={true} content="Filter to read">
                                    <Button className={`flex ${isDarkMode ? "text-black" : "text-white"} ml-10`} variant="bordered">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#000000' : '#FFFFFF'}
                                        ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" /></svg>
                                        Sort
                                    </Button>
                                </Tooltip>
                            </div>
                            <div className="flex gap-7 mb-10">
                                <img className="h-10 mt-3 rounded-full" src={logo} alt="" />
                                <Input type="text" color='primary' className={`ml-0 ${isDarkMode ? "text-black" : "text-white"}`} onChange={(e) => setComment(e.target.value)} value={comment} variant="underlined" label="Add a comment" />
                                <Button onPress={() => handleAddComment()} className={`ml-10 ${isDarkMode ? "text-black" : "text-white"}`} variant="bordered">
                                    Add
                                </Button>
                            </div>
                            {comments.map((comment, index) => (
                                <div key={index} className='mb-3'>
                                    <div className='flex'>
                                        <img className="h-8 mr-5 rounded-full" src={comment.channelLogo} alt="" />
                                        <p className={`text-md text-blue-700 font-semibold`}>
                                            {comment.channelId}
                                        </p>
                                    </div>
                                    <p className={`ml-16 text-sm ${isDarkMode ? "text-black" : "tuserId}hite"}`}>{comment.comments}</p>
                                    <p className='text-blue-500 text-sm ml-14 mt-2'>
                                        <span>{formatTime(comment.timeStamp)}</span>
                                        <span className='hover:underline ml-5 hover:text-blue-950 cursor-pointer'>reply</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div >
                    <div>
                        <div>
                            {allVideos.map((video, index) => (
                                <Tooltip color="warning" delay={700} showArrow={true} content={video.allVideoTitles} key={index}>
                                    <div className="ml-10 flex mb-5 cursor-pointer" onClick={() => {
                                        handleRedirect(video.videoId, video.courseFees, video.courseId)
                                    }}>
                                        <img style={{ height: "130px", width: "200px" }} className="rounded-md" src={video.allThumbnailUrls} alt="" />
                                        <div className="max-w-56 ml-3">
                                            <h1 className={`font-semibold ${isDarkMode ? "text-black" : "text-white"}`}>{video.allVideoTitles}</h1>
                                            <h2 className="text-gray-500 text-sm">{video.channelName}</h2>
                                            <h3 className="text-gray-500 text-sm">{video.views} views - {timeSinceUpload(video.uploadAt)}
                                                {video.courseFees !== null &&
                                                    <Lottie className="h-5 ml-3" animationData={animationData1} />
                                                }
                                            </h3>
                                        </div>
                                    </div>
                                </Tooltip>
                            ))}
                        </div>
                    </div>
                </div >
            )}

        </>
    )
}
export default VideoPage;
