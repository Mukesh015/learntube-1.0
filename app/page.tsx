"use client"

import React, { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { gql, useQuery } from "@apollo/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/configurations/firebase/config";
import { useDarkMode } from "@/components/hooks/theme"
import "react-toastify/dist/ReactToastify.css";
import { Card, Skeleton } from "@nextui-org/react";
import NextTopLoader from "nextjs-toploader";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import animationData from "@/public/Animation - 1714890965505.json"
import animationData2 from "@/public/Animation - 1714927249104.json"
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [homePageDetails, setHomePageDetails] = useState<any[]>([]);
  const [email, setEmail] = useState<string>("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [purchaseItem, setPurchaseItem] = useState<string>("");

  const { loading, error, data, refetch } = useQuery(HOMEPAGE_DETAILS);
  const [user] = useAuthState(auth);


  const handleRedirect = useCallback(async (videoId: string, courseFees: any, courseId: string) => {
    if (courseFees === null) {
      router.push(`/video/${videoId}`);
    }
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
      if (enrollData.isEnrolled === true) {
        router.push(`/video/${videoId}`);
      } else {
        onOpen();
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
      setHomePageDetails(data.getAllVideoUrl);
    }
    if (error) {
      router.push("/error/502")
    }
  }, [data, setHomePageDetails, user, setEmail, loading, error]);

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
        {loading ? (
          <div className="pt-28 pb-10 pl-72 gap-8 grid grid-cols-3">
            {[...Array(12)].map((_, index) => (
              <Card key={index} className={`w-[385px] ${isDarkMode ? "bg-slate-100" : "bg-slate-800"} space-y-7 p-4 h-72" radius="lg`}>
                <Skeleton isLoaded={isLoaded} className="rounded-lg">
                  <div className="h-36 rounded-lg bg-gray-400"></div>
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-gray-500"></div>
                  </Skeleton>
                  <Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-gray-600"></div>
                  </Skeleton>
                  <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-gray-700"></div>
                  </Skeleton>
                </div>
              </Card>
            ))}
          </div>

        ) : (
          <div className="py-14 ml-80 ">
            <div
              id="description-container"
              className="gap-12 grid grid-cols-3 hover"
              style={{ marginTop: "60px" }}
            >
              {homePageDetails.map((video: any, index: number) => (
                <div key={index} id={`video-${index}`} className="video-card">
                  <img
                    className="transition ease-in-out delay-150 cursor-pointer hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                    style={{ height: '250px', width: '350px' }}
                    src={video.allThumbnailUrls}
                    onClick={() => {
                      handleRedirect(video.videoId, video.courseFees, video.courseId)
                    }}
                    alt=""
                  />
                  <div className="flex mt-3 justify-center">
                    <div className="cursor-pointer" onClick={() => router.push(`/channel/${video.channelId}`)}>
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
                      <div className="text-gray-500 flex text-sm">
                        {timeSinceUpload(video.uploadAt)} - {video.views} views
                        {video.courseFees !== null &&
                          <Lottie className="h-5 ml-3" animationData={animationData} />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirm Premium Course Purchase</ModalHeader>
              <ModalBody>
                <div className="flex">
                  <Lottie className="mr-3" animationData={animationData2} />
                  <div>
                    <p className="mb-2 text-cyan-600 font-semibold"> Are you sure you want to purchasing the premium course?</p>
                    <p className="text-slate-500"> Unlock exclusive content, advanced features, and premium support to supercharge your learning experience. By confirming, you agree to the terms and conditions of the purchase.</p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={() => router.push("")}>
                  Purchase
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;