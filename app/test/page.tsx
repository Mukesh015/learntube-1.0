"use client"
import React from "react";
import { loadStripe, Stripe } from '@stripe/stripe-js';

interface AddressDetails {
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  }
  
  interface CustomerDetails {
    name: string;
    address: AddressDetails;
  }


const Home: React.FC = () => {
    const handlePayment = async () => {
        const customerDetails: CustomerDetails = {
            name: 'Sudip Kundu',
            address: {
              line1: "Brindabanpurbarsal",
              city: "Bankura",
              state: "West Bengal",
              postal_code: "722142",
              country: "India",
            },
          };
          
          const addressString = `${customerDetails.address.line1}, ${customerDetails.address.city}, ${customerDetails.address.state}, ${customerDetails.address.postal_code}, ${customerDetails.address.country}`;

        try {
            const stripe: Stripe | null = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
            if (!stripe) {
                throw new Error('Failed to load Stripe');
            }

            const body = {
                course: "Placement Cse",
                customerDetails: {
                    name: customerDetails.name,
                    address: addressString,
                },
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

            console.log(result);
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
