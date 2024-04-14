import express, { Request, Response } from 'express';
import { UserModel, UserDocument } from "../models/user";
import { isPasswordComplex } from '../middlewares/user';
import bcrypt from 'bcrypt';

export async function register(req: Request, res: Response) {
    const { email, avatar, username, password } = req.body;
    const complex: any = await isPasswordComplex(password);
    if (!complex) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long and contain at least one number and one uppercase letter and a special character"
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
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