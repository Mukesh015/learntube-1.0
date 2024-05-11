import { Request, Response } from 'express';

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });


const stripe = require('stripe')(process.env.stripe_secret)
const endpointSecret=process.env.webhook_secret


export async function makePayment(req: Request, res: Response) {
    const { courseDetails } = req.body;

    try {
        const lineItems = courseDetails.map((detail: any) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: detail.courseName,
                    description: detail.courseDescription,
                    images: [detail.courseThumbnail]
                },
                unit_amount: parseInt(detail.courseFees) * 100,
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.client_domain}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.client_domain}/payment/failed`,
            customer_email:'sudip2003kundu@gmail.com',
            client_reference_id: 5400,
            
        });

        res.json({ url: session.url })
    } catch (error) {
        console.error('Error creating Checkout session:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

export async function webHook(req: Request, res: Response) {

    let event = req.body;
  
  if (endpointSecret) {

    const signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (error) {
      console.log(`⚠️  Webhook signature verification failed.`, error);
      return res.sendStatus(400);
    }
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
    
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;

      break;
    default:

      console.log(`Unhandled event type ${event.type}.`);
  }


  res.send();
}