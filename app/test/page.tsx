"use client"
import React from "react";
import { loadStripe, Stripe } from '@stripe/stripe-js';


const Home: React.FC = () => {
    const handlePayment = async () => {


        try {
            const stripe: Stripe | null = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PK}`);
            if (!stripe) {
                throw new Error('Failed to load Stripe');
            }

            const body = {
                course: "Placement Cse",
            };

            const headers = {
                "Content-Type": "application/json",
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_SERVER_DOMAIN}/features/payment`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch payment session');
            }

            const session = await response.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
        } catch (error) {
            console.error('Error handling payment:', error);
        }
    };

    return (
        <button onClick={handlePayment} className="my-button">
            Pay 20 rupees
        </button>
    );
};

export default Home;
