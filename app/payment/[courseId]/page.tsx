"use client"
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData1 from "@/public/Animation - 1714979030679.json"
import animationData2 from "@/public/Animation - 1714979012618.json"
import animationData3 from "@/public/Animation - 1714979079610.json"
import animationData4 from "@/public/Animation - 1714979114638.json"
import animationData5 from "@/public/Animation - 1715323623543.json"
import { gql, useQuery } from "@apollo/client";
import { loadStripe } from '@stripe/stripe-js'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/configurations/firebase/config";


const PAYMENT_DETAILS = gql`

query PaymentQuery($courseId: String) {
    getPaymentDetails(courseId: $courseId) {
      courseId
      courseDescription
      courseFees
      courseName
      courseThumbnail
      email
      totalVideo
    }
  }

`
interface Props {
    params: {
        courseId: string;
    };
}

const PaymentPage: React.FC<Props> = ({ params }) => {

    const [courseName, setCourseName] = useState<string>("");
    const [courseFees, setCourseFees] = useState<number>(0);
    const [courseDiscount, setCourseDiscount] = useState<number>(10);
    const [paymentDetails, setPaymentDetails] = useState<any[]>([]);
    const [userName, setuserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const courseId: any = decodeURIComponent(params.courseId)
    const [user] = useAuthState(auth);
    const [input, setInput] = useState({ customDonation: '' });
    const { loading, error, data } = useQuery(PAYMENT_DETAILS, {
        variables: { courseId: courseId },
    });

    const makePayment = useCallback(async () => {
        try {

            const stripe = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)
            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/pay/makepayment`, {
                method: "post",

                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    courseDetails: paymentDetails,userName,email
                })

            });
            const session = await response.json();
            console.log(session)
            if (session) {
                await stripe?.redirectToCheckout({
                    sessionId: session.session.id
                });

            } else {

                console.error("Error creating Stripe Checkout Session");
            }
        } catch (error) {
            console.error("Error making payment:", error);
        }
    }, [paymentDetails,userName,email,])


    useEffect(() => {
        if(user){
            setEmail(user.email || "");
            setuserName(user.displayName || "");
            console.log("User")
        }
        if (data) {
            console.log(data)
            setCourseName(data.getPaymentDetails.courseName)
            setCourseFees(data.getPaymentDetails.courseFees)
            setPaymentDetails(data.getPaymentDetails)
        }
    }, [setPaymentDetails, data, setCourseFees, setCourseName,user,setEmail,setuserName])


    return (
        <>
            <div className="flex max-h-screen p-10">

                <div className="max-w-[750px] mr-10">
                    <div className="w-full justify-center items-center">
                        <h1 className="text-3xl font-bold mb-16 mt-12">Payment</h1>
                        <div className={`bg-[#55021a] ${loading ? "min-h-[300px]" : ""} w-[650px] rounded-lg`}>
                            {loading ? (
                                <Lottie className="h-20" animationData={animationData5} />
                            ) : (
                                <div className="m-7 p-5">
                                    <h1 className="text-xl mb-7 font-semibold">Purchase details</h1>
                                    <p className="space-x-40 mb-3">
                                        <span>Course name</span>
                                        <span className="max-w-52">{courseName}</span>
                                    </p>
                                    <p className="space-x-44 mb-3">
                                        <span>Total video</span>
                                        <span>10(HC)</span>
                                    </p>
                                    <p className="mb-3">
                                        <span>Price</span>
                                        <span className="ml-[220px]">{courseFees}</span>
                                    </p>
                                    <p className="space-x-48 mb-3">
                                        <span>Discount</span>
                                        <span>{courseDiscount}</span>
                                    </p>
                                    <div className="border border-gray-500 border-dotted"></div>
                                    <p className="space-x-44 mt-3">
                                        <span>Total price</span>
                                        <span>{courseFees - courseDiscount}</span>
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="mt-10">
                            <button
                                type="submit"
                                onClick={makePayment}
                                className="flex active:scale-110 hover:bg-[#ca0c47] duration-300 will-change-transform relative transition-all disabled:opacity-70 bg-[#e91f64] text-white font-semibold rounded-2xl px-[265px] py-3 mt-2"
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
                    <Lottie className="ml-20 mt-10 h-[400px] w-[600px]" animationData={animationData4} />
                </div>
            </div>
        </>
    )
}
export default PaymentPage;

