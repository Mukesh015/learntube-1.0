"use client"
import React from "react";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData1 from "@/public/Animation - 1714979030679.json"
import animationData2 from "@/public/Animation - 1714979012618.json"
import animationData3 from "@/public/Animation - 1714979079610.json"
import animationData4 from "@/public/Animation - 1714979114638.json"

const PaymentPage: React.FC = () => {
    return (
        <>
            <div className="flex max-h-screen p-10">
                <div className="max-w-[750px] mr-10">
                    <div className="w-full justify-center items-center">
                        <h1 className="text-3xl font-bold mb-16 mt-12">Payment</h1>
                        <div className="bg-gray-700 w-[650px] rounded-lg">
                            <div className="m-7 p-5">
                                <h1 className="text-xl mb-7 font-semibold">Purchase details</h1>
                                <p className="space-x-40 mb-3">
                                    <span>Course name</span>
                                    <span className="max-w-52">Lorem ipsum dolor</span>
                                </p>
                                <p className="space-x-44 mb-3">
                                    <span>Total video</span>
                                    <span>10</span>
                                </p>
                                <p className="mb-3">
                                    <span>Price</span>
                                    <span className="ml-[220px]">100</span>
                                </p>
                                <p className="space-x-48 mb-3">
                                    <span>Discount</span>
                                    <span>$10</span>
                                </p>
                                <div className="border border-gray-500 border-dotted"></div>
                                <p className="space-x-44 mt-3">
                                    <span>Total price</span>
                                    <span>$100</span>
                                </p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <button
                                type="submit"
                                className="flex active:scale-110 hover:bg-rose-800 duration-300 will-change-transform relative transition-all disabled:opacity-70 bg-rose-500 text-white font-semibold rounded-2xl px-[265px] py-3 mt-2"
                            >
                                Make payment
                            </button>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex">
                        <Lottie className="h-40" animationData={animationData1} />
                        <Lottie className="h-40" animationData={animationData2} />
                        <Lottie className="h-40" animationData={animationData3} />
                    </div>
                    <Lottie className="h-[400px] w-[600px]" animationData={animationData4} />
                </div>
            </div>
        </>
    )
}

export default PaymentPage;