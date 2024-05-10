import { Request, Response } from 'express';

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });


const stripe = require('stripe')(process.env.stripe_secret)

export async function makePayment(req: Request, res: Response) {
    const { courseDetails } = req.body;

    try {
        const lineItems = courseDetails.map((detail: any) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: detail.courseName,
                    images:[detail.courseThumbnail]
                },
                unit_amount: parseInt(detail.courseFees) * 100,
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.client_domain}/payment/success`,
            cancel_url: `${process.env.client_domain}/payment/failed`,
        });

        return res.redirect(303, session.url);
    } catch (error) {
        console.error('Error creating Checkout session:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}
