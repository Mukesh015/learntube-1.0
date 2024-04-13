"use client";
import React, { useCallback, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import NextTopLoader from "nextjs-toploader";
import { Button } from "@nextui-org/button";
import LoadingEffect from "@/components/loading";

interface ActionCodeSettings {
    url: string;
}

const ResetPassword :React.FC = ()=> {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showSpinnerLoginButton, setShowSpinnerLoginButton] = useState<boolean>(false);

    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

    const actionCodeSettings: ActionCodeSettings = {
        url: "http://localhost:3000/login",
    };


    const handleresetpassword = useCallback(async () => {
        setShowSpinnerLoginButton(true)
        const success = await sendPasswordResetEmail(email, actionCodeSettings);
        setTimeout(() => {
            setShowSpinnerLoginButton(false);
        }, 7000);
        console.log(success);
    }, [email, actionCodeSettings, loading]);

    return (
        <>
            <NextTopLoader />
            <div className="flex">
                <div className="max-h-full max-w-2xl shadow-xl shadow-gray-400">
                    <div className="p-5  ml-3 flex">
                        <img
                            className="h-10"
                            src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/05/Mastercard_2019_logo.svg-e1659036851269.png?auto=format&q=60&fit=max&w=930"
                            alt=""
                        />
                        <p className="text-white font-bold text-2xl ml-5 mt-1">
                            LearnTube
                        </p>
                    </div>
                    <p className="text-slate-500 ml-10">
                        It's a free video sharing website that makes it easy to watch online videos. You can even create and upload your own videos to share with others.
                    </p>
                    <div className="m-10">
                        <div className="">
                            <div className="flex">
                                {" "}
                                <img
                                    className=""
                                    src="https://outpost.mappls.com/api/sso/img/suitImg01.svg"
                                    alt=""
                                />
                                <p className="text-gray-300 font-semibold ml-6 text-xl">
                                    Web Application
                                </p>
                            </div>
                            <p className="text-slate-500 ml-14 text-sm">
                                India's Super App for learning, contents, creativity and more.
                            </p>
                        </div>
                        <div className="mt-10">
                            <div className="flex">
                                <img
                                    src="https://outpost.mappls.com/api/sso/img/suitImg02.svg"
                                    alt=""
                                />
                                <p className="text-gray-300 font-semibold ml-3 text-xl">
                                    Workmate
                                </p>
                            </div>
                            <p className="text-slate-500 ml-14 text-sm">
                                Connect with your allies or mates and get in touch with them.
                            </p>
                        </div>
                        <div className="mt-10">
                            <div className="flex">
                                <img
                                    src="https://outpost.mappls.com/api/sso/img/suitImg03.svg"
                                    alt=""
                                />
                                <p className="text-gray-300 font-semibold ml-4 text-xl">
                                    Learn
                                </p>
                            </div>
                            <p className="text-slate-500 ml-14 text-sm">
                                Upskill your power with learntube by visit our contents.
                            </p>
                        </div>
                        <div className="mt-10">
                            <div className="flex">
                                <img
                                    src="https://outpost.mappls.com/api/sso/img/suitImg04.svg"
                                    alt=""
                                />
                                <p className="text-gray-300 font-semibold ml-4 text-xl">Managements</p>
                            </div>
                            <p className="text-slate-500 ml-14 text-sm">
                                Manage your contents with public or private your videos.
                            </p>
                        </div>
                        <div className="mt-10">
                            <div className="flex">
                                <img
                                    src="https://outpost.mappls.com/api/sso/img/suitImg05.svg"
                                    alt=""
                                />
                                <p className="text-gray-300 font-semibold ml-4 text-xl">
                                    Insight
                                </p>
                            </div>
                            <p className="text-slate-500 ml-14 text-sm">
                                Dynamic dashboards to turn your data into actionable insights
                            </p>
                        </div>
                    </div>
                    <div className="mt-24">
                        <p className="text-slate-400 ml-10">
                            © Copyright 2024. CE Info Systems Ltd. All Rights Reserved.
                        </p>
                    </div>
                </div>
                <div className="max-h-full" style={{ marginLeft: "250px" }}>
                    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
                        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                                <div className="max-w-md mx-auto">
                                    <div>
                                        <h1 className="text-2xl font-semibold text-black">
                                            Verify your email
                                        </h1>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                            <div className="relative z-0 w-full mb-5 group">
                                                <svg
                                                    className="w-4 h-4 absolute mt-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                                </svg>
                                                <input
                                                    autoComplete="email"
                                                    type="email"
                                                    name="floating_email"
                                                    id="floating_email"
                                                    className="block py-2.5 px-7 w-full text-sm font-semibold bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                    placeholder=" "
                                                    required
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                />
                                                <label
                                                    htmlFor="floating_email"
                                                    className="ml-6 peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                >
                                                    Email address
                                                </label>
                                                {showSpinnerLoginButton &&
                                                    <p className="max-w-72 text-slate-500 text-small">A link is sent to your email, click on that link to reset your password, link is valid only for 10 mins.</p>
                                                }

                                            </div>
                                            <div className="relative">
                                                {!showSpinnerLoginButton ? (
                                                    <button
                                                        onClick={() => handleresetpassword()}
                                                        className="flex active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70 bg-green-800 text-white font-semibold rounded-2xl px-6 py-1 mt-2"
                                                    >
                                                        Send link
                                                    </button>
                                                ) : (
                                                    <Button
                                                        isLoading
                                                        color="warning"
                                                        spinner={
                                                            <svg
                                                                className="animate-spin h-5 w-5 text-current"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                />
                                                                <path
                                                                    className="opacity-75"
                                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                        }
                                                    >
                                                        Email sent
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;