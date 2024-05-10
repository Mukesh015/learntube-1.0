import { Request, Response } from 'express';
import { UserModel } from "../models/user";
import { VideoModel } from '../models/video';
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const stripe = require('stripe')(process.env.stripe_secret)

export async function addToPlaylist(req: Request, res: Response) {
    const { email, videoId } = req.body;
    try {

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const videoIdString: string = String(videoId);

        const index = user.features?.playlists.indexOf(videoIdString);
        if (index !== -1 && user.features?.playlists) {

            await UserModel.updateOne(
                { email: email },
                { $pull: { 'features.playlists': videoIdString } }
            );

            res.status(200).json({ message: 'Video removed from playlists' });
        } else if (user.features?.playlists) {

            user.features.playlists.push(videoIdString);
            await user.save();
            res.status(200).json({ message: 'Video added to playlists' });
        } else {
            console.error('User features or playlists are undefined');
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error adding/removing video to/from playlist:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export async function addToHistory(req: Request, res: Response) {
    const { email, videoId } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            if (user.features?.history.includes(videoId)) {
                return res.status(200).json({ message: 'Video already exists in history' });
            }
            const entry = {
                videoId,
                timeStamp: Date.now()
            };
            user.features?.history.push(entry);
            await user.save();
            return res.status(200).json({ message: 'Video added to history' });
        }
    } catch (error) {
        console.error('Error adding video to history:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


export async function addSearchHistory(req: Request, res: Response) {
    const { email, searchString } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {

            user.features?.searchHistory.push(searchString);

            await user.save();
            return res.status(200).json({ message: 'searchString added to searchHistory' });
        }
    } catch (error) {
        console.error('Error adding video to history:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function removeSearchHistory(req: Request, res: Response) {
    const { email, searchString } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            const SearchString: string = String(searchString);

            const index = user.features?.searchHistory.indexOf(SearchString);
            if (index !== -1 && user.features?.searchHistory) {

                await UserModel.updateOne(
                    { email: email },
                    { $pull: { 'features.searchHistory': searchString } }
                );
                return res.status(200).json({ message: 'searchString removed from searchHistory' });
            }
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
        }

        const videoIdString: string = String(videoId);

        const index1 = user.features?.disLikedVideo.indexOf(videoIdString);
        if (index1 !== -1 && user.features?.disLikedVideo) {

            await UserModel.updateOne(
                { email },
                { $pull: { 'features.disLikedVideo': videoIdString } }
            );
        }

        const index = user.features?.likedVideos.indexOf(videoIdString);
        if (index !== -1 && user.features?.likedVideos) {
            await UserModel.updateOne(
                { email: email },
                { $pull: { 'features.likedVideos': videoIdString } }
            );
            res.status(200).json({ message: 'Video removed from likedvideos' });
        } else if (user.features?.likedVideos) {
            await UserModel.updateOne(
                { email: email },
                { $push: { 'features.likedVideos': videoIdString } }
            );

            await VideoModel.updateOne(
                { "courses.videos.videoID": videoIdString },
                { $inc: { "courses.$[].videos.$[video].videoLikeCount": 1 } },
                { arrayFilters: [{ "video.videoID": videoIdString }] }
            );

            res.status(200).json({ message: 'Video added to likedvideos' });
        } else {
            console.error('User features or likedvideos are undefined');
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error adding/removing video to/from likedvideos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function addToWatchLater(req: Request, res: Response) {
    const { email, videoId } = req.body;
    try {

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const videoIdString: string = String(videoId);

        const index = user.features?.watchLater.indexOf(videoIdString);
        if (index !== -1 && user.features?.watchLater) {

            await UserModel.updateOne(
                { email: email },
                { $pull: { 'features.watchLater': videoIdString } }
            );

            res.status(200).json({ message: 'Video removed from watchlater' });
        } else if (user.features?.watchLater) {

            user.features.watchLater.push(videoIdString);
            await user.save();
            res.status(200).json({ message: 'Video added to watchlater' });
        } else {
            console.error('User features or watchlater are undefined');
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error adding/removing video to/from watchlater:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function addToMyVideos(req: Request, res: Response) {
    const { email, videoId } = req.body;
    try {

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const videoIdString: string = String(videoId);

        const index = user.features?.myVideos.indexOf(videoIdString);
        if (index !== -1 && user.features?.myVideos) {

            await UserModel.updateOne(
                { email: email },
                { $pull: { 'features.myVideos': videoIdString } }
            );

            res.status(200).json({ message: 'Video removed from myvideos' });
        } else if (user.features?.myVideos) {

            user.features.myVideos.push(videoIdString);
            await user.save();
            res.status(200).json({ message: 'Video added to myvideos' });
        } else {
            console.error('User features or myvideos are undefined');
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error adding/removing video to/from myvideos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function addSubscription(req: Request, res: Response) {
    const { email, videoId } = req.body;
    try {

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const videoIdString: string = String(videoId);

        const index = user.features?.subscriptions.indexOf(videoIdString);
        if (index !== -1 && user.features?.subscriptions) {

            await UserModel.updateOne(
                { email: email },
                { $pull: { 'features.subscriptions': videoIdString } }
            );

            res.status(200).json({ message: 'Video removed from subscriptions' });
        } else if (user.features?.subscriptions) {

            user.features.subscriptions.push(videoIdString);
            await user.save();
            res.status(200).json({ message: 'Video added to subscriptions' });
        } else {
            console.error('User features or subscriptions are undefined');
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error adding/removing video to/from subscriptions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export async function addToDislikedVideo(req: Request, res: Response) {
    const { email, videoId } = req.body;
    try {
        // Check if the user exists
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if features is defined in the user object
        if (!user.features) {
            user.features = {
                subscriptions: [],
                playlists: [],
                history: [],
                myVideos: [],
                watchLater: [],
                likedVideos: [],
                disLikedVideo: [],
                comments: [],
                searchHistory: []
            };
        }

        // Check if the videoId exists in the likedVideos array
        const likedVideoIndex = user.features.likedVideos.indexOf(videoId);

        // If the videoId exists in likedVideos array, decrease the count of likedVideos
        // before adding it to disLikedVideo
        if (likedVideoIndex !== -1) {
            user.features.likedVideos.splice(likedVideoIndex, 1);

            // Decrease the videoLikeCount by 1 in the video document
            await VideoModel.updateOne(
                { "courses.videos.videoID": videoId },
                { $inc: { "courses.$[].videos.$[video].videoLikeCount": -1 } },
                { arrayFilters: [{ "video.videoID": videoId }] }
            );
        }

        // Add the videoId to disLikedVideo array
        user.features.disLikedVideo.push(videoId);

        // Save the updated user document
        await user.save();

        // Increase the videoDislikeCount by 1 in the video document
        await VideoModel.updateOne(
            { "courses.videos.videoID": videoId },
            { $inc: { "courses.$[].videos.$[video].videoDislikeCount": 1 } },
            { arrayFilters: [{ "video.videoID": videoId }] }
        );

        return res.status(200).json({ message: "Video disliked successfully" });
    } catch (error) {
        console.error("Error adding disliked video:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export async function calculateWatchTime(req: Request, res: Response) {
    const { email, watchTime } = req.body;
    try {

        const parsedWatchTime = parseFloat(watchTime);
        if (isNaN(parsedWatchTime)) {
            return res.status(400).json({ error: 'Invalid watch time value' });
        }

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.WatchTime = (user.WatchTime || 0) + parsedWatchTime;

        await user.save();

        res.status(200).json({ message: 'Watch time updated successfully' });
    } catch (error) {
        console.error("Error calculating watch time:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export async function markAsRead(req: Request, res: Response) {

    const { email, notificationId } = req.body;
    console.log(notificationId, email);
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const notificationIndex = user.notification.findIndex(
            (notification) => notification.notificationId === notificationId
        );
        if (notificationIndex === -1) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        user.notification[notificationIndex].isRead = true;
        await user.save();
        return res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error("Error marking notification as read:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export async function clearNotification(req: Request, res: Response) {

    const { email, notificationId } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.notification = user.notification.filter(notification => notification.notificationId !== notificationId);


        await user.save();

        return res.status(200).json({ message: 'Notification cleared successfully' });
    } catch (error) {
        console.error("Error clearing notification:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export async function clearAllNotifiacation(req: Request, res: Response) {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.notification = [];
        await user.save();
        return res.status(200).json({ message: 'Notification cleared successfully' });
    } catch (error) {
        console.error("Error clearing notification:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

}



export async function dynamicChanges(req: Request, res: Response) {
    const { email, channelName, RecoveryEmail, channelDescription, any, Facebook, Instagram, Twitter, Github, LinkedIn, Discord } = req.body;
    const modify: string = req.params.modify as string;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (modify === 'channelName') {
            user.channelName = channelName;
        }
        else if (modify === 'RecoveryEmail') {
            user.recoveryEmail = RecoveryEmail;
        }
        else if (modify === 'channelDescription') {
            user.channelDescription = channelDescription;
        }
        else if (modify === "Facebook") {
            user.website.Facebook = Facebook
        }
        else if (modify === "LinkedIn") {
            user.website.LinkedIn = LinkedIn
        }
        else if (modify === "Github") {
            user.website.Github = Github
        }
        else if (modify === "any") {
            user.website.any = any
        }
        else if (modify === "Discord") {
            user.website.Discord = Discord
        }
        else if (modify === "Instagram") {
            user.website.Instagram = Instagram
        }
        else if (modify === "Twitter") {
            user.website.Twitter = Twitter
        }
        await user.save();
        return res.status(200).json({ message: 'Changed sucessfully' });
    } catch (error) {
        console.error("Error modify :", error);
        return res.status(500).json({ error: "Internal server error" });
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


