import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { expressMiddleware } from '@apollo/server/express4'
import cors from "cors";
import bodyParser from 'body-parser';
import VideoRouter from './routes/video';
import UserRouter from './routes/static';
import FeaturesRouter from './routes/feature';
import PaymentRouter from './routes/payment';
import dotenv from "dotenv";
import creategraphqlServer from "./graphql";
dotenv.config({ path: "./.env" });
const stripe = require('stripe')(process.env.stripe_secret)
const endpointSecret = "whsec_HE0gOF31VbdOno14SqmGP2KGQaN28oMS";
async function init() {
    const DB: string | undefined = process.env.DB;
    const PORT: string | undefined = process.env.PORT;
    if (!DB || !PORT) {
        console.error("Environment variables DB and PORT must be provided.");
        return;
    }

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use("/graphql", expressMiddleware(await creategraphqlServer(),));
    app.use("/api", UserRouter);
    app.use("/video", VideoRouter);
    app.use("/features", FeaturesRouter);
    app.use("/pay", PaymentRouter);


    app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
        const sig = request.headers['stripe-signature'];
        console.log("webhook executed successfully")
        let event;
      
        try {
          event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        } catch (err) {
          response.status(400).send(`Webhook Error: ${err}`);
          return;
        }
      

        switch (event.type) {
          case 'checkout.session.async_payment_failed':
            const checkoutSessionAsyncPaymentFailed = event.data.object;
            console.log('paymentFailed', checkoutSessionAsyncPaymentFailed)
            break;
          case 'checkout.session.async_payment_succeeded':
            const checkoutSessionAsyncPaymentSucceeded = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_succeeded
            console.log('Checkout async payment succeeded', checkoutSessionAsyncPaymentSucceeded)
            break;
          case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            // Then define and call a function to handle the event checkout.session.completed
            console.log('Checkout async checkoutSessionCompleted',checkoutSessionCompleted)
            break;
          case 'checkout.session.expired':
            const checkoutSessionExpired = event.data.object;
            // Then define and call a function to handle the event checkout.session.expired
            console.log('checkout session expired',checkoutSessionExpired)
            break;
          // ... handle other event types
          default:
            console.log(`Unhandled event type ${event.type}`);
        }
      
        // Return a 200 response to acknowledge receipt of the event
        response.send();
      });
    try {
        await mongoose.connect(DB);
        console.log("DB connected");
    } catch (error) {
        console.log("DB connection failed", error);
    }

    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    });
}

init();