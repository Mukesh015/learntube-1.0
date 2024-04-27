"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { auth } from "@/configurations/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { gql, useQuery } from "@apollo/client";


const watchLaterDetails=gql`

query likedVideos($email: String) {
    getLikedVideos(email: $email) {
      videoId
      videoTitle
      channelLogo
      videoPublishedAt
      videoViews
      videoThumbnail
    }
  }
`
const Likedvideo: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [likedVideos, setLikedVideo] = useState<any[]>([]);

    const [user] = useAuthState(auth);


    const { loading, error, data } = useQuery(watchLaterDetails, {
        variables: { email: email },
    });

    

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
        }
        if(data && email ){
            setLikedVideo(data.getLikedVideos);
        }

    },[ setEmail,user,setLikedVideo]);

    
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="ml-80 mt-28">
                <div
                    id="description-container"
                    className=""
                    style={{ marginTop: "40px" }}
                >
                    <p className="text-3xl font-bold text-amber-600 mb-7">Liked videos</p>
                    <div id="video-content" className="flex mb-10">
                        {/* video content here*/}
                        <img
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                            height={200}
                            width={200}
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                            alt=""
                        />
                        <div className="flex mt-10 ml-5 justify-center mr-10">
                            <div>
                                {/* Profile picture here */}
                                <img height={30} width={30} className="rounded-full m-1" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                            </div>
                            <div className="ml-3">
                                <h1 className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni facere voluptate, eos blanditiis aliquam, dolor beatae neque odit dolore repellendus unde sequi eveniet maxime quas ad omnis. Dignissimos, saepe nulla.</h1> {/* video title here*/}
                                <p className="text-gray-500">
                                    20k views - 4 hours ago {/*Content details/analitics*/}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div id="video-content" className="flex mb-10">
                        {/* video content here*/}
                        <img
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                            height={200}
                            width={200}
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                            alt=""
                        />
                        <div className="flex mt-10 ml-5 justify-center mr-10">
                            <div>
                                {/* Profile picture here */}
                                <img height={30} width={30} className="rounded-full m-1" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                            </div>
                            <div className="ml-3">
                                <h1 className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni facere voluptate, eos blanditiis aliquam, dolor beatae neque odit dolore repellendus unde sequi eveniet maxime quas ad omnis. Dignissimos, saepe nulla.</h1> {/* video title here*/}
                                <p className="text-gray-500">
                                    20k views - 4 hours ago {/*Content details/analitics*/}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div id="video-content" className="flex mb-10">
                        {/* video content here*/}
                        <img
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                            height={200}
                            width={200}
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                            alt=""
                        />
                        <div className="flex mt-10 ml-5 justify-center mr-10">
                            <div>
                                {/* Profile picture here */}
                                <img height={30} width={30} className="rounded-full m-1" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                            </div>
                            <div className="ml-3">
                                <h1 className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni facere voluptate, eos blanditiis aliquam, dolor beatae neque odit dolore repellendus unde sequi eveniet maxime quas ad omnis. Dignissimos, saepe nulla.</h1> {/* video title here*/}
                                <p className="text-gray-500">
                                    20k views - 4 hours ago {/*Content details/analitics*/}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div id="video-content" className="flex mb-10">
                        {/* video content here*/}
                        <img
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                            height={200}
                            width={200}
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                            alt=""
                        />
                        <div className="flex mt-10 ml-5 justify-center mr-10">
                            <div>
                                {/* Profile picture here */}
                                <img height={30} width={30} className="rounded-full m-1" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                            </div>
                            <div className="ml-3">
                                <h1 className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni facere voluptate, eos blanditiis aliquam, dolor beatae neque odit dolore repellendus unde sequi eveniet maxime quas ad omnis. Dignissimos, saepe nulla.</h1> {/* video title here*/}
                                <p className="text-gray-500">
                                    20k views - 4 hours ago {/*Content details/analitics*/}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div id="video-content" className="flex mb-10">
                        {/* video content here*/}
                        <img
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                            height={200}
                            width={200}
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                            alt=""
                        />
                        <div className="flex mt-10 ml-5 justify-center mr-10">
                            <div>
                                {/* Profile picture here */}
                                <img height={30} width={30} className="rounded-full m-1" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                            </div>
                            <div className="ml-3">
                                <h1 className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni facere voluptate, eos blanditiis aliquam, dolor beatae neque odit dolore repellendus unde sequi eveniet maxime quas ad omnis. Dignissimos, saepe nulla.</h1> {/* video title here*/}
                                <p className="text-gray-500">
                                    20k views - 4 hours ago {/*Content details/analitics*/}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div id="video-content" className="flex mb-10">
                        {/* video content here*/}
                        <img
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                            height={200}
                            width={200}
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                            alt=""
                        />
                        <div className="flex mt-10 ml-5 justify-center mr-10">
                            <div>
                                {/* Profile picture here */}
                                <img height={30} width={30} className="rounded-full m-1" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                            </div>
                            <div className="ml-3">
                                <h1 className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni facere voluptate, eos blanditiis aliquam, dolor beatae neque odit dolore repellendus unde sequi eveniet maxime quas ad omnis. Dignissimos, saepe nulla.</h1> {/* video title here*/}
                                <p className="text-gray-500">
                                    20k views - 4 hours ago {/*Content details/analitics*/}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Likedvideo;