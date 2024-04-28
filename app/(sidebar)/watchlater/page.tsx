"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Switch, cn } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { auth } from "@/configurations/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { gql, useQuery } from "@apollo/client";

const watchLaterDetails=gql`

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

    

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
        }
        if(data && email ){
            setWatchLater(data.getWatchLater);
        }

    },[ setEmail,user,setWatchLater]);

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

export default WatchLater;