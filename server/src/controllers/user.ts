import express, { Request, Response } from 'express';
import { UserModel, UserDocument } from "../models/user";
import bcrypt from 'bcrypt';

async function Register(req: Request, res: Response) {
    const { email, phoneNumber, username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: UserDocument = new UserModel({
            email: email,
            phoneNumber: phoneNumber,
            username: username,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(200).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", error: err });
    }
}

export default Register;