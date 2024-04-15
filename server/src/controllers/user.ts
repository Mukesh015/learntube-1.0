import express, { Request, Response } from 'express';
import { UserModel, UserDocument } from "../models/user";
import bcrypt from 'bcrypt';
import * as cloudinary from 'cloudinary';
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export async function register(req: Request, res: Response) {
    const { email, username, password } = req.body;
    console.log(email, username, password);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let avatar = null;
        if (req.file && req.file.path) {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            avatar = result.url;
        }
        const newUser: UserDocument = new UserModel({
            username: username,
            email: email,
            password: hashedPassword,
            avatar: avatar,
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error });
    }
}


export async function createChannel(req: Request, res: Response) {
    const { email, channelName } = req.body;
    let channelLogo: string | null = null;
    try {
        const user: UserDocument | null = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (req.file && req.file.path) {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            channelLogo = result.url;
        } else {
            return res.status(400).json({ message: 'Channel Logo is required' });
        }
        user.isCreator = true;
        user.channelName = channelName;
        user.channelLogo = channelLogo;
        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}



async function getUserByUsername(email: string): Promise<UserDocument | null> {
    try {
        const user: UserDocument | null = await UserModel.findOne({ email });
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export async function getUserDetails(req: Request, res: Response) {
    const {email} = req.body;
     console.log(email)
    try {
        const user = await getUserByUsername(email);
        if (user) {
            const userDetailsArray = [
                {
                    email: user.email,
                    username: user.username,
                    password: user.password,
                    avatar: user.avatar,
                    isCreator: user.isCreator,
                    channelName: user.channelName,
                    channelLogo: user.channelLogo,
                    history: user.history,
                    analytics: user.analytics
                }
            ];
            res.status(200).send(userDetailsArray);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}



export async function handleuservalidation(req: Request, res: Response) {
    const { email, username, avatar } = req.body;
    if (email) {
        try {
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                res.status(200).send({ message: "User already exists" });
            } else {
                const newUser = new UserModel({ email: email, username: username, avatar: avatar });
                await newUser.save();
                res.status(201).send({ message: "User registered successfully" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    }
}