import { Request, Response } from 'express';
import { UserModel } from "../models/user";

export async function addToPlaylist(req: Request, res: Response) {
    const { email, videoUrl } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            // Push the videoUrl to the playlists array
            user.features?.playlists.push(videoUrl);
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
    const { email, videoUrl } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            // Push the videoUrl to the history array
            user.features?.likedVideos.push(videoUrl);
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
    const { email, videoUrl } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            // Push the videoUrl to the history array
            user.features?.watchLater.push(videoUrl);
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
    const { email, videoUrl } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            // Push the videoUrl to the myVideos array
            user.features?.myVideos.push(videoUrl);
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