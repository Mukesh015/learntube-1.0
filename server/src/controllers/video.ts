import express, { Request, Response } from 'express';
import { VideoModel, VideoDocument } from "../models/video";
import dotenv from "dotenv";
import { log } from 'console';
import { UserDocument, UserModel } from '../models/user';

dotenv.config({ path: "./.env" });





export async function uploadVideo(req: Request, res: Response) {
  try {
    const { email, courseName, courseDescription, price, videoTitle, videoDescription, videoTags, videoUrl, videoThumbnail, courseThumbUrl } = req.body;
    console.log(email, courseName, courseDescription, price, videoTitle, videoDescription, videoTags, videoUrl, videoThumbnail, courseThumbUrl)
    const videoid= `@${Date.now()}${videoTitle.slice(0, 4)}`.replace(/\s/g, '')
    let video: VideoDocument | null = await VideoModel.findOne({ email });
    let user: UserDocument | null = await UserModel.findOne({ email });

    if (!video) {
      video = await VideoModel.create({
        email,
        courses: []
      });
    }
    let course = video.courses.find(course => course.courseName === courseName);

    if (course) {
      course.videos.push({
        videoUrl: videoUrl,
        videoTitle,
        videoID:videoid,
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
          videoID: videoid,
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
      video.courses.push(course);
    }

    await video.save();

    if (!user) {
      res.status(404).send({ message: "user not found" })
    }

    const notificationId = `@${Date.now()}${email.slice(0, 4)}`.replace(/\s/g, '');
    
    const subscribers = user?.subscribers?.users || [];
   
        const notification = {
            isRead: false,
            message: 'uploaded a new video. Check it out now',
            user: email,
            timeStamp: Date.now(),
            notificationId: notificationId,
            videoId: videoid
        };

    
        for (const subscriberEmail of subscribers) {
            const subscriber = await UserModel.findOne({ email: subscriberEmail });
            if (subscriber) {
                subscriber.notification.push(notification);
                await subscriber.save();
            }
        }
    res.status(200).json({ message: 'Video uploaded successfully' });

    await user?.save();

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
        courseId: course.courseId,
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
  const { logo, comment, videoId, email, creatorEmail } = req.body;
  try {
    const video = await VideoModel.findOne({ email: creatorEmail, "courses.videos.videoID": videoId });
    const user = await UserModel.findOne({ email: creatorEmail });
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }


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


    await video.save();

    if (!user) {
      res.status(404).send({ message: "user not found" })
    }
    user?.notification.push({
      isRead:false,
      message:' commented on your video',
      user:email,
      timeStamp:Date.now(),
      notificationId: `@${Date.now()}${email.slice(0, 4)}`.replace(/\s/g, ''),
      videoId:videoId
    })

    await user?.save();

    return res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.log("Add comment failed:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}