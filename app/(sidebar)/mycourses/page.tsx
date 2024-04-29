"use client"
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Tooltip } from "@nextui-org/react";


const mycourses: React.FC = () => {

    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleShowDropdown = () => {
        setShowDropdown(!showDropdown);
    }
    return (
        <>
            <Navbar />
            <Sidebar />
            <nav className="mt-24 mr-20">
                <ul className="flex flex-row-reverse gap-10">
                    <Tooltip color="warning" delay={700} showArrow={true} content="Fiter platlist">
                        <li className="flex ext-blue-500 text-blue-500 font-semibold hover:bg-blue-200 px-2 rounded-2xl cursor-default py-1">
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#2e4bc9"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" /></svg>
                            Filter
                        </li>
                    </Tooltip>
                    <Tooltip color="warning" delay={700} showArrow={true} content="Manage your playlist">
                        <li className="text-blue-500 font-semibold hover:bg-blue-200 px-2 rounded-2xl cursor-default py-1">
                            Manage
                        </li>
                    </Tooltip>
                    <li className="text-3xl font-bold text-amber-600" style={{ marginRight: "560px" }} >
                        Your purchesed playlist
                    </li>
                </ul>
            </nav>
            <div className="ml-80 ">
                <Tooltip color="warning" delay={700} showArrow={true} content="Click to show playlist">
                    <div
                        onClick={handleShowDropdown}
                        id="description-container"
                        className="cursor-pointer"
                        style={{ marginTop: "40px" }}
                    >
                        <div>
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
                            {showDropdown &&
                                <Tooltip color="warning" delay={700} showArrow={true} content="Click to play">
                                    <div className="flex ml-20 mb-10 transition scale-75 skew-y-3 md:transform-none translate-y-6 duration-700 ease-in-out delay-700">
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
                                </Tooltip>
                            }
                        </div>
                    </div>
                </Tooltip>
            </div>
        </>
    )
}

export default mycourses;