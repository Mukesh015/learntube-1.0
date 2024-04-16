import express, { Request, Response } from 'express';
import { VideoModel, VideoDocument } from "../models/video";
import * as cloudinary from 'cloudinary';
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


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


export async function uploadVideo(req: Request, res: Response) {
    try {
        const { email, courseName, courseDescription, courseFess, videoTitle, videoDescription, videoTags } = req.body;
        let videoUrl: string | null = null;
        let videoThumbUrl: string | null = null;
        let courseThumbUrl: string | null = null;
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
    
        videoUrl = urls[0];
        videoThumbUrl= urls[1];
        courseThumbUrl = urls[2];
        let user: VideoDocument | null = await VideoModel.findOne({ email });

        if (!user) {
            user = await VideoModel.create({
                email,
                courses: []
            });
        }

        let course = user.courses.find(course => course.courseName === courseName);

        if (course) {
            course.videos.push({
                videoUrl: videoUrl,
                videoTitle,
                videoDescription,
                videoThumbnail: videoThumbUrl,
                videoPublishedAt: new Date(),
                videoTags,
                videoViewCount: 0,
                videoLikeCount: 0,
                videoDislikeCount: 0,
                videoComment: 0
            });
        } else {
            course = {
                courseName,
                courseThumbUrl:courseThumbUrl ,
                courseDescription,
                courseFess,
                videos: [{
                    videoUrl: '',
                    videoTitle,
                    videoDescription,
                    videoThumbnail: videoThumbUrl,
                    videoPublishedAt: new Date(),
                    videoTags,
                    videoViewCount: 0,
                    videoLikeCount: 0,
                    videoDislikeCount: 0,
                    videoComment: 0
                }]
            };
            user.courses.push(course);
        }


        await user.save();

        res.status(200).json({ message: 'Video uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


