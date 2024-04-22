"use client"

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { gql, useQuery } from "@apollo/client";


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
    }
  }
`;

const Home: React.FC = () => {
  const [homePageDetails, setHomePageDetails] = useState<any[]>([]);

  const { loading, error, data } = useQuery(HOMEPAGE_DETAILS);

  useEffect(() => {
    if (data) {
      setHomePageDetails(data.getAllVideoUrl);
    }
  }, [data]);

  const timeSinceUpload = (uploadAt: string) => {
    const uploadDate = new Date(uploadAt);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - uploadDate.getTime());
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    return `${days} days ago`;
  };

  return (
    <>
      <div>
        <Navbar />
        <Sidebar />
        <div className="mt-28 ml-80 ">
          <div
            id="description-container"
            className="gap-12 grid grid-cols-3 hover"
            style={{ marginTop: "60px" }}
          >
            {homePageDetails.map((video: any, index: number) => (
              <div key={index} id={`video-${index}`} className="video-card">
                <img
                  className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                  style={{ height: '250px', width: '350px' }}
                  src={video.allThumbnailUrls}
                  onClick={() => {
                    const url = `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/video/${video.videoId}`;
                    window.location.href = url;
                  }}
                  alt=""
                />
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
