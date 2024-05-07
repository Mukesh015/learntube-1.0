"use client"
import React from "react";
import dynamic from 'next/dynamic';
import animationData from "@/public/Animation - 1714987632139.json"
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const FailedPayment: React.FC = () => {
    return (
        <>
            <Lottie className="h-screen" animationData={animationData} />

        </>
    )
}
export default FailedPayment;