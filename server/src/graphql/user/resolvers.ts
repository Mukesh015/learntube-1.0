import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
import { VideoModel, VideoDocument } from "../../models/video";
import { UserModel, UserDocument } from "../../models/user";
interface VideoInfo {
    courseId: any;
    courseFees: any;
    email: string;
    videoUrl: string;
    thumbnail: string;
    videoTitle: string;
    uploadAt: Date;
    videoId: string;
    videoViews: number;
    channelLogo: string | undefined;
    channelName: string | undefined;
    channelId: string | undefined;
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
    getIsCreator: async (_: any, { email }: { email: string }) => {
        try {
            const response = await axios.post(`${process.env.server_domain}/api/getuserdetails`);
            const userDetails = response.data.find((detail: any) => detail.email === email);
            if (!userDetails) {
                return ("User not found");
            }
            return [{ isCreator: userDetails.isCreator }];
        } catch (error) {
            console.error('Error fetching isCreator:', error);
            throw new Error('Error fetching isCreator');
        }
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
    getCourseName: async (_: any, { email }: { email: string }) => {
        try {
            const response = await axios.post(`${process.env.server_domain}/video/getvideodetails`);

            const userDetails = response.data.videoDetails.find((detail: any) => detail.email === email);
            if (!userDetails) {
                return ('User details not found');
            }

            const courseNames: string[] = userDetails.courses.map((course: any) => course.courseName);

            return courseNames.map(courseName => ({ courseNames: courseName }));
        } catch (error) {
            console.error('Error fetching course names:', error);
            throw new Error('Error fetching course names');
        }
    },
    getAllVideoUrl: async () => {
        try {
            const videoDetailsResponse = await axios.post(`${process.env.server_domain}/video/getvideodetails`);
            const allVideoThumbUrls: VideoInfo[] = [];

            for (const video of videoDetailsResponse.data.videoDetails) {
                for (const course of video.courses) {
                    for (const Video of course.videos) {
                        const channelLogoResponse = await queries.getChannelLogo(undefined, { email: video.email });
                        const channelLogo = channelLogoResponse.find((logo: { email: string; }) => logo.email === video.email)?.channelLogo;
                        const channelName = channelLogoResponse.find((logo: { email: string; }) => logo.email === video.email)?.channelName;
                        const channelId=channelLogoResponse.find((logo: { email: string; }) => logo.email === video.email)?.channelId;
                        const courseFees = course.courseFess.price === null ? null : course.courseFess.price;
                        const courseId = course.courseId
                        allVideoThumbUrls.push({
                            email: video.email,
                            videoUrl: Video.videoUrl,
                            thumbnail: Video.videoThumbnail,
                            videoTitle: Video.videoTitle,
                            uploadAt: Video.videoPublishedAt,
                            videoId: Video.videoID,
                            videoViews: Video.videoViewCount,
                            channelLogo: channelLogo,
                            channelName: channelName,
                            courseFees: courseFees,
                            courseId: courseId,
                            channelId: channelId
                        });
                    }
                }
            }
            return allVideoThumbUrls.map(videothumb => ({
                allVideoUrls: videothumb.videoUrl,
                allThumbnailUrls: videothumb.thumbnail,
                allVideoTitles: videothumb.videoTitle,
                allEmail: videothumb.email,
                uploadAt: videothumb.uploadAt,
                videoId: videothumb.videoId,
                views: videothumb.videoViews,
                channelLogo: videothumb.channelLogo,
                channelName: videothumb.channelName,
                courseFees: videothumb.courseFees,
                courseId: videothumb.courseId,
                channelId: videothumb.channelId
            }));
        } catch (error) {
            console.error('Error fetching video URLs:', error);
            throw new Error('Error fetching video URLs');
        }
    },
    getVideoUrl: async (_: any, { email, videoID }: { email: string, videoID: string }) => {
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
                throw new Error("URL not found");
            }
            const video = entry.courses.flatMap(course => course.videos).find(video => video.videoID === videoID);
            const channelLogoResponse = await queries.getChannelLogo(undefined, { email: entry.email });
            const channelLogo = channelLogoResponse.find((logo: { email: string; }) => logo.email === entry.email)?.channelLogo;
            const channelName = channelLogoResponse.find((name: { email: string; }) => name.email === entry.email)?.channelName;
            const creatorEmail = channelLogoResponse.find((name: { email: string; }) => name.email === entry.email)?.email;
            const channelId = channelLogoResponse.find((name: { email: string; }) => name.email === entry.email)?.channelId;

            if (!video) {
                throw new Error("videoID not found");
            }

            if (!video.videoUrl) {
                throw new Error("videoUrl not found");
            }

            return [{
                videoURl: video.videoUrl, videoDescription: video.videoDescription, videoTitle: video.videoTitle,
                videoViews: video.videoViews.length, videoPublishedAt: video.videoPublishedAt, videoTags: video.videoTags,
                channelLogo: channelLogo, channelName: channelName, creatorEmail: creatorEmail, channelId: channelId,
            }];
        } catch (error) {
            console.error("Error redirecting:", error);
            throw new Error("Internal Server Error");
        }
    },

    getSearchBarDetails: async (_: any, { email }: { email: string }) => {
        try {
            const response = await axios.post(`${process.env.server_domain}/video/getvideodetails`);
            const videos = response.data.videoDetails;
            const courses = videos.flatMap((video: { courses: any; }) => video.courses);
            const videoDetails = courses.flatMap((course: { videos: any; }) => course.videos).map((video: { videoTitle: any; videoDescription: any; videoTags: any; }) => ({
                videoTitle: video.videoTitle,
                videoDescription: video.videoDescription,
                videoTags: video.videoTags
            }));


            const users = await UserModel.find({ email });
            if (users) {
                const searchHistory = users.map(user => user.features?.searchHistory).filter(history => history);
                const flattenedSearchHistory = searchHistory.flat();
                return videoDetails.map((videoDetail: any) => ({
                    ...videoDetail,
                    searchHistory: flattenedSearchHistory
                }));
            }

            return videoDetails.map((videoDetail: any) => ({
                ...videoDetail,
                searchHistory: []
            }));
        } catch (error) {
            console.error('Error fetching search bar details:', error);
            throw new Error('Error fetching search bar details');
        }
    },
    getSearchQueryDetails: async (_: any, { query }: { query: string }) => {
        try {
            const videos: VideoDocument[] = await VideoModel.find({
                $or: [
                    { 'courses.videos.videoTitle': { $regex: new RegExp(query, 'i') } },
                    { 'courses.videos.videoDescription': { $regex: new RegExp(query, 'i') } },
                    { 'courses.videos.videoTags': { $in: [query] } }
                ]
            });
            const channelLogoResponse = await queries.getChannelLogo(undefined, { email: videos.map(item => item.email) });


            const searchResults = videos.flatMap(Video =>
                Video.courses.flatMap(course =>
                    course.videos.map(video => ({
                        courseID: course.courseId,
                        courseFees: course.courseFees.price,
                        videoUrl: video.videoUrl,
                        videoID: video.videoID,
                        videoDescription: video.videoDescription,
                        videoTags: video.videoTags,
                        videoTitle: video.videoTitle,
                        channelName: channelLogoResponse.find((name: { email: string; }) => name.email === Video.email)?.channelName,
                        channelLogo: channelLogoResponse.find((name: { email: string; }) => name.email === Video.email)?.channelLogo,
                        email: Video.email,
                        videoPublishedAt: video.videoPublishedAt,
                        videoThumbnail: video.videoThumbnail,
                        videoViews: video.videoViews.length,
                    }))
                )
            );

            const sortedResults = searchResults.sort((a, b) => {
                if (a.videoTitle.toLowerCase().includes(query.toLowerCase())) return -1;
                if (b.videoTitle.toLowerCase().includes(query.toLowerCase())) return 1;
                if ((a.videoTags as string[]).includes(query)) return -1;
                if ((b.videoTags as string[]).includes(query)) return 1;
                return 0;
            });

            return sortedResults;
        } catch (error) {
            console.error('Error fetching search query details:', error);
            throw new Error('Error fetching search query details');
        }
    }
    

};

export const resolvers = { queries };
