"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = exports.redirect = exports.getVideoDetails = exports.uploadVideo = void 0;
const video_1 = require("../models/video");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../models/user");
dotenv_1.default.config({ path: "./.env" });
function uploadVideo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { email, courseName, courseDescription, price, videoTitle, videoDescription, videoTags, videoUrl, videoThumbnail, courseThumbUrl } = req.body;
            console.log(email, courseName, courseDescription, price, videoTitle, videoDescription, videoTags, videoUrl, videoThumbnail, courseThumbUrl);
            const videoid = `@${Date.now()}${videoTitle.slice(0, 4)}`.replace(/\s/g, '');
            let video = yield video_1.VideoModel.findOne({ email });
            let user = yield user_1.UserModel.findOne({ email });
            if (!video) {
                video = yield video_1.VideoModel.create({
                    email,
                    courses: []
                });
            }
            let course = video.courses.find(course => course.courseName === courseName);
            if (course) {
                course.videos.push({
                    videoUrl: videoUrl,
                    videoTitle,
                    videoID: videoid,
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
            }
            else {
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
            yield video.save();
            if (!user) {
                res.status(404).send({ message: "user not found" });
            }
            const notificationId = `@${Date.now()}${email.slice(0, 4)}`.replace(/\s/g, '');
            const subscribers = ((_a = user === null || user === void 0 ? void 0 : user.subscribers) === null || _a === void 0 ? void 0 : _a.users) || [];
            const notification = {
                isRead: false,
                message: 'uploaded a new video. Check it out now',
                user: email,
                timeStamp: Date.now(),
                notificationId: notificationId,
                videoId: videoid
            };
            for (const subscriberEmail of subscribers) {
                const subscriber = yield user_1.UserModel.findOne({ email: subscriberEmail });
                if (subscriber) {
                    subscriber.notification.push(notification);
                    yield subscriber.save();
                }
            }
            res.status(200).json({ message: 'Video uploaded successfully' });
            yield (user === null || user === void 0 ? void 0 : user.save());
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.uploadVideo = uploadVideo;
function getVideoDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const videos = yield video_1.VideoModel.find();
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
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.getVideoDetails = getVideoDetails;
function redirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const videoID = req.params.videoID;
        const email = req.params.email;
        try {
            const entry = yield video_1.VideoModel.findOneAndUpdate({ "courses.videos.videoID": videoID }, {
                $push: {
                    "courses.$[course].videos.$[video].videoViews": {
                        user: email,
                        timestamp: Date.now(),
                    }
                },
            }, {
                arrayFilters: [{ "course.videos.videoID": videoID }, { "video.videoID": videoID }],
                new: true,
            });
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
        }
        catch (error) {
            console.error("Error redirecting:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.redirect = redirect;
function addComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { logo, comment, videoId, email, creatorEmail } = req.body;
        try {
            const video = yield video_1.VideoModel.findOne({ email: creatorEmail, "courses.videos.videoID": videoId });
            const user = yield user_1.UserModel.findOne({ email: creatorEmail });
            if (!video) {
                return res.status(404).json({ error: 'Video not found' });
            }
            video.courses.forEach(course => {
                course.videos.forEach(video => {
                    if (video.videoID === videoId) {
                        if (video.videoComments) {
                            video.videoComments.count += 1;
                            video.videoComments.comments.user.push(email);
                            video.videoComments.comments.logo.push(logo);
                            video.videoComments.comments.comment.push(comment);
                            video.videoComments.comments.timestamp.push(Date.now());
                        }
                    }
                });
            });
            yield video.save();
            if (!user) {
                res.status(404).send({ message: "user not found" });
            }
            user === null || user === void 0 ? void 0 : user.notification.push({
                isRead: false,
                message: 'commented on your video',
                user: email,
                timeStamp: Date.now(),
                notificationId: `@${Date.now()}${email.slice(0, 4)}`.replace(/\s/g, ''),
                videoId: videoId
            });
            yield (user === null || user === void 0 ? void 0 : user.save());
            return res.status(200).json({ message: 'Comment added successfully' });
        }
        catch (error) {
            console.log("Add comment failed:", error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.addComment = addComment;
