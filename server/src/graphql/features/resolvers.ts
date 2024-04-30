import { VideoModel, VideoDocument } from "../../models/video";
import { UserModel, UserDocument } from "../../models/user";
import axios from "axios";
import dotenv from "dotenv";


dotenv.config({ path: "../.env" });


interface UserFeatures {
    playlists?: string[];
    history?: string[];
    myVideos?: string[];
    watchLater?: string[];
    likedVideos?: string[];
    disLikedVideo?: string[];
}
interface User {
    channelId: any;
    email: string;
    username: string;
    password: string;
    avatar: string;
    isCreator: boolean;
    videoId: string;
    videoViews: any;
    channelName?: string;
    channelLogo?: string;
    history: any[];
    analytics: any[];
}
const queries = {
    getFeatures: async (_: any, { email, videoID, channelId }: { email: string, videoID: string, channelId: string }) => {
        const user: UserDocument | null = await UserModel.findOne({ email });
        if (!user) {
            return "USer not found";
        }
        const playlist = user.features?.playlists || [];
        const hasValuePlayList = playlist.includes(videoID);


        const history = user.features?.history || [];
        const hasValueHistory = history.map(history=>history.videoId).includes(videoID);

        const myVideos = user.features?.myVideos || [];
        const hasValueMyVideos = myVideos.includes(videoID);


        const watchLater = user.features?.watchLater || [];
        const hasValueWatchLater = watchLater.includes(videoID);

        const likedVideos = user.features?.likedVideos || [];
        const hasValueLikedVideos = likedVideos.includes(videoID);

        const dislikedVideos = user.features?.disLikedVideo || [];
        const hasValueDislikedVideos = dislikedVideos.includes(videoID);

        const subsCribed = user.subscribedChnannels?.channelId || [];
        const hasValueSubscribed = subsCribed.includes(channelId);


        return [{
            haveInPlaylist: hasValuePlayList, hasInHistory: hasValueHistory, haveInMyVideos: hasValueMyVideos,
            haveInWatchLater: hasValueWatchLater, isLiked: hasValueLikedVideos, dislikedVideos: hasValueDislikedVideos,
            subscribedchannel: hasValueSubscribed
        }];
    },
    getChannelLogo: async (undefined: undefined, p0: { email: any; }) => {
        try {
            const response = await axios.post(`${process.env.server_domain}/api/getuserdetails`);
            const userDetails: User[] = response.data;
            const creators = userDetails.filter(user => user.isCreator);
            return creators.map(creator => ({
                channelLogo: creator.channelLogo, email: creator.email, channelName: creator.channelName,
                channelId: creator.channelId
            }));
        } catch (error) {
            console.error('Error fetching channellogo:', error);
            throw new Error('Error fetching channellogo');
        }
    },

    getPlaylist: async (_: any, { email }: { email: string }) => {
        try {
            const user: UserDocument | null = await UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }

            const videos: VideoDocument[] | null = await VideoModel.find();

            if (!videos) {
                throw new Error("Videos not found");
            }
            const channelLogoResponse = await queries.getChannelLogo(undefined, { email: videos.map(email => email.email) });

            const playlist = user.features?.playlists || [];

            const playlistDetails: {
                videoId: any; videoTitle: any; videoViews: any; channelLogo: any; videoPublishedAt: any;
                videoThumbnail: any; courseID: any, courseFees: any
            }[] = [];

            videos.forEach(video => {
                video.courses.forEach(course => {
                    course.videos.forEach((vid: any) => {
                        if (playlist.includes(vid.videoID)) {
                            playlistDetails.push({
                                courseID: course.courseId,
                                courseFees: course.courseFees.price,
                                videoId: vid.videoID,
                                videoTitle: vid.videoTitle,
                                videoViews: vid.videoViews.length,
                                videoPublishedAt: vid.videoPublishedAt,
                                videoThumbnail: vid.videoThumbnail,
                                channelLogo: channelLogoResponse.find((logo: { email: string; }) => logo.email === video.email)?.channelLogo,
                            });
                        }
                    });
                });
            });

            return playlistDetails;
        } catch (error) {
            console.log(error);
            throw new Error("An error occurred while fetching user playlist.");
        }
    },
    getWatchLater: async (_: any, { email }: { email: string }) => {
        try {
            const user: UserDocument | null = await UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }

            const videos: VideoDocument[] | null = await VideoModel.find();

            if (!videos) {
                throw new Error("Videos not found");
            }
            const channelLogoResponse = await queries.getChannelLogo(undefined, { email: videos.map(email => email.email) });

            const watchLater = user.features?.watchLater || [];

            const watchLaterDetails: {
                videoId: any; videoTitle: any; videoViews: any; channelLogo: any; videoPublishedAt: any;
                videoThumbnail: any; courseId: any, courseFees: any
            }[] = [];

            videos.forEach(video => {
                video.courses.forEach(course => {
                    course.videos.forEach((vid: any) => {
                        if (watchLater.includes(vid.videoID)) {
                            watchLaterDetails.push({
                                videoId: vid.videoID,
                                videoTitle: vid.videoTitle,
                                videoViews: vid.videoViews.length,
                                videoPublishedAt: vid.videoPublishedAt,
                                videoThumbnail: vid.videoThumbnail,
                                courseId: course.courseId,
                                courseFees: course.courseFees.price,
                                channelLogo: channelLogoResponse.find((logo: { email: string; }) => logo.email === video.email)?.channelLogo,

                            });
                        }
                    });
                });
            });

            return watchLaterDetails;
        } catch (error) {
            console.log(error);
            throw new Error("An error occurred while fetching user playlist.");
        }
    },
    getHistory: async (_: any, { email }: { email: string }) => {
        try {
            const user: UserDocument | null = await UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }
    
            const videos: VideoDocument[] | null = await VideoModel.find();
    
            if (!videos) {
                throw new Error("Videos not found");
            }
    
            const channelLogoResponse = await queries.getChannelLogo(undefined, { email: videos.map(email => email.email) });
    
            const history = user.features?.history || [];
    
            const historyDetails: {
                videoId: any; videoTitle: any; videoViews: any; channelLogo: any; videoPublishedAt: any;
                videoThumbnail: any; courseID: any; courseFees: any; viewedAt: any;
            }[] = [];
    
            videos.forEach(video => {
                video.courses.forEach(course => {
                    course.videos.forEach((vid: any) => {
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
                                viewedAt:`${viewedHistory.timeStamp}`, // Convert timestamp to a readable format
                                channelLogo: channelLogoResponse.find((logo: { email: string; }) => logo.email === video.email)?.channelLogo,
                            });
                        }
                    });
                });
            });
    
            return historyDetails;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching user playlist.");
        }
    },
    getLikedVideos: async (_: any, { email }: { email: string }) => {
        try {
            const user: UserDocument | null = await UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }

            const videos: VideoDocument[] | null = await VideoModel.find();

            if (!videos) {
                throw new Error("Videos not found");
            }
            const channelLogoResponse = await queries.getChannelLogo(undefined, { email: videos.map(email => email.email) });

            const likedVideos = user.features?.likedVideos || [];

            const likedVideosDetails: {
                videoId: any; videoTitle: any; videoViews: any; channelLogo: any; videoPublishedAt: any;
                videoThumbnail: any; courseId: any; courseFees: any
            }[] = [];

            videos.forEach(video => {
                video.courses.forEach(course => {
                    course.videos.forEach((vid: any) => {
                        if (likedVideos.includes(vid.videoID)) {
                            likedVideosDetails.push({
                                videoId: vid.videoID,
                                videoTitle: vid.videoTitle,
                                videoViews: vid.videoViews.length,
                                videoPublishedAt: vid.videoPublishedAt,
                                videoThumbnail: vid.videoThumbnail,
                                courseId: course.courseId,
                                courseFees: course.courseFees.price,
                                channelLogo: channelLogoResponse.find((logo: { email: string; }) => logo.email === video.email)?.channelLogo,
                            });
                        }
                    });
                });
            });

            return likedVideosDetails;
        } catch (error) {
            console.log(error);
            throw new Error("An error occurred while fetching user playlist.");
        }
    },
    getchannelDetails: async (_: any, { email }: { email: string }) => {
        try {
            const user: UserDocument | null = await UserModel.findOne({ email });
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
                }
            ];
        } catch (error) {
            console.log(error);
            throw new Error("An error occurred while fetching getchannelDetails");
        }
    },
    getYourVideo: async (_: any, { email }: { email: string }) => {
        try {
            const videos = await VideoModel.findOne({ email });

            if (!videos || !videos.courses) {
                return [];
            }

            const formattedVideos = videos.courses.reduce((acc: any[], course) => {
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
        } catch (error) {
            console.error('Error fetching videos:', error);
            throw error;
        }

    },
    getCreatorCard: async (_: any, { email }: { email: string }) => {
        try {
            const user: UserDocument | null = await UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }

            const videos: VideoDocument[] | null = await VideoModel.find({ email });
            if (!videos) {
                return "Videos not found";
            }

            let totalComments = 0;
            videos.forEach(video => {
                video.courses.forEach(course => {
                    if (course.videos) {
                        course.videos.forEach(video => {
                            if (video.videoComments) {
                                totalComments += video.videoComments.count;
                            }
                        });
                    }
                });
            });

            return [{
                subscriber: user.subscribers?.count,
                watchTime: user.WatchTime,
                totalComments: totalComments
            }];
        } catch (error) {
            console.log(error);
            throw new Error("An error occurred while fetching getCreatorCard");
        }
    },
    getComments: async (_: any, { videoID }: { videoID: string }) => {
        try {
            const video = await VideoModel.findOne({ "courses.videos.videoID": videoID });
            if (!video) {
                throw new Error('Video not found');
            }

            const courseWithVideo = video.courses.find(course =>
                course.videos.some(video => video.videoID === videoID)
            );

            if (!courseWithVideo || !courseWithVideo.videos) {
                return [];
            }

            const videoComments = courseWithVideo.videos.map(video => video.videoComments);

            const comments = videoComments.flatMap(comment => comment?.comments.comment || []);
            const logos = videoComments.flatMap(comment => comment?.comments.logo || []);
            const timestamps = videoComments.flatMap(comment => comment?.comments.timestamp || []);
            const users = videoComments.flatMap(comment => comment?.comments.user || []);
            const result = comments.map((comment, index) => ({
                comment: comment || "",
                logo: logos[index] || "",
                timestamp: timestamps[index] || "",
                users: users[index] || ""
            }));
            return result;
        } catch (error) {
            console.error('Error fetching video comments:', error);
            throw error;
        }
    },
    getYourCourse: async (_: any, { email }: { email: string }) => {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }

            const enrolledCourses = user.EnrolledCourses || [];
            const courseDetails = [];


            for (const courseId of enrolledCourses) {

                const course = await VideoModel.findOne({ "courses.courseId": courseId });
                if (course) {

                    const courseInfo = course.courses.find(c => c.courseId === courseId);
                    const courseName = courseInfo?.courseName || '';
                    const courseThumbUrl = courseInfo?.courseThumbUrl || '';
                    const courseDescription = courseInfo?.courseDescription || '';

                    const courseCreatorEmail = course.email;

                    // Fetch channelLogo and channelName based on the course creator's email
                    const channelInfo = await queries.getChannelLogo(undefined, { email: courseCreatorEmail });
                    const channelLogo = channelInfo.find((info: { email: string }) => info.email === courseCreatorEmail)?.channelLogo || '';
                    const channelName = channelInfo.find((info: { email: string }) => info.email === courseCreatorEmail)?.channelName || '';

                    const videos = courseInfo?.videos || [];
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
        } catch (error) {
            console.error('Error fetching user courses:', error);
            throw new Error('An error occurred while fetching user courses');
        }
    },
    getSubscribedChannels: async(_: any, { email }: { email: string }) => {
        try {
            const user: UserDocument | null = await UserModel.findOne({ email });
            if (!user) {
                return "User not found";
            }
    
            const subscribedChannels = user.subscribedChnannels?.channelId || [];
            const channelDetails = [];
            for (const channelId of subscribedChannels) {
                const channel = await UserModel.findOne({ "channelId": channelId });
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
        } catch (error) {
            console.error('Error fetching subscribed channels:', error);
            throw new Error('An error occurred while fetching subscribed channels');
        }
    }
}
export const resolvers = { queries };