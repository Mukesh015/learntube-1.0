"use client"
import React, { useEffect, useState } from "react";
import {loadStripe} from '@stripe/stripe-js';

const Home: React.FC = () => {
    const handlePayment=async() => {
        const stripe=await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PK}`)
        const body={
            course:"Placement Cse",
        }
     const   headers={
            "Content-Type": "application/json"
        }
        const response=await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/features/payment`,{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        })
        const session=await response.json();
        const result=stripe?.redirectToCheckout({
            sessionId:session.id
        })
    }
    return (
        <button onClick={handlePayment} className="my-button">
      pay 20 rupees
    </button>
    )
}
export default Home;