import axios from "axios";
import { VideoModel, VideoDocument } from '../../models/video';

interface VideoInfo {
    videoUrl: string;
    thumbnail: string;
}

const queries = {
    getIsCreator: async (_: any, { email }: { email: string }) => {
        try {
            const response = await axios.post('http://localhost:9063/api/getuserdetails', {
                email: email
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching isCreator:', error);
            throw new Error('Error fetching isCreator');
        }
    },
    getCourseName: async (_: any, { email }: { email: string }) => {
        try {
            const videoDetails: VideoDocument | null = await VideoModel.findOne({ email });

            if (!videoDetails) {
                throw new Error('User not found');
            }

            const courseNames: string[] = videoDetails.courses.map(course => course.courseName);

            return courseNames.map(courseName => ({ courseNames: courseName }));
        } catch (error) {
            console.error('Error fetching course names:', error);
            throw new Error('Error fetching course names');
        }
    },
    getAllVideoUrl: async () => {
        try {
            const videos: VideoDocument[] = await VideoModel.find();
            const allVideoThumbUrls: VideoInfo[] = [];

            videos.forEach(video => {
                video.courses.forEach(course => {
                    course.videos.forEach(video => {
                        allVideoThumbUrls.push({
                            videoUrl: video.videoUrl,
                            thumbnail: video.videoThumbnail 
                        });
                    });
                });
            });

            return allVideoThumbUrls.map(videothumb => ({ allVideoUrls: videothumb.videoUrl,allThumbnailUrls: videothumb.thumbnail}));
        } catch (error) {
            console.error('Error fetching video URLs:', error);
            throw new Error('Error fetching video URLs');
        }
    }
};

export const resolvers = { queries };
