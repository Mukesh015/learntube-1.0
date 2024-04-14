"use client";
import React, { useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import LoadingEffect from "@/components/loading";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";
import {
    useSignInWithGoogle,
    useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [googleLoading, setGoogleLoading] = useState<boolean>(false);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [showSpinnerLoginButton, setShowSpinnerLoginButton] = useState<boolean>(false);

    const router = useRouter();
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    const handleLogin = useCallback(
        async (provider: string) => {
            try {
                if (provider === "google") {
                    setGoogleLoading(true);
                    const res = await signInWithGoogle();
                    setGoogleLoading(false);
                    if (res) {
                        toast.success("Login success", {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setLoading(true);
                        setTimeout(() => {
                            router.push("/");
                        }, 2000);
                    }
                    else {
                        toast.error("Something went wrong, please try again", {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                } else if (provider === "email") {
                    if (!email && !password) {
                        toast.warning("All fields are required", {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        return "All fields are required";
                    }
                    setShowSpinnerLoginButton(true);
                    const res = await signInWithEmailAndPassword(email, password);
                    setShowSpinnerLoginButton(false);
                    if (res) {
                        toast.success("Login success", {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setLoading(true);
                        setTimeout(() => {
                            router.push("/");
                        }, 2000);
                    } else {
                        toast.error("Invalid credentials", {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
            } catch (error: any) {
                toast.error("Server down login failed", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setLoading(false);
                console.error("Internal server error", error);
            }
        },
        [email, password, signInWithGoogle, signInWithEmailAndPassword, router]
    );

    return (
        <>
            <ToastContainer />
            {!loading && (
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
                        <div className="min-h-screen py-3 flex flex-col justify-center sm:py-12">
                            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                                <div className="relative px-4 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                                    <div className="max-w-md mx-auto">
                                        <div>
                                            <h1 className="text-2xl font-bold text-black">
                                                Login
                                            </h1>
                                            <h2 className="text-gray-500 mt-2 text-sm flex">
                                                Don't have an account?
                                                <p
                                                    className="text-blue-500 hover:text-blue-900 font-semibold cursor-pointer"
                                                >
                                                    {" "}
                                                    <Link href={"/signup"}> Create Account</Link>
                                                </p>
                                            </h2>
                                        </div>
                                        <div className="divide-y">
                                            <div className="py-3 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
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
                                                </div>
                                                <div className="relative z-0 w-full mb-5 group">
                                                    <svg className="absolute mt-3" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#949995"><g fill="none"><path d="M0 0h24v24H0V0z" /><path d="M0 0h24v24H0V0z" opacity=".87" /></g><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" /></svg>

                                                    <input
                                                        autoComplete="current-password"
                                                        type="password"
                                                        name="floating_password"
                                                        id="floating_password"
                                                        className="block py-2.5 px-7 dark:border-gray-600 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2  appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        required
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        value={password}
                                                    />
                                                    <label
                                                        htmlFor="floating_password"
                                                        className="ml-6 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                    >
                                                        Password
                                                    </label>
                                                </div>

                                                <div className="flex">
                                                    <p
                                                        className="cursor-pointer text-sm mr-16 hover:text-blue-900 font-semibold text-blue-500"
                                                    >
                                                        <Link href={"/resetpassword"}>
                                                            Forgot password
                                                        </Link>
                                                    </p>

                                                    <p
                                                        className="cursor-pointer hover:text-blue-900 text-sm font-semibold text-blue-500"
                                                    >
                                                        <Link href={"/link-login"}>Login via link</Link>
                                                    </p>
                                                </div>
                                                <div className="relative text-center">
                                                    {!showSpinnerLoginButton ? (
                                                        <Button onClick={() => handleLogin("email")}
                                                            className="text-white px-10 font-semibold" color="success">
                                                            Login
                                                        </Button>
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
                                                            Loading
                                                        </Button>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5 text-slate-500 flex flex-row items-center">
                                        <div className="flex-grow border-gray-300 border"></div>
                                        <div className="ml-10 mr-10 text-slate-400">or</div>
                                        <div className="flex-grow border-gray-300 border"></div>
                                    </div>
                                    <div className="w-full flex">
                                        <button
                                            onClick={() => handleLogin("google")}
                                            type="button"
                                            className="text-white w-full active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70  bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 me-2 mb-2"
                                        >
                                            <svg
                                                className="mr-10"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 48 48"
                                                width="24px"
                                                height="24px"
                                            >
                                                <path
                                                    fill="#FFC107"
                                                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                                />
                                                <path
                                                    fill="#FF3D00"
                                                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                                />
                                                <path
                                                    fill="#4CAF50"
                                                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                                />
                                                <path
                                                    fill="#1976D2"
                                                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                                />
                                            </svg>
                                            Sign in with Google
                                            {googleLoading &&
                                                <Spinner className="ml-3" color="warning" size="sm" />
                                            }

                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {loading && (
                <LoadingEffect />
            )}
        </>
    );
}

export default Login;