"use client"

import React, { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { gql, useQuery } from "@apollo/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/configurations/firebase/config";
import { useDarkMode } from "@/components/hooks/theme"
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
import { useRouter } from "next/navigation";


const HOMEPAGE_DETAILS = gql`
  query GetAllVideoUrl {
    getAllVideoUrl {
      channelLogo
      allEmail
      allThumbnailUrls
      allVideoTitles
      allVideoUrls
      uploadAt
      videoId
      views
      courseFees
      courseId
    }
  }
`;

const Home: React.FC = () => {

  const { isDarkMode } = useDarkMode();
  const router = useRouter();

  const [homePageDetails, setHomePageDetails] = useState<any[]>([]);
  const [email, setEmail] = useState<string>("");
  const [notificationToken, setNotificationToken] = useState<string>("");

  const { loading, error, data,refetch } = useQuery(HOMEPAGE_DETAILS);
  const [user] = useAuthState(auth);


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
    if (!loading&&!error) {
      console.log("apollo gar marache")
      setHomePageDetails(data.getAllVideoUrl);
    }
  }, [data, setHomePageDetails, user, setEmail,loading, error]);

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

  return (
    <>
      <NextTopLoader />
      <div className={`${isDarkMode ? "bg-white" : "bg-black"}`}>
        <Navbar query={""} />
        <Sidebar />
        <div className="py-14 ml-80 ">
          <div
            id="description-container"
            className="gap-12 grid grid-cols-3 hover"
            style={{ marginTop: "60px" }}
          >
            {homePageDetails.map((video: any, index: number) => (
              <div key={index} id={`video-${index}`} className="video-card">
                <div className=""> {/*relative*/}
                  <img
                    className="transition ease-in-out delay-150 cursor-pointer hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                    style={{ height: '250px', width: '350px' }}
                    src={video.allThumbnailUrls}
                    onClick={() => {
                      handleRedirect(video.videoId, video.courseFees, video.courseId)
                    }}
                    alt=""
                  />
                  {video.courseFees !== null && (
                    <div className="absolute top-0 left-0 m-1 bg-opacity-100 rounded-md p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#fcba03" height="20" viewBox="0 -960 960 960" width="20"><path d="m185-65 80-331L3-620l343-29 134-313 134 314 343 28-262 224 80 331-295-176L185-65Z" /></svg>
                    </div>
                  )}
                </div>
                <div className="flex mt-3 justify-center">
                  <div>
                    <img
                      height={30}
                      width={30}
                      className="rounded-full m-1"
                      src={video.channelLogo}
                      alt=""
                    />
                  </div>
                  <div className={`ml-3 text-sm font-semibold ${isDarkMode ? "text-black" : ""} cursor-default`}>
                    <h1>{video.allVideoTitles}</h1>
                    <p className="text-gray-500 text-sm">
                      {timeSinceUpload(video.uploadAt)} - {video.views} views
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;