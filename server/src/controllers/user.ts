import express, { Request, Response } from 'express';
import { UserModel, UserDocument } from "../models/user";
import bcrypt from 'bcrypt';
import * as cloudinary from 'cloudinary';
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

//Not working
cloudinary.v2.config({
    cloud_name: 'dq61sabcs',
    api_key: '672851774136482',
    api_secret: '14MCM4lcbqDO1B0nv9Na6GwWK2M',
});

export async function register(req: Request, res: Response) {
    const { email, username, password } = req.body;
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