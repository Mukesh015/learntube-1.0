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
exports.resolvers = void 0;
const video_1 = require("../../models/video");
const user_1 = require("../../models/user");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
const queries = {
    getFeatures: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, videoID, channelId }) {
        var _b, _c, _d, _e, _f, _g, _h, _j;
        const user = yield user_1.UserModel.findOne({ email });
        if (!user) {
            return "USer not found";
        }
        const playlist = ((_b = user.features) === null || _b === void 0 ? void 0 : _b.playlists) || [];
        const hasValuePlayList = playlist.includes(videoID);
        const history = ((_c = user.features) === null || _c === void 0 ? void 0 : _c.history) || [];
        const hasValueHistory = history.map(history => history.videoId).includes(videoID);
        const myVideos = ((_d = user.features) === null || _d === void 0 ? void 0 : _d.myVideos) || [];
        const hasValueMyVideos = myVideos.includes(videoID);
        const watchLater = ((_e = user.features) === null || _e === void 0 ? void 0 : _e.watchLater) || [];
        const hasValueWatchLater = watchLater.includes(videoID);
        const likedVideos = ((_f = user.features) === null || _f === void 0 ? void 0 : _f.likedVideos) || [];
        const hasValueLikedVideos = likedVideos.includes(videoID);
        const dislikedVideos = ((_g = user.features) === null || _g === void 0 ? void 0 : _g.disLikedVideo) || [];
        const hasValueDislikedVideos = dislikedVideos.includes(videoID);
        const subsCribed = ((_h = user.subscribedChnannels) === null || _h === void 0 ? void 0 : _h.channelId) || [];
        const hasValueSubscribed = subsCribed.includes(channelId);
        const totalSubscriber = (_j = user.subscribers) === null || _j === void 0 ? void 0 : _j.count;
        return [{
                haveInPlaylist: hasValuePlayList, hasInHistory: hasValueHistory, haveInMyVideos: hasValueMyVideos,
                haveInWatchLater: hasValueWatchLater, isLiked: hasValueLikedVideos, dislikedVideos: hasValueDislikedVideos,
                subscribedchannel: hasValueSubscribed, totalSubscriber: totalSubscriber
            }];
    }),
    getChannelLogo: (undefined, p0) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(`${process.env.server_domain}/api/getuserdetails`);
            const userDetails = response.data;
            const creators = userDetails.filter(user => user.isCreator);
            return creators.map(creator => ({
                channelLogo: creator.channelLogo, email: creator.email, channelName: creator.channelName,
                channelId: creator.channelId, avatar: creator.avatar, usernames: creator.username
            }));
        }
        catch (error) {
            console.error('Error fetching channellogo:', error);
            throw new Error('Error fetching channellogo');
        }
    }),
    getPlaylist: (_2, _k) => __awaiter(void 0, [_2, _k], void 0, function* (_, { email }) {
        var _l;
        try {
            const user = yield user_1.UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }
            const videos = yield video_1.VideoModel.find();
            if (!videos) {
                throw new Error("Videos not found");
            }
            const channelLogoResponse = yield queries.getChannelLogo(undefined, { email: videos.map(email => email.email) });
            const playlist = ((_l = user.features) === null || _l === void 0 ? void 0 : _l.playlists) || [];
            const playlistDetails = [];
            videos.forEach(video => {
                video.courses.forEach(course => {
                    course.videos.forEach((vid) => {
                        var _a;
                        if (playlist.includes(vid.videoID)) {
                            playlistDetails.push({
                                courseID: course.courseId,
                                courseFees: course.courseFees.price,
                                videoId: vid.videoID,
                                videoTitle: vid.videoTitle,
                                videoViews: vid.videoViews.length,
                                videoPublishedAt: vid.videoPublishedAt,
                                videoThumbnail: vid.videoThumbnail,
                                channelLogo: (_a = channelLogoResponse.find((logo) => logo.email === video.email)) === null || _a === void 0 ? void 0 : _a.channelLogo,
                            });
                        }
                    });
                });
            });
            return playlistDetails;
        }
        catch (error) {
            console.log(error);
            throw new Error("An error occurred while fetching user playlist.");
        }
    }),
    getWatchLater: (_3, _m) => __awaiter(void 0, [_3, _m], void 0, function* (_, { email }) {
        var _o;
        try {
            const user = yield user_1.UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }
            const videos = yield video_1.VideoModel.find();
            if (!videos) {
                throw new Error("Videos not found");
            }
            const channelLogoResponse = yield queries.getChannelLogo(undefined, { email: videos.map(email => email.email) });
            const watchLater = ((_o = user.features) === null || _o === void 0 ? void 0 : _o.watchLater) || [];
            const watchLaterDetails = [];
            videos.forEach(video => {
                video.courses.forEach(course => {
                    course.videos.forEach((vid) => {
                        var _a;
                        if (watchLater.includes(vid.videoID)) {
                            watchLaterDetails.push({
                                videoId: vid.videoID,
                                videoTitle: vid.videoTitle,
                                videoViews: vid.videoViews.length,
                                videoPublishedAt: vid.videoPublishedAt,
                                videoThumbnail: vid.videoThumbnail,
                                courseId: course.courseId,
                                courseFees: course.courseFees.price,
                                channelLogo: (_a = channelLogoResponse.find((logo) => logo.email === video.email)) === null || _a === void 0 ? void 0 : _a.channelLogo,
                            });
                        }
                    });
                });
            });
            return watchLaterDetails;
        }
        catch (error) {
            console.log(error);
            throw new Error("An error occurred while fetching user playlist.");
        }
    }),
    getHistory: (_4, _p) => __awaiter(void 0, [_4, _p], void 0, function* (_, { email }) {
        var _q;
        try {
            const user = yield user_1.UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }
            const videos = yield video_1.VideoModel.find();
            if (!videos) {
                throw new Error("Videos not found");
            }
            const channelLogoResponse = yield queries.getChannelLogo(undefined, { email: videos.map(email => email.email) });
            const history = ((_q = user.features) === null || _q === void 0 ? void 0 : _q.history) || [];
            const historyDetails = [];
            videos.forEach(video => {
                video.courses.forEach(course => {
                    course.videos.forEach((vid) => {
                        var _a;
                        const viewedHistory = history.find(entry => entry.videoId === vid.videoID);
                        if (viewedHistory) {
                            historyDetails.push({
                                courseID: course.courseId,
                                courseFees: course.courseFees.price,
                                videoId: vid.videoID,
                                videoTitle: vid.videoTitle,
                                videoViews: vid.videoViews.length,
                                videoPublishedAt: vid.videoPublishedAt,
                                videoThumbnail: vid.videoThumbnail,
                                viewedAt: `${viewedHistory.timeStamp}`, // Convert timestamp to a readable format
                                channelLogo: (_a = channelLogoResponse.find((logo) => logo.email === video.email)) === null || _a === void 0 ? void 0 : _a.channelLogo,
                            });
                        }
                    });
                });
            });
            return historyDetails;
        }
        catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching user playlist.");
        }
    }),
    getLikedVideos: (_5, _r) => __awaiter(void 0, [_5, _r], void 0, function* (_, { email }) {
        var _s;
        try {
            const user = yield user_1.UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }
            const videos = yield video_1.VideoModel.find();
            if (!videos) {
                throw new Error("Videos not found");
            }
            const channelLogoResponse = yield queries.getChannelLogo(undefined, { email: videos.map(email => email.email) });
            const likedVideos = ((_s = user.features) === null || _s === void 0 ? void 0 : _s.likedVideos) || [];
            const likedVideosDetails = [];
            videos.forEach(video => {
                video.courses.forEach(course => {
                    course.videos.forEach((vid) => {
                        var _a;
                        if (likedVideos.includes(vid.videoID)) {
                            likedVideosDetails.push({
                                videoId: vid.videoID,
                                videoTitle: vid.videoTitle,
                                videoViews: vid.videoViews.length,
                                videoPublishedAt: vid.videoPublishedAt,
                                videoThumbnail: vid.videoThumbnail,
                                courseId: course.courseId,
                                courseFees: course.courseFees.price,
                                channelLogo: (_a = channelLogoResponse.find((logo) => logo.email === video.email)) === null || _a === void 0 ? void 0 : _a.channelLogo,
                            });
                        }
                    });
                });
            });
            return likedVideosDetails;
        }
        catch (error) {
            console.log(error);
            throw new Error("An error occurred while fetching user playlist.");
        }
    }),
    getchannelDetails: (_6, _t) => __awaiter(void 0, [_6, _t], void 0, function* (_, { email }) {
        try {
            const user = yield user_1.UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }
            const { any, Facebook, Instagram, Twitter, Github, LinkedIn, Discord } = user.website || {};
            return [
                {
                    Name: user.username,
                    email: user.email,
                    phoneNumber: user.address.phone,
                    Gender: user.gender,
                    addressLine: user.address.addressLine,
                    city: user.address.city,
                    state: user.address.state,
                    country: user.address.country,
                    PinCode: user.address.pincode,
                    channelName: user.channelName,
                    RecoveryEmail: user.recoveryEmail,
                    channelDescription: user.channelDescription,
                    websiteURL: any || "",
                    Facebook: Facebook || "",
                    Instagram: Instagram || "",
                    Twitter: Twitter || "",
                    Github: Github || "",
                    LinkedIn: LinkedIn || "",
                    Discord: Discord || "",
                    coverPhotoURL: user.coverPhoto,
                    channelLogo: user.channelLogo,
                    channelId: user.channelId,
                    channelCreatedDate: user.channelCreatedAt,
                }
            ];
        }
        catch (error) {
            console.log(error);
            throw new Error("An error occurred while fetching getchannelDetails");
        }
    }),
    getYourVideo: (_7, _u) => __awaiter(void 0, [_7, _u], void 0, function* (_, { email }) {
        try {
            const videos = yield video_1.VideoModel.findOne({ email });
            if (!videos || !videos.courses) {
                return [];
            }
            const formattedVideos = videos.courses.reduce((acc, course) => {
                course.videos.forEach(video => {
                    acc.push({
                        videoId: video.videoID,
                        videoTitle: video.videoTitle,
                        viewsCount: video.videoViews.length,
                        videoPublishedAt: video.videoPublishedAt,
                        videoThumbnail: video.videoThumbnail,
                    });
                });
                return acc;
            }, []);
            formattedVideos.sort((a, b) => (b.videoPublishedAt.getTime() - a.videoPublishedAt.getTime()));
            return formattedVideos;
        }
        catch (error) {
            console.error('Error fetching videos:', error);
            throw error;
        }
    }),
    getCreatorCard: (_8, _v) => __awaiter(void 0, [_8, _v], void 0, function* (_, { email }) {
        var _w;
        try {
            const user = yield user_1.UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }
            const videos = yield video_1.VideoModel.find({ email });
            if (!videos) {
                return "Videos not found";
            }
            let totalComments = 0;
            let totalLike = 0;
            videos.forEach(video => {
                video.courses.forEach(course => {
                    if (course.videos) {
                        course.videos.forEach(video => {
                            if (video.videoComments) {
                                totalComments += video.videoComments.count;
                            }
                            totalLike += video.videoLikeCount;
                        });
                    }
                });
            });
            return [{
                    subscriber: (_w = user.subscribers) === null || _w === void 0 ? void 0 : _w.count,
                    watchTime: user.WatchTime,
                    totalComments: totalComments,
                    totalLike: totalLike
                }];
        }
        catch (error) {
            console.log(error);
            throw new Error("An error occurred while fetching getCreatorCard");
        }
    }),
    getComments: (_9, _x) => __awaiter(void 0, [_9, _x], void 0, function* (_, { videoID }) {
        var _y, _z, _0, _10, _11, _12, _13, _14;
        try {
            const video = yield video_1.VideoModel.findOne({ "courses.videos.videoID": videoID });
            if (!video) {
                throw new Error('Video not found');
            }
            const course = video.courses.find(course => course.videos.some(video => video.videoID === videoID));
            if (!course) {
                throw new Error('Course containing the video not found');
            }
            const videoItem = course.videos.find(video => video.videoID === videoID);
            if (!videoItem) {
                throw new Error('Video item not found');
            }
            const comments = ((_z = (_y = videoItem.videoComments) === null || _y === void 0 ? void 0 : _y.comments) === null || _z === void 0 ? void 0 : _z.comment.map(comment => ({ comment: comment || "" }))) || [];
            const logos = ((_10 = (_0 = videoItem.videoComments) === null || _0 === void 0 ? void 0 : _0.comments) === null || _10 === void 0 ? void 0 : _10.logo.map(logo => ({ logo: logo || "" }))) || [];
            const timestamps = ((_12 = (_11 = videoItem.videoComments) === null || _11 === void 0 ? void 0 : _11.comments) === null || _12 === void 0 ? void 0 : _12.timestamp.map(ts => ({ timestamp: ts || "" }))) || [];
            const users = ((_14 = (_13 = videoItem.videoComments) === null || _13 === void 0 ? void 0 : _13.comments) === null || _14 === void 0 ? void 0 : _14.user.map(user => ({ user: user || "" }))) || [];
            const channelInfo = yield queries.getChannelLogo(undefined, { email: users });
            const result = comments.map((_, index) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                return ({
                    comments: (_a = comments[index]) === null || _a === void 0 ? void 0 : _a.comment,
                    logo: (_b = logos[index]) === null || _b === void 0 ? void 0 : _b.logo,
                    timeStamp: (_c = timestamps[index]) === null || _c === void 0 ? void 0 : _c.timestamp,
                    user: (_d = users[index]) === null || _d === void 0 ? void 0 : _d.user,
                    channelLogo: ((_e = channelInfo.find((info) => { var _a; return info.email === ((_a = users[index]) === null || _a === void 0 ? void 0 : _a.user); })) === null || _e === void 0 ? void 0 : _e.channelLogo) ||
                        ((_f = channelInfo.find((info) => { var _a; return info.email === ((_a = users[index]) === null || _a === void 0 ? void 0 : _a.user); })) === null || _f === void 0 ? void 0 : _f.avatar),
                    channelId: ((_g = channelInfo.find((info) => { var _a; return info.email === ((_a = users[index]) === null || _a === void 0 ? void 0 : _a.user); })) === null || _g === void 0 ? void 0 : _g.channelId) ||
                        ((_h = channelInfo.find((info) => { var _a; return info.email === ((_a = users[index]) === null || _a === void 0 ? void 0 : _a.user); })) === null || _h === void 0 ? void 0 : _h.usernames),
                    count: (_j = videoItem.videoComments) === null || _j === void 0 ? void 0 : _j.count
                });
            });
            return result;
        }
        catch (error) {
            console.error('Error fetching video comments:', error);
            throw new Error('Error fetching video comments');
        }
    }),
    getYourCourse: (_10, _15) => __awaiter(void 0, [_10, _15], void 0, function* (_, { email }) {
        var _16, _17;
        try {
            const user = yield user_1.UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }
            const enrolledCourses = user.EnrolledCourses || [];
            const courseDetails = [];
            for (const courseId of enrolledCourses) {
                const course = yield video_1.VideoModel.findOne({ "courses.courseId": courseId });
                if (course) {
                    const courseInfo = course.courses.find(c => c.courseId === courseId);
                    const courseName = (courseInfo === null || courseInfo === void 0 ? void 0 : courseInfo.courseName) || '';
                    const courseThumbUrl = (courseInfo === null || courseInfo === void 0 ? void 0 : courseInfo.courseThumbUrl) || '';
                    const courseDescription = (courseInfo === null || courseInfo === void 0 ? void 0 : courseInfo.courseDescription) || '';
                    const courseCreatorEmail = course.email;
                    // Fetch channelLogo and channelName based on the course creator's email
                    const channelInfo = yield queries.getChannelLogo(undefined, { email: courseCreatorEmail });
                    const channelLogo = ((_16 = channelInfo.find((info) => info.email === courseCreatorEmail)) === null || _16 === void 0 ? void 0 : _16.channelLogo) || '';
                    const channelName = ((_17 = channelInfo.find((info) => info.email === courseCreatorEmail)) === null || _17 === void 0 ? void 0 : _17.channelName) || '';
                    const videos = (courseInfo === null || courseInfo === void 0 ? void 0 : courseInfo.videos) || [];
                    const videoDetails = videos.map(video => ({
                        videoUrl: video.videoUrl,
                        videoThumbnail: video.videoThumbnail,
                        videoDescription: video.videoDescription,
                        videoId: video.videoID,
                        videoTitle: video.videoTitle,
                        videoViews: video.videoViews.length,
                        videoPublishedAt: video.videoPublishedAt
                    }));
                    const totalNoOfVideos = videos.length;
                    courseDetails.push({
                        courseId: courseId,
                        courseName: courseName,
                        courseThumbUrl: courseThumbUrl,
                        courseDescription: courseDescription,
                        channelLogo: channelLogo,
                        channelName: channelName,
                        videos: videoDetails,
                        totalNoOfVideos: totalNoOfVideos
                    });
                }
            }
            return courseDetails;
        }
        catch (error) {
            console.error('Error fetching user courses:', error);
            throw new Error('An error occurred while fetching user courses');
        }
    }),
    getSubscribedChannels: (_11, _18) => __awaiter(void 0, [_11, _18], void 0, function* (_, { email }) {
        var _19;
        try {
            const user = yield user_1.UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }
            const subscribedChannels = ((_19 = user.subscribedChnannels) === null || _19 === void 0 ? void 0 : _19.channelId) || [];
            const channelDetails = [];
            for (const channelId of subscribedChannels) {
                const channel = yield user_1.UserModel.findOne({ "channelId": channelId });
                if (channel) {
                    const channelName = channel.channelName || '';
                    const channelLogo = channel.channelLogo || '';
                    channelDetails.push({
                        channelId: channelId,
                        channelName: channelName,
                        channelLogo: channelLogo
                    });
                }
            }
            return channelDetails;
        }
        catch (error) {
            console.error('Error fetching subscribed channels:', error);
            throw new Error('An error occurred while fetching subscribed channels');
        }
    }),
    getCreatorCourses: (_12, _20) => __awaiter(void 0, [_12, _20], void 0, function* (_, { email }) {
        try {
            const videos = yield video_1.VideoModel.find({ email });
            const result = [];
            videos.forEach((video) => {
                video.courses.forEach((course) => {
                    const { courseId, courseName, courseThumbUrl, courseDescription } = course;
                    const courseVideos = []; // Array to store video details
                    course.videos.forEach((video) => {
                        const { videoID, videoTitle, videoViews, videoThumbnail, videoDescription, videoPublishedAt } = video;
                        courseVideos.push({
                            videoUrl: video.videoUrl,
                            videoId: videoID,
                            videoTitle: videoTitle,
                            videoViews: videoViews.length,
                            videoThumbnail: videoThumbnail,
                            videoDescription: videoDescription,
                            videoPublishedAt: videoPublishedAt
                        });
                    });
                    result.push({
                        courseId,
                        courseName,
                        courseThumb: courseThumbUrl,
                        courseDescription,
                        videos: courseVideos
                    });
                });
            });
            return result;
        }
        catch (error) {
            console.error('Error fetching course details:', error);
            throw new Error('An error occurred while fetching course details');
        }
    }),
    getvideoThumbnail: (_13, _21) => __awaiter(void 0, [_13, _21], void 0, function* (_, { videoId }) {
        try {
            const video = yield video_1.VideoModel.findOne({ "courses.videos.videoID": videoId });
            if (!video) {
                throw new Error('Video not found');
            }
            const course = video.courses.find(course => course.videos.some(video => video.videoID === videoId));
            if (!course) {
                throw new Error('Course containing the video not found');
            }
            const videoItem = course.videos.find(video => video.videoID === videoId);
            if (!videoItem) {
                throw new Error('Video item not found');
            }
            return [{ videoThumnail: videoItem.videoThumbnail }];
        }
        catch (error) {
            console.error('Error fetching video thumbnail:', error);
            throw new Error('An error occurred while fetching video thumbnail');
        }
    }),
    getNotifications: (_14, _22) => __awaiter(void 0, [_14, _22], void 0, function* (_, { email }) {
        try {
            const user = yield user_1.UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }
            const getMessageDetails = (message, email) => __awaiter(void 0, void 0, void 0, function* () {
                if (message.includes("commented on your video")) {
                    const commenter = yield user_1.UserModel.findOne({ email: email });
                    if (!commenter) {
                        console.error("email not found");
                        throw new Error('Commenter not found');
                    }
                    return { displayMessage: `${commenter.username} commented on your video`, avatar: commenter.avatar };
                }
                else if (message === "uploaded a new video. Check it out now") {
                    const channel = yield user_1.UserModel.findOne({ email });
                    if (!channel) {
                        throw new Error('Channel not found');
                    }
                    return { displayMessage: `${channel.channelName} uploaded a new video. Check it out now`, channelLogo: channel.channelLogo };
                }
                else {
                    return { displayMessage: message };
                }
            });
            const getVideoThumbnail = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const video = yield video_1.VideoModel.findOne({ "courses.videos.videoID": videoId });
                    if (!video) {
                        throw new Error('Video not found');
                    }
                    const course = video.courses.find(course => course.videos.some(video => video.videoID === videoId));
                    if (!course) {
                        throw new Error('Course containing the video not found');
                    }
                    const videoItem = course.videos.find(video => video.videoID === videoId);
                    if (!videoItem) {
                        throw new Error('Video item not found');
                    }
                    return videoItem.videoThumbnail;
                }
                catch (error) {
                    console.error('Error fetching video thumbnail:', error);
                    throw new Error('An error occurred while fetching video thumbnail');
                }
            });
            const notifications = yield Promise.all(user.notification.map((notification) => __awaiter(void 0, void 0, void 0, function* () {
                const { displayMessage, avatar, channelLogo } = yield getMessageDetails(notification.message, notification.user);
                return {
                    isRead: notification.isRead,
                    notificationId: notification.notificationId,
                    timeStamp: notification.timeStamp,
                    videoId: notification.videoId,
                    email: notification.user,
                    message: displayMessage,
                    videoThumbnail: yield getVideoThumbnail(notification.videoId),
                    avatar,
                    channelLogo
                };
            })));
            return notifications;
        }
        catch (error) {
            console.error('Error fetching notifications:', error);
            throw new Error('An error occurred while fetching notifications');
        }
    }),
    getdetailsByChanneld: (_15, _23) => __awaiter(void 0, [_15, _23], void 0, function* (_, { channelId }) {
        var _24;
        try {
            const user = yield user_1.UserModel.findOne({ channelId: channelId });
            if (!user) {
                throw new Error('User with the specified channel ID not found');
            }
            const channelName = user.channelName;
            const channelDescription = user.channelDescription;
            const channelLogo = user.channelLogo;
            const coverPhoto = user.coverPhoto;
            const link = user.website || {};
            const subscribers = (_24 = user.subscribers) === null || _24 === void 0 ? void 0 : _24.count;
            const userEmail = user.email;
            const video = yield video_1.VideoModel.findOne({ email: userEmail });
            const noOfVideos = video === null || video === void 0 ? void 0 : video.courses.map(course => course.videos).map(video => video.length).reduce((acc, curr) => acc + curr, 0);
            return [{
                    channelName,
                    channelDescription,
                    channelLogo,
                    coverPhoto,
                    link,
                    subscribers,
                    noOfVideos,
                    channelId
                }];
        }
        catch (error) {
            console.error('Error fetching user details:', error);
            throw new Error('An error occurred while fetching user details');
        }
    }),
    getCoursesbyChannelID: (_16, _25) => __awaiter(void 0, [_16, _25], void 0, function* (_, { channelId }) {
        try {
            const user = yield user_1.UserModel.findOne({ channelId: channelId });
            if (!user) {
                throw new Error('User with the specified channel ID not found');
            }
            const email = user.email;
            const courseDetails = yield queries.getCreatorCourses(undefined, { email: email });
            return courseDetails;
        }
        catch (error) {
            console.error('Error fetching user details:', error);
            throw new Error('An error occurred while fetching user details');
        }
    }),
    getvideoByChannelId: (_17, _26) => __awaiter(void 0, [_17, _26], void 0, function* (_, { channelId }) {
        try {
            const user = yield user_1.UserModel.findOne({ channelId: channelId });
            if (!user) {
                throw new Error('User with the specified channel ID not found');
            }
            const email = user.email;
            const videoDetails = yield queries.getYourVideo(undefined, { email: email });
            return videoDetails;
        }
        catch (error) {
            console.error('Error fetching user details:', error);
            throw new Error('An error occurred while fetching user details');
        }
    })
};
exports.resolvers = { queries };
