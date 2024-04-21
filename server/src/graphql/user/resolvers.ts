import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

interface VideoInfo {
    email: string;
    videoUrl: string;
    thumbnail: string;
    videoTitle: string;
    uploadAt: Date;
    videoId: string;
    channelLogo?: string;
}
interface User {
    email: string;
    username: string;
    password: string;
    avatar: string;
    isCreator: boolean;
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
            return creators.map(creator => ({ channelLogo: creator.channelLogo, email: creator.email }));
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
                        allVideoThumbUrls.push({
                            email: video.email,
                            videoUrl: Video.videoUrl,
                            thumbnail: Video.videoThumbnail,
                            videoTitle: Video.videoTitle,
                            uploadAt: Video.videoPublishedAt,
                            videoId: Video.videoId,

                            channelLogo: channelLogo
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
                channelLogo: videothumb.channelLogo
            }));
        } catch (error) {
            console.error('Error fetching video URLs:', error);
            throw new Error('Error fetching video URLs');
        }
    }

};

export const resolvers = { queries };
