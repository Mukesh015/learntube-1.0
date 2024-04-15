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
    const { email, channelName, firstName, gender, contactNumber, city, state, country, pinCode, recoveryEmail, occupation } = req.body;
    console.log(email, channelName, firstName, gender, contactNumber, city, state)
    let channelLogo: string | null = null;
    let coverPhoto: string | null = null;
  
    try {
      const user: UserDocument | null = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
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
      user.occupation = occupation;
      user.address = [{ country, state, city, pincode: pinCode, phone: contactNumber }];
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