import express, { Request, Response } from 'express';
import { UserModel, UserDocument } from "../models/user";
import { transporter } from '../middlewares/user';
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


type CloudinaryImageUploadResult = { res: string };

async function cloudinaryImageUploadMethod(file: string): Promise<CloudinaryImageUploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file, (err: Error, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve({ res: res.url });
      }
    });
  });
}

export async function createChannel(req: Request, res: Response) {

  const { email, channelName, firstName, gender, contactNumber, city, state, country, pinCode,
    recoveryEmail, channelAdminName, ChannelDescription, any, Facebook, Instagram, Twitter, Github, LinkedIn, Discord, addressLine } = req.body;

  console.log(email, channelName, firstName, gender, contactNumber, city, state, country, pinCode,
    recoveryEmail, channelAdminName, ChannelDescription, addressLine)

  const contactnumber = parseInt(contactNumber)
  const pincode = parseInt(pinCode)
  const channelId = `@${channelName}`
  console.log("email", email)
  let channelLogo: string | null = null;
  let coverPhoto: string | null = null;

  try {
    const user: UserDocument | null = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.isCreator == true) {
      return res.status(400).json({ message: 'User already has a channel' });
    }
    const urls: string[] = [];
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    for (const file of files) {
      const { path } = file;
      try {
        const newPath = await cloudinaryImageUploadMethod(path);
        urls.push(newPath.res);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error uploading image' });
      }
    }

    channelLogo = urls[0];
    coverPhoto = urls[1];

    user.isCreator = true;
    user.channelName = channelName;
    user.channelLogo = channelLogo;
    user.coverPhoto = coverPhoto;
    user.firstname = firstName;
    user.gender = gender;
    user.recoveryEmail = recoveryEmail;
    user.channelId = channelId;
    user.channelDescription = ChannelDescription;
    user.website = { any, Facebook, Twitter, Instagram, Github, LinkedIn, Discord };
    user.address = { country, state, city, pincode: pincode, addressLine, phone: contactnumber };

    await user.save();
    res.status(200).json({ message: 'Channel created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
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

  try {
    const users: UserDocument[] = await UserModel.find();
    if (users && users.length > 0) {
      const userDetailsArray = users.map(user => ({
        email: user.email,
        username: user.username,
        password: user.password,
        avatar: user.avatar,
        isCreator: user.isCreator,
        channelName: user.channelName,
        channelLogo: user.channelLogo,
        history: user.history,
        analytics: user.analytics

      }));
      res.status(200).json(userDetailsArray);
    } else {
      res.status(404).json({ message: 'Users not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
}



export async function userValidation(req: Request, res: Response) {
  const { email, username, avatar } = req.body;
  if (email) {
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.status(200).send({ message: "User already exists" });
      } else {
        const newUser = new UserModel({ email: email, username: username, avatar: avatar, password: `${username}@${Date.now()}` });
        await newUser.save();
        res.status(201).send({ message: "User registered successfully", user: newUser });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
}

export async function generateOtp(req: Request, res: Response) {
  const email = req.body;
  let newotp = "";
  for (let i = 0; i <= 3; i++) {
    newotp += Math.floor(Math.random() * 10).toString();
  }
  try {
    const mailOptions = {
      from: "bikikutta25@gmail.com",
      to: email.email,
      subject: "OTP-Verification",
      text: `Please use the code below to confirm your email address. This code will expire in 2 hours. If you don't think you should be receiving this email, you can safely ignore it. 
        ${newotp}`,
    };
    transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
      if (error) {
        res.status(500).send("Error sending email")
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).send({ message: "OTP sent successfully", otp: newotp });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "OTP generation failed" });
  }
}

export async function addSubscription(req: Request, res: Response) {
  const { email, channelId } = req.body;
  try {
    // Check if the user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the channel is already subscribed
    if (user.subscribers && user.subscribers.users.includes(channelId)) {
      return res.status(400).json({ error: "Channel already subscribed" });
    }

    // Add the channelId to the subscribers users array
    if (!user.subscribers) {
      user.subscribers = { count: 0, users: [] };
    }
    user.subscribers.users.push(channelId);

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: "Subscription added successfully" });
  } catch (error) {
    console.error("Error adding subscription:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}