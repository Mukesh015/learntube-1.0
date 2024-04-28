import { VideoModel, VideoDocument } from "../../models/video";
import { UserModel, UserDocument } from "../../models/user";
import axios from "axios";
import dotenv from "dotenv";
import { timeStamp } from "console";

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
        const hasValueHistory = history.includes(videoID);

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

            const playlistDetails: { videoId: any; videoTitle: any; videoViews: any; channelLogo: any; videoPublishedAt: any; videoThumbnail: any }[] = [];

            videos.forEach(video => {
                video.courses.forEach(course => {
                    course.videos.forEach((vid: any) => {
                        if (playlist.includes(vid.videoID)) {
                            playlistDetails.push({
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

            const watchLaterDetails: { videoId: any; videoTitle: any; videoViews: any; channelLogo: any; videoPublishedAt: any; videoThumbnail: any }[] = [];

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

            const likedVideosDetails: { videoId: any; videoTitle: any; videoViews: any; channelLogo: any; videoPublishedAt: any; videoThumbnail: any }[] = [];

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
    getchannelDetails: async(_: any, { email }: { email: string }) =>{
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
    
            const result = comments.map((comment, index) => ({
                comment: comment || "",
                logo: logos[index] || "",
                timestamp: timestamps[index] || ""
            }));
            return result;
        } catch (error) {
            console.error('Error fetching video comments:', error);
            throw error;
        }
    }
}
export const resolvers = { queries };