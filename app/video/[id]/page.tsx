"use client"
import dynamic from 'next/dynamic'
import Navbar from "@/components/navbar";
import { User } from "@nextui-org/react"
import { Button, ButtonGroup } from "@nextui-org/button";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";
import { gql, useQuery } from "@apollo/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/configurations/firebase/config";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const VideoUrl = gql`
query GetVideoUrl( $email: String, $videoId: String,$channelId: String) {
    getVideoUrl(email: $email, videoID: $videoId) {
        videoURl
        videoDescription
        channelLogo 
        channelName
        creatorEmail
        videoTitle
        videoViews
        videoPublishedAt
        videoTags
        channelId
    }
    getFeatures(email: $email, videoID: $videoId,channelId: $channelId) {
        haveInMyVideos
        haveInPlaylist
        haveInWatchLater    
        isLiked
        subscribedchannel
        hasInHistory
        dislikedVideos

    }
    getAllVideoUrl {
        channelLogo
        channelName
        allEmail
        allThumbnailUrls
        allVideoTitles
        allVideoUrls
        uploadAt
        videoId
        views
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

    const [isAddedToPlaylist, setIsAddedToPlaylist] = useState<boolean>(false);
    const [isAddedToWatchLater, setIsAddedToWatchLater] = useState<boolean>(false);
    const [isLikedVideo, setIsLikedVideo] = useState<boolean>(false);
    const [isDisLikedVideo, setIsDisLikedVideo] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>("")
    const [email, setEmail] = useState<string>("");
    const [allVideos, setAllVideos] = useState<any[]>([]);
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
    const { loading, error, data } = useQuery(VideoUrl, {
        variables: { email: email, videoId: videoId, channelId: channelId },
    });

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
            console.log(data);
            console.log(channelId);
        }
        if (user) {
            setEmail(user.email || "");
        }
    }, [user, setEmail, channelId, setChannelId, setCreatorEmail, setAllVideos, setVideoPublishedAt, setChannelName, setChannelLogo, setVideoViews, setVideoUrl, setVideoTitle, setVideoDescription, setVideoTags, setIsAddedToPlaylist, data]);

    return (
        <>
            <Navbar />
            <div className="mt-24 ml-10 mr-10 flex">
                <div id="video-container" style={{ maxWidth: "950px" }}>
                    <ReactPlayer width={960} height={550} controls url={videoUrl} />
                    <div>
                        <h1 className="text-xl mb-5">{videoTitle}</h1>
                        <nav className="mb-5">
                            <ul className="flex gap-4">
                                <li>
                                    <Tooltip color="warning" delay={700} showArrow={true} content="Jane's channel">
                                        <User
                                            name={channelName}
                                            description="29k subscribers"
                                            avatarProps={{
                                                src: channelLogo
                                            }}
                                        />
                                    </Tooltip>
                                </li>
                                <li>
                                    <Tooltip color="warning" delay={700} showArrow={true} content="Subscribe">

                                        <Button
                                            className={isSubsCribed ? "bg-transparent text-foreground border-default-200" : ""}
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill='#FFFFFF' height="24" viewBox="0 -960 960 960" width="24"><path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z" /></svg>

                                                ) : (

                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" /><path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z" /></svg>
                                                )}
                                            </Button>
                                        </Tooltip>
                                        <Tooltip color="warning" delay={700} showArrow={true} content="Dislike">
                                            <Button onPress={handleDislikeVideo}>
                                                {isDisLikedVideo ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill='#FFFFFF' height="24" viewBox="0 -960 960 960" width="24"><path d="M240-840h400v520L360-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 1.5-15t4.5-15l120-282q9-20 30-34t44-14Zm480 520v-520h160v520H720Z" /></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" /><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm0 12-4.34 4.34L12 14H3v-2l3-7h9v10zm4-12h4v12h-4z" /></svg>
                                                )}

                                            </Button>
                                        </Tooltip>
                                    </ButtonGroup>
                                </li>
                                <li>
                                    <Tooltip color="warning" delay={700} showArrow={true} content="Share this video">

                                        <Button className="flex" variant="bordered">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" /></svg>
                                            Share
                                        </Button>
                                    </Tooltip>
                                </li>
                                {/* <li>
                                    <Tooltip color="warning" delay={700} showArrow={true} content="Download this video">
                                        <Button className="flex" variant="bordered">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" /></svg>
                                            Download
                                        </Button>
                                    </Tooltip>
                                </li> */}
                                <li>
                                    <Tooltip color="warning" delay={700} showArrow={true} content="Add to playlist">
                                        <Button onPress={handleAddToPlaylist} className="flex" variant="bordered">
                                            {isAddedToPlaylist ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>

                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><rect fill="none" height="24" width="24" /></g><g><path d="M14,10H3v2h11V10z M14,6H3v2h11V6z M18,14v-4h-2v4h-4v2h4v4h2v-4h4v-2H18z M3,16h7v-2H3V16z" /></g></svg>
                                            )}
                                            Save
                                        </Button>
                                    </Tooltip>
                                </li>
                                <li>
                                    <Tooltip color="warning" delay={700} showArrow={true} content="Add to watch later">
                                        <Button onPress={handleAddToWatchLater} className="flex" variant="bordered">
                                            {isAddedToWatchLater ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><rect fill="none" height="24" width="24" x="0" /></g><g><g><path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M12.5,7H11v6l5.2,3.2l0.8-1.3l-4.5-2.7V7z" /></g></g></svg>
                                            )}
                                            Watch later
                                        </Button>
                                    </Tooltip>
                                </li>
                                <li>
                                    <svg className='mt-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>

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
                        <div className="mt-5 flex">
                            <h3>90k comments</h3>
                            <Tooltip color="warning" delay={700} showArrow={true} content="Filter to read">
                                <Button className="flex ml-10" variant="bordered">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" /></svg>
                                    Sort
                                </Button>
                            </Tooltip>
                        </div>
                        <div className="flex gap-7 mb-10">
                            <img className="h-10 mt-3 rounded-full" src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="" />
                            <Input type="text" variant="underlined" label="Add a comment" />
                        </div>
                        <div>
                            <div className="flex">
                                <img className="h-10 mr-5 rounded-full" src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="" />
                                <p>
                                    @gaming aura - 3 months ago
                                </p>
                            </div>
                            <p className="ml-16">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum vitae enim architecto error, minus quam, corrupti, quisquam dicta et reiciendis neque molestias vel nesciunt. Illo, tenetur vero. Sint, consequuntur esse?</p>

                        </div>
                    </div>
                </div >
                <div>
                    <div>
                        {allVideos.map((video, index) => (
                            <Tooltip color="warning" delay={700} showArrow={true} content={video.allVideoTitles} key={index}>
                                <div className="ml-10 flex mb-5">
                                    <img style={{ height: "130px", width: "200px" }} className="rounded-md" src={video.allThumbnailUrls} alt="" />
                                    <div className="max-w-56 ml-3">
                                        <h1>{video.allVideoTitles}</h1>
                                        <h2 className="text-gray-500 text-sm">{video.channelName}</h2>
                                        <h3 className="text-gray-500 text-sm">{video.views} views - {timeSinceUpload(video.uploadAt)}</h3>
                                    </div>
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}
export default VideoPage;