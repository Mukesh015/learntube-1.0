"use client"
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Button } from "@nextui-org/button";
import { Tabs, Tab } from "@nextui-org/react";
import { useDarkMode } from "@/components/hooks/theme"

const ChannelPage: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    const [isSubsCribed, setIsSubsribed] = useState<boolean>(false);

    return (
        <>
            <Navbar query={""} />
            <Sidebar />
            <div style={{ maxWidth: "1400px", paddingLeft: "360px", paddingTop: "100px" }}>
                <div>
                    <img style={{ width: "1400px" }} className="h-40 rounded-xl" src="https://img.freepik.com/premium-vector/futuristic-light-red-blue-gaming-header-social-media-banner-template_136469-1321.jpg" alt="" />
                    <div className="flex mt-10">
                        <img className="rounded-full h-40" src="https://cdn.dribbble.com/userupload/9977994/file/original-d595ce2641dd2d091f5f4aee0a711172.jpeg" alt="" />
                        <div className="ml-10">
                            <h1 className="text-3xl font-bold mb-3">Gaming Fury</h1>
                            <p className="mb-2 space-x-3 text-sm">
                                <span>@Gaming Fury</span>
                                <span>300k subscribers</span>
                                <span>200 videos</span>
                            </p>
                            <p className="text-sm mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis exercitationem quo soluta, maxime aspernatur beatae saepe ipsa iure dolor praesentium!</p>
                            <p className="text-sm mb-3">gamingfury.com and 3 more links</p>
                            <Button
                                className={isSubsCribed ? "bg-transparent text-black border-default-200" : ""}
                                color="primary"
                                radius="full"
                                size="md"
                                variant={isSubsCribed ? "bordered" : "solid"}
                            >
                                {isSubsCribed ? "Unsubscribe" : "Subscribe"}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap gap-7 mt-10">
                            <Tabs variant="underlined" aria-label="Tabs variants">
                                <Tab key="Home" title="Home" />
                                <Tab key="Courses" title="Courses" />
                                <Tab key="Shorts" title="Shorts" />
                                <Tab key="Community" title="Community" />
                                <Tab
                                    key="Search"
                                    title={
                                        <div className="flex items-center space-x-2">

                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={isDarkMode ? '#c7b7ba' : '#FFFFFF'} ><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                                        </div>
                                    }
                                />
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChannelPage;