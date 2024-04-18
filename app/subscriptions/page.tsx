import React from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const Subscription: React.FC = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="mt-28 ml-80 ">
                <div
                    id="description-container"
                    className="gap-12 grid grid-cols-3 hover"
                    style={{ marginTop: "60px" }}
                >
                    <div id="video-content">
                        {/* video content here*/}
                        <img
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                            height={350}
                            width={350}
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                            alt=""
                        />
                        <div className="flex mt-3 justify-center">
                            <div>
                                {/* Profile picture here */}
                                <img height={30} width={30} className="rounded-full m-1" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                            </div>
                            <div className="ml-3">
                                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, soluta!</h1> {/* video title here*/}
                                <p className="text-gray-500">
                                    20k views - 4 hours ago {/*Content details/analitics*/}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div id="video-content">
                        {/* video content here*/}
                        <img
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                            height={350}
                            width={350}
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                            alt=""
                        />
                        <div className="flex mt-3 justify-center">
                            <div>
                                {/* Profile picture here */}
                                <img height={30} width={30} className="rounded-full m-1" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                            </div>
                            <div className="ml-3">
                                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, soluta!</h1> {/* video title here*/}
                                <p className="text-gray-500">
                                    20k views - 4 hours ago {/*Content details/analitics*/}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div id="video-content">
                        {/* video content here*/}
                        <img
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                            height={350}
                            width={350}
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                            alt=""
                        />
                        <div className="flex mt-3 justify-center">
                            <div>
                                {/* Profile picture here */}
                                <img height={30} width={30} className="rounded-full m-1" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                            </div>
                            <div className="ml-3">
                                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, soluta!</h1> {/* video title here*/}
                                <p className="text-gray-500">
                                    20k views - 4 hours ago {/*Content details/analitics*/}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div id="video-content">
                        {/* video content here*/}
                        <img
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md"
                            height={350}
                            width={350}
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                            alt=""
                        />
                        <div className="flex mt-3 justify-center">
                            <div>
                                {/* Profile picture here */}
                                <img height={30} width={30} className="rounded-full m-1" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                            </div>
                            <div className="ml-3">
                                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, soluta!</h1> {/* video title here*/}
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

export default Subscription;