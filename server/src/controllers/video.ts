import express, { Request, Response } from 'express';
import { VideoModel, VideoDocument } from "../models/video";
import dotenv from "dotenv";
import { log } from 'console';

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
        videoID: `@${Date.now()}${videoTitle.slice(0, 4)}`.replace(/\s/g, ''),
        videoDescription,
        videoThumbnail: videoThumbnail,
        videoPublishedAt: new Date(),
        videoTags,
        videoViews: [{ user: email, timestamp: Date.now() }],
        videoLikeCount: 0,
        videoDislikeCount: 0,
        videoComments: {
          count: 0,
          comments: {
            user: [],
            comment: [],
            timestamp: [],
            logo: []
          }
        }
      });
    } else {

      course = {

        courseName,
        courseThumbUrl: courseThumbUrl,
        courseId: `@${Date.now()}${courseName.slice(0, 4)}`.replace(/\s/g, ''),
        courseDescription,
        courseFees: { price },
        videos: [{
          videoUrl: videoUrl,
          videoTitle,
          videoID: `@${Date.now()}${videoTitle.slice(0, 4)}`.replace(/\s/g, ''),
          videoDescription,
          videoThumbnail: videoThumbnail,
          videoPublishedAt: new Date(),
          videoTags,
          videoViews: [{ user: '', timestamp: Date.now() }],
          videoLikeCount: 0,
          videoDislikeCount: 0,
          videoComments: {
            count: 0,
            comments: {
              user: [],
              comment: [],
              timestamp: [],
              logo: []
            }
          }
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
          videoViewCount: video.videoViews.length,
          videoLikeCount: video.videoLikeCount,
          videoDislikeCount: video.videoDislikeCount,
          videoComments: {
            count: 0,
            comments: {
              user: [],
              comment: [],
              timestamp: [],
              logo: []
            }
          }
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
  const email: string = req.params.email as string;
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

    res.send({ videoURl: video.videoUrl });

  } catch (error) {
    console.error("Error redirecting:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function addComment(req: Request, res: Response) {
  const { user, logo, comment, videoId, email } = req.body;
  try {
    // Find the video by email and videoId
    const video = await VideoModel.findOne({ email: email, "courses.videos.videoID": videoId });

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Update the video with the new comment
    video.courses.forEach(course => {
      course.videos.forEach(video => {
        if (video.videoID === videoId) {
          if (video.videoComments) {
            video.videoComments.count += 1;
            video.videoComments.comments.user.push(user);
            video.videoComments.comments.logo.push(logo);
            video.videoComments.comments.comment.push(comment);
            video.videoComments.comments.timestamp.push(Date.now());
          }
        }
      });
    });

    // Save the updated video document
    await video.save();

    return res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.log("Add comment failed:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}