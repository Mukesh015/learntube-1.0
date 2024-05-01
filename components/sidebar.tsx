"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/configurations/firebase/config";


const subscribedchannel = gql`

query subscribedChannel($email: String) {
    getSubscribedChannels(email: $email) {
        channelLogo
        channelId
        channelName
      }
  }

`
const Sidebar: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [subscribedChannel, setSubscribedChannel] = useState<any[]>([]);
    const [showSubscriptions, setShowSubscriptions] = useState<boolean>(false)
    const [toggleSVG, setToggleSVG] = useState<boolean>(false)

    const [user] = useAuthState(auth);

    const router = useRouter();

    const { loading, error, data } = useQuery(subscribedchannel, {
        variables: { email: email },
    });

    const handleShowSubscriptions = () => {
        setShowSubscriptions(!showSubscriptions);
        setToggleSVG(!toggleSVG);
    }

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
        }
        if (data && email) {
            setSubscribedChannel(data.getSubscribedChannels);
            console.table(data.getSubscribedChannels)
        }
    }, [setEmail, data, user, setSubscribedChannel]);
    return (
        <div
            id="docs-sidebar"
            className="fixed top-20 overflow-auto transition-opacity ease-in duration-700 hs-overlay cursor-pointer [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full  z-[60] w-64 shadow-md shadow-gray-700  pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-300 [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:rounded-full"
        >
            <nav
                className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
                data-hs-accordion-always-open
            >
                <ul className="space-y-1.5">
                    <li className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150">
                        <button
                            onClick={() => router.push("/")}
                            type="button"
                            className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-medium font-semibold rounded-lg hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                            </svg>
                            Home
                        </button>
                    </li>

                    <li
                        className="hs-accordion transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                        id="users-accordion"
                    >
                        <button
                            onClick={() => router.push("/subscriptions")}
                            type="button"
                            className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-medium font-semibold rounded-lg hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H4v-8h16v8zm-10-7.27v6.53L16 16z" />
                            </svg>
                            Subscriptions
                        </button>
                    </li>
                    <li className="border border-slate-700 m-3"></li>
                </ul>
                <ul className="space-y-1.5 mt-3">
                    <li
                        className="hs-accordion transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                        id="users-accordion"
                    >
                        <button
                            onClick={() => router.push("/creator/dashboard")}
                            type="button"
                            className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-medium font-semibold  rounded-lg hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                enableBackground="new 0 0 24 24"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <g>
                                    <rect fill="none" height="24" width="24" />
                                </g>
                                <g>
                                    <g>
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.35 18.5C8.66 17.56 10.26 17 12 17s3.34.56 4.65 1.5c-1.31.94-2.91 1.5-4.65 1.5s-3.34-.56-4.65-1.5zm10.79-1.38C16.45 15.8 14.32 15 12 15s-4.45.8-6.14 2.12C4.7 15.73 4 13.95 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.95-.7 3.73-1.86 5.12z" />
                                        <path d="M12 6c-1.93 0-3.5 1.57-3.5 3.5S10.07 13 12 13s3.5-1.57 3.5-3.5S13.93 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" />
                                    </g>
                                </g>
                            </svg>
                            Your chanel
                            <svg
                                className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m18 15-6-6-6 6" />
                            </svg>
                        </button>
                    </li>
                    <li
                        className="hs-accordion transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                        id="users-accordion"
                    >
                        <button
                            onClick={() => router.push("/playlists")}
                            type="button"
                            className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-medium font-semibold rounded-lg hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                enableBackground="new 0 0 24 24"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <g>
                                    <rect fill="none" height="24" width="24" />
                                </g>
                                <g>
                                    <g>
                                        <rect height="2" width="11" x="3" y="10" />
                                        <rect height="2" width="11" x="3" y="6" />
                                        <rect height="2" width="7" x="3" y="14" />
                                        <polygon points="16,13 16,21 22,17" />
                                    </g>
                                </g>
                            </svg>
                            Playlists
                            <svg
                                className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m18 15-6-6-6 6" />
                            </svg>
                        </button>
                    </li>

                    <li
                        className="hs-accordion transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                        id="projects-accordion"
                    >
                        <button
                            onClick={() => router.push("/history")}
                            type="button"
                            className=" hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-medium font-semibold rounded-lg hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z" />
                            </svg>
                            History
                            <svg
                                className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m18 15-6-6-6 6" />
                            </svg>
                        </button>
                    </li>

                    <li className="hs-accordion" id="account-accordion">
                        <button
                            onClick={() => router.push("/mycourses")}
                            type="button"
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-medium font-semibold rounded-lg hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM12 5.5v9l6-4.5z" />
                            </svg>
                            Your courses
                        </button>
                    </li>
                    <li className="hs-accordion" id="account-accordion">
                        <button
                            onClick={() => router.push("/watchlater")}
                            type="button"
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-medium font-semibold rounded-lg hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                enableBackground="new 0 0 24 24"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <g>
                                    <rect fill="none" height="24" width="24" x="0" />
                                </g>
                                <g>
                                    <g>
                                        <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M12.5,7H11v6l5.2,3.2l0.8-1.3l-4.5-2.7V7z" />
                                    </g>
                                </g>
                            </svg>
                            Watch later
                        </button>
                    </li>
                    <li className="hs-accordion" id="account-accordion">
                        <button
                            onClick={() => router.push("/likedvideos")}
                            type="button"
                            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-medium font-semibold rounded-lg hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
                                <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z" />
                            </svg>
                            Liked videos
                        </button>
                    </li>
                    <li className="border border-slate-700 m-3"></li>
                </ul>
                <ul id="Subscriptions" className="mt-4 space-y-1.5">
                    <li onClick={handleShowSubscriptions} className="py-2 px-2.5 rounded-lg flex ml-3 font-semibold pb-2 hover:bg-gray-700">
                        My Subscriptions
                        {toggleSVG ? (

                            <svg
                                className="ml-2 rounded-full"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M7 10l5 5 5-5H7z" />
                            </svg>

                        ) : (
                            <svg className="ml-2 rounded-full" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M24 0v24H0V0h24z" fill="none" opacity=".87" /><path d="M14 7l-5 5 5 5V7z" /></svg>
                        )}

                    </li>
                    {showSubscriptions &&
                        <div>
                            {subscribedChannel.map((item, index) => (
                                <li key={index} className="py-2 px-2.5 hover:scale-110 rounded-lg flex ml-3 font-semibold pb-2 transition ease-in-out delay-150 hover:-translate-y-1 duration-150 hs-accordion hover:bg-gray-700">
                                    <img className="h-8 rounded-full mr-2" src={item.channelLogo} alt="" />
                                    <p className="text-sm text-blue-500">{item.channelId}</p>
                                </li>
                            ))}
                        </div>
                    }
                    <li className="border border-slate-700 m-3"></li>
                </ul>
                <ul className="mt-4 space-y-1.5">
                    <li
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 hs-accordion"
                        id="projects-accordion"
                    >
                        <button
                            type="button"
                            onClick={() => router.push("/settings")}
                            className=" hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-medium font-semibold rounded-lg hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                            </svg>
                            Settings
                        </button>
                    </li>
                    <li
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 hs-accordion"
                        id="projects-accordion"
                    >
                        <button
                            onClick={() => router.push("/feedback")}
                            type="button"
                            className=" hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-medium font-semibold rounded-lg hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zm-9-4h2v2h-2zm0-6h2v4h-2z" />
                            </svg>
                            Send feedback
                            <svg
                                className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m18 15-6-6-6 6" />
                            </svg>
                        </button>
                    </li>
                    <li
                        className="hs-accordion transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                        id="projects-accordion"
                    >
                        <button
                            onClick={() => router.push("/contact")}
                            type="button"
                            className=" hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-medium font-semibold rounded-lg hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM4 0h16v2H4zm0 22h16v2H4zm8-10c1.38 0 2.5-1.12 2.5-2.5S13.38 7 12 7 9.5 8.12 9.5 9.5 10.62 12 12 12zm0-3.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 7.49C17 13.9 13.69 13 12 13s-5 .9-5 2.99V17h10v-1.01zm-8.19-.49c.61-.52 2.03-1 3.19-1 1.17 0 2.59.48 3.2 1H8.81z" />
                            </svg>
                            Contact us
                        </button>
                    </li>
                    <li
                        className="hs-accordion transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
                        id="projects-accordion"
                    >
                        <button
                            onClick={() => router.push("/about")}
                            type="button"
                            className=" hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-medium font-semibold rounded-lg hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                            About
                        </button>
                    </li>
                </ul>
            </nav>
        </div >
    )
}

export default Sidebar;