"use client"

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { gql, useQuery } from "@apollo/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/configurations/firebase/config";


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
  const [homePageDetails, setHomePageDetails] = useState<any[]>([]);
  const [email, setEmail] = useState<string>("");

  const { loading, error, data } = useQuery(HOMEPAGE_DETAILS);
  const [user] = useAuthState(auth);


  const handleRedirect = async (videoId: any, courseFees: any, courseId: any) => {
    console.log(courseId)
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


    if (data) {
      setHomePageDetails(data.getAllVideoUrl);
    }
  }, [data, setHomePageDetails, user, setEmail]);

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
      <div>
        <Navbar />
        <Sidebar />
        <div className=" mt-28 ml-80 ">
          <div
            id="description-container"
            className="gap-12 grid grid-cols-3 hover"
            style={{ marginTop: "60px" }}
          >
            {homePageDetails.map((video: any, index: number) => (
              <div key={index} id={`video-${index}`} className="video-card">
                <div className="relative">
                  <img
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                    style={{ height: '250px', width: '350px', filter: video.courseFees !== null ? 'blur(2px)' : 'none' }}
                    src={video.allThumbnailUrls}
                    onClick={() => {
                      handleRedirect(video.videoId, video.courseFees, video.courseId)
                    }}
                    alt=""
                  />
                  {video.courseFees !== null && (
                    <div className="absolute top-0 left-0 m-2 bg-white bg-opacity-75 rounded-md p-1">
                      <p className="text-black font-semibold">Price: ${video.courseFees}</p>
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
                  <div className="ml-3">
                    <h1>{video.allVideoTitles}</h1>
                    <p className="text-gray-500">
                      {timeSinceUpload(video.uploadAt)}
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
