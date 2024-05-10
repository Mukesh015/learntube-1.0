"use client"
import NextTopLoader from "nextjs-toploader";
import React from "react";
import { useRouter } from "next/navigation";

const ServerError: React.FC = () => {
    const router = useRouter();
    return (
        <>
            <NextTopLoader />
            <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full bg-black">
                <div className="text-center">
                    <div className="inline-flex rounded-full bg-red-100 p-4">
                        <div className="rounded-full stroke-red-600 bg-red-200 p-4">
                            <svg className="w-16 h-16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M17 16L22 21M22 16L17 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                    </div>
                    <p className="text-gray-300 mt-5 lg:text-lg">Oops something went wrong. Try to refresh this page or <br /> feel free to contact us if the problem persists.</p>
                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="flex active:scale-110 duration-100 will-change-transform relative transition-all disabled:opacity-70 bg-rose-800 text-white font-semibold mt-5 rounded-2xl px-20 py-3 ml-32"
                    >
                        Go back
                    </button>
                </div>
            </div>
        </>
    )
}

export default ServerError;