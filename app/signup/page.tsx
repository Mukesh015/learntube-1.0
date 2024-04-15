"use client"
import { Spinner } from "@nextui-org/spinner";
import { toast, ToastContainer } from "react-toastify";
import LoadingEffect from "@/components/loading";
import React, { useCallback, useState } from "react";
import { auth } from "@/firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

const Signup: React.FC = () => {
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const router = useRouter();
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const isPasswordComplex = async (password: string) => {
        const minLength = 8;
        let uppercaseCount = 0;
        let numericCount = 0;
        let specialCharCount = 0;

        for (let char of password) {
            if (/[A-Z]/.test(char)) {
                uppercaseCount++;
            } else if (/[0-9]/.test(char)) {
                numericCount++;
            } else if (/[^A-Za-z0-9]/.test(char)) {
                specialCharCount++;
            }
        }

        return (
            password.length >= minLength &&
            uppercaseCount > 0 &&
            numericCount > 0 &&
            specialCharCount > 0
        );
    }


    const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const file = fileInput.files && fileInput.files[0];
        if (file) {
            setAvatar(file);
        }
    }
    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email && !password && !userName) {
            toast.error("All fields are required", {
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
        const result = await isPasswordComplex(password)
        if (!result) {
            toast.error("Password must contain at least one uppercase letter, one number and one special character", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return "Password must contain at least one uppercase letter, one number and one special character";
        }
        setShowSpinner(true);
        try {
            const signupFormData = new FormData();
            signupFormData.append('username', userName);
            signupFormData.append('email', email);
            signupFormData.append('password', password);
            if (avatar) {
                signupFormData.append('avatar', avatar);
            }
            const res = await createUserWithEmailAndPassword(email, password);
            setLoading(false);
            if (res) {
                try {
                    const response = await fetch("http://localhost:9063/api/register", {
                        method: "POST",
                        body: signupFormData
                    })
                    console.log(response);
                    if (response.ok) {
                        toast.success("Registration success", {
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
                        setShowSpinner(false);
                        toast.error("Registration failed", {
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
                } catch (error: any) {
                    console.log("Internal server error", error);
                }
            }
        } catch (error: any) {
            setLoading(false);
            toast.error("Registration failed", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error("Internal server error", error);
        }
    }, [email, password, userName, avatar, createUserWithEmailAndPassword, loading]);

    return (
        <>
            <ToastContainer />
            {!loading &&
                <div className="flex">
                    <div className="max-h-full max-w-2xl shadow-xl shadow-gray-400">
                        <div className="p-5 ml-3 flex">
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
                                                Signup
                                            </h1>
                                        </div>
                                        <form onSubmit={handleSubmit} id="signup-form">
                                            <div className="divide-y divide-gray-200">
                                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                                    <div className="relative z-0 w-full mb-5 group">
                                                        <svg
                                                            className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute mt-3"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                                        </svg>
                                                        <input
                                                            autoComplete="username"
                                                            onChange={(e) => setUserName(e.target.value)}
                                                            value={userName}
                                                            type="text"
                                                            name="floating_name"
                                                            id="floating_name"
                                                            className="block py-2.5 px-7 dark:border-gray-600 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-500 font-semibold  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            placeholder=" "
                                                            required
                                                        />
                                                        <label
                                                            htmlFor="floating_name"
                                                            className="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ml-6"
                                                        >
                                                            Username
                                                        </label>
                                                    </div>
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

                                                    <div className="relative z-0 w-full mb-5 group">
                                                        <div className="mx-auto max-w-xs">
                                                            <input
                                                                onChange={handleUploadAvatar}
                                                                id="avatar"
                                                                type="file"
                                                                className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-1 file:px-2 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="link-checkbox"
                                                            type="checkbox"
                                                            value=""
                                                            className="w-4 h-4 text-blue-600  border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 "
                                                            required
                                                        />
                                                        <label
                                                            htmlFor="link-checkbox"
                                                            className="ms-2 text-sm font-medium text-gray-500 "
                                                        >
                                                            I agree with the{" "}
                                                            <a
                                                                href="#"
                                                                className="text-blue-600 dark:text-blue-500 hover:underline"
                                                            >
                                                                terms and conditions
                                                            </a>
                                                            .
                                                        </label>
                                                    </div>
                                                    <div className="relative justify-center ml-20">
                                                        <button
                                                            type="submit"
                                                            className="flex active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70 bg-green-800 text-white font-semibold rounded-2xl px-6 py-1 mt-2"
                                                        >
                                                            Signup
                                                            {showSpinner && (
                                                                <Spinner size="sm" color="warning" className="mt-1 ml-2" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {loading && <LoadingEffect />}

        </>
    )
}

export default Signup;