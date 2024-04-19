import mongoose, { Document, Model } from "mongoose";

interface VideoDocument extends Document {
    email: string;
    courses: Course[];
}

interface Course {
    courseName: string;
    courseThumbUrl: string;
    courseDescription: string;
    courseFess: { free: number, paid: number }; 
    videos: Video[];
}

interface Video {
    videoUrl: string;
    videoTitle: string;
    videoDescription: string;
    videoThumbnail: string;
    videoPublishedAt: Date;
    videoTags: [];
    videoViewCount: number;
    videoLikeCount: number;
    videoDislikeCount: number;
    videoComment: number;
}

const videoSchema = new mongoose.Schema<VideoDocument>(
    {
        email: {
            type: String,
            required: true,
        },
        courses: [
            {
                courseName: { type: String },
                courseThumbUrl: { type: String },
                courseDescription: { type: String },
                courseFess: {
                    free: { type: Number }, 
                    paid: { type: Number },
                },
                videos: [
                    {
                        videoUrl: { type: String },
                        videoTitle: { type: String },
                        videoDescription: { type: String },
                        videoThumbnail: { type: String },
                        videoPublishedAt: { type: Date },
                        videoTags: { type: Array<String> },
                        videoViewCount: { type: Number, default:0},
                        videoLikeCount: { type: Number, default:0},
                        videoDislikeCount: { type: Number, default:0},
                        videoComment: { type: Number, default:0},
                    }
                ]
            }
        ],

    }
);

const VideoModel: Model<VideoDocument> = mongoose.model<VideoDocument>("Videos", videoSchema);

export { VideoModel, VideoDocument };
