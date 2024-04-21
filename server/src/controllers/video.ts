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
    const { email, courseName, courseDescription, free, paid, videoTitle, videoDescription, videoTags, videoUrl,videoThumbUrl,courseThumbUrl } = req.body;
    console.log('Uploading video', videoUrl, "couseprice paid", paid, "couseprice free", free)

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
        videoID: `@${Date.now()}${videoTitle.slice(0,4)}`,
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
        courseThumbUrl,
        courseDescription,
        courseFess: { free, paid },
        videos: [{
          videoUrl: videoUrl,
          videoTitle,
          videoID: `@${Date.now()}${videoTitle.slice(0,4)}`,
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


export async function getVideoDetails(req: Request, res: Response) {

  try {
    const videos: VideoDocument[] = await VideoModel.find();


    const videoDetails = videos.map(video => ({
      email: video.email,
      courses: video.courses.map(course => ({
        courseName: course.courseName,
        courseThumbUrl: course.courseThumbUrl,
        courseDescription: course.courseDescription,
        courseFess: course.courseFess,
        videos: course.videos.map(video => ({
          videoUrl: video.videoUrl,
          videoID: video.videoID,
          videoTitle: video.videoTitle,
          videoDescription: video.videoDescription,
          videoThumbnail: video.videoThumbnail,
          videoPublishedAt: video.videoPublishedAt,
          videoTags: video.videoTags,
          videoViewCount: video.videoViewCount,
          videoLikeCount: video.videoLikeCount,
          videoDislikeCount: video.videoDislikeCount,
          videoComment: video.videoComment
        }))
      }))
    }));

    res.status(200).json({ videoDetails });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}