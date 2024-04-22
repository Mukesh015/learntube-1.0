import express, { Request, Response } from 'express';
import { VideoModel, VideoDocument } from "../models/video";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });





export async function uploadVideo(req: Request, res: Response) {
  try {
    const { email, courseName, courseDescription, price, videoTitle, videoDescription, videoTags, videoUrl, videoThumbnail, courseThumbUrl } = req.body;
    console.log(email, courseName, courseDescription, price, videoTitle, videoDescription, videoTags, videoUrl, videoThumbnail, courseThumbUrl)

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
        videoID: `@${Date.now()}${videoTitle.slice(0, 4)}`,
        videoDescription,
        videoThumbnail: videoThumbnail,
        videoPublishedAt: new Date(),
        videoTags,
        videoViews: [{ user: email, timestamp: Date.now() }],
        videoLikeCount: 0,
        videoDislikeCount: 0,
        videoComment: 0
      });
    } else {

      course = {

        courseName,
        courseThumbUrl: courseThumbUrl,
        courseDescription,
        courseFees: { price },
        videos: [{
          videoUrl: videoUrl,
          videoTitle,
          videoID: `@${Date.now()}${videoTitle.slice(0, 4)}`,
          videoDescription,
          videoThumbnail: videoThumbnail,
          videoPublishedAt: new Date(),
          videoTags,
          videoViews: [{ user: '', timestamp: Date.now() }],
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
        courseFess: course.courseFees,
        videos: course.videos.map(video => ({
          videoUrl: video.videoUrl,
          videoID: video.videoID,
          videoTitle: video.videoTitle,
          videoDescription: video.videoDescription,
          videoThumbnail: video.videoThumbnail,
          videoPublishedAt: video.videoPublishedAt,
          videoTags: video.videoTags,
          videoViews: video.videoViews,
          videoViewCount:video.videoViews.length,
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


export async function redirect(req: Request, res: Response) {
  const videoID: string = req.params.videoID as string;
  const { email } = req.body;
  console.log(videoID, email);

  try {
    const entry: VideoDocument | null = await VideoModel.findOneAndUpdate(
      { "courses.videos.videoID": videoID },
      {
        $push: {
          "courses.$[course].videos.$[video].videoViews": {
            user: email,
            timestamp: Date.now(),
    
          }
        },
      },
      {
        arrayFilters: [{ "course.videos.videoID": videoID }, { "video.videoID": videoID }],
        new: true,
      }
    );

    if (!entry) {
      return res.status(404).json({ error: "URL not found" });
    }

    const video = entry.courses.flatMap(course => course.videos).find(video => video.videoID === videoID);

    if (!video) {
      return res.status(404).json({ error: "videoID not found" });
    }

    if (!video.videoUrl) {
      return res.status(404).json({ error: "videoUrl not found" });
    }

    res.redirect(video.videoUrl);
  } catch (error) {
    console.error("Error redirecting:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}