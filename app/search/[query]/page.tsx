"use client"
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { auth } from "@/configurations/firebase/config";
import { gql, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";



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

    const [email, setEmail] = useState<string>("");

    const [searQuery, setSearchQuery] = useState<any[]>([]);
    const [user] = useAuthState(auth);

    const query: any = decodeURIComponent(params.query)

    const { loading, error, data } = useQuery(searchQuery, {
        variables: { query: query },
    });


    console.log(searQuery)
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
        if (data) {
            setSearchQuery(data.getSearchQueryDetails);
            console.log(data.getSearchQueryDetails)

        }
    }, [setSearchQuery, data,setEmail,user]);
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="mt-28 ml-72 ">
                <h1 className="mb-10 text-medium">Based on your search</h1>
                {/* Map over searchResults instead of searchQuery */}
                {searQuery.map((video, index) => (
                    <div key={index} className="flex cursor-pointer mb-10">
                        {/* Thumbnail */}
                        <img
                            height={250}
                            width={350}
                            className="rounded-lg"
                            src={video.videoThumbnail}
                            alt=""
                            onClick={() => {
                                handleRedirect(video.videoID, video.courseFees, video.courseID)
                            }}
                        />
                        <div className="ml-6">
                            {/* Video title */}
                            <p className="text-xl">{video.videoTitle}</p>
                            {/* details */}
                            <p className="text-sm text-gray-600 mt-3">
                                {video.videoViews} views - 9 months ago
                            </p>
                            <div className="mt-5 flex">
                                {/* channel info */}
                                <img
                                    className="h-8 rounded-full"
                                    src={video.channelLogo}
                                    alt=""
                                />
                                <p className="font-semibold ml-3">{video.channelName}</p>
                            </div>
                            {/* video description */}
                            <p className="text-sm text-gray-600">{video.videoDescription}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SerachResult;