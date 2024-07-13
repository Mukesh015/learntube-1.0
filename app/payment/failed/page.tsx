"use client"
import React from "react";
import dynamic from 'next/dynamic';
import animationData from "@/public/Animation - 1714987632139.json"
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import { useRouter } from "next/navigation";


const FailedPayment: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <Lottie className="h-[500px]" animationData={animationData} />
            <button
                type="button"
                onClick={() => router.push("/")}
                className="flex active:scale-110 ml-[660px] hover:bg-rose-600 duration-100 will-change-transform relative transition-all disabled:opacity-70 bg-rose-800 text-white font-semibold mt-5 rounded-2xl px-20 py-3"
            >
                Go back
            </button>
        </>
    )
}
export default FailedPayment;