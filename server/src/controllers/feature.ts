import { Request, Response } from 'express';
import { UserModel } from "../models/user";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const stripe = require('stripe')(process.env.stripe_secret)

export async function addToPlaylist(req: Request, res: Response) {
    const { email, videoId } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            // Push the videoUrl to the playlists array
            user.features?.playlists.push(videoId);
            // Save the updated user object to the database
            await user.save();
            return res.status(200).json({ message: 'Video added to the playlists' });
        }
    } catch (error) {
        console.error('Error adding video to playlist:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function addToHistory(req: Request, res: Response) {
    const { email, videoUrl } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            // Push the videoUrl to the history array
            user.features?.history.push(videoUrl);
            // Save the updated user object to the database
            await user.save();
            return res.status(200).json({ message: 'Video added to history' });
        }
    } catch (error) {
        console.error('Error adding video to history:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function addToLikedVideo(req: Request, res: Response) {
    const { email, videoId } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            // Push the videoUrl to the history array
            user.features?.likedVideos.push(videoId);
            // Save the updated user object to the database
            await user.save();
            return res.status(200).json({ message: 'Added to likedVideos' });
        }
    } catch (error) {
        console.error('Error adding video to liked video:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


export async function addToWatchLater(req: Request, res: Response) {
    const { email, videoId } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            // Push the videoUrl to the history array
            user.features?.watchLater.push(videoId);
            // Save the updated user object to the database
            await user.save();
            return res.status(200).json({ message: 'Video added to watchLater' });
        }
    } catch (error) {
        console.error('Error adding video to watch later:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function addToMyVideos(req: Request, res: Response) {
    const { email, videoId } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            // Push the videoUrl to the myVideos array
            user.features?.myVideos.push(videoId);
            // Save the updated user object to the database
            await user.save();
            return res.status(200).json({ message: 'Video added to myVideos' });
        }
    } catch (error) {
        console.error('Error adding video to myVideos:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function addSubscription(req: Request, res: Response) {
    const { email, videoUrl } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            // Push the subscriptionDetails to the subscriptions array
            user.features?.subscriptions.push(videoUrl);
            // Save the updated user object to the database
            await user.save();
            return res.status(200).json({ message: 'Subscription added' });
        }
    } catch (error) {
        console.error('Error adding subscription:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


export async function makepayment(req: Request, res: Response) {
    const { course, customerDetails } = req.body;
    try {
        // Define line items for the Checkout session
        const lineItems = {
            price_data: {
                currency: "inr",
                product_data: {
                    name: 'Student'
                },
                unit_amount: 1000000, // Amount in smallest currency unit (here 10000 INR)
            },
            quantity: 1,
        };

        // Create the Checkout session with payment method types, line items, and other parameters
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [lineItems],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.send({ id: session.id });
        console.log(session.id);
    } catch (error) {
        console.error('Error creating Checkout session:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }

}
