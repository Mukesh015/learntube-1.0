import mongoose, { Document, Model } from "mongoose";

interface VideoDocument extends Document {
    email: string;
    courses: Course[];
}

interface Course {
    courseName: string;
    courseThumbUrl: string;
    courseDescription: string;
    courseId: string;
    courseFees: { price: number };
    videos: Video[];
}

interface Video {
    videoUrl: string;
    videoTitle: string;
    videoID: string;
    videoDescription: string;
    videoThumbnail: string;
    videoPublishedAt: Date;
    videoTags: [];
    videoViews: [{ user: string, timestamp: number }];
    videoLikeCount: number;
    videoDislikeCount: number;
    videoComments?: {
        count: number,
        comments: {
            user: any[],
            logo: any[],
            comment: any[],
            timestamp: any[]
        }
    };
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
                courseId: { type: String },
                courseFees: {
                    price: { type: Number, default: 0 },
                },
                videos: [
                    {
                        videoUrl: { type: String },
                        videoTitle: { type: String },
                        videoID: { type: String },
                        videoDescription: { type: String },
                        videoThumbnail: { type: String },
                        videoPublishedAt: { type: Date },
                        videoTags: { type: Array<String> },
                        videoViews: [{ user: String, timestamp: Number }],
                        videoLikeCount: { type: Number, default: 0 },
                        videoDislikeCount: { type: Number, default: 0 },
                        videoComments: {
                            count: {
                                type: Number,
                                default: 0,
                            },
                            comments: {
                                user: [{ type: mongoose.Schema.Types.Mixed, required: false }],
                                logo: [{ type: mongoose.Schema.Types.Mixed, required: false }],
                                comment: [{ type: mongoose.Schema.Types.Mixed, required: false }],
                                timestamp: [{ type: mongoose.Schema.Types.Mixed, required: false }]
                            }
                        },
                    }
                ]
            }
        ],

    }
);

const VideoModel: Model<VideoDocument> = mongoose.model<VideoDocument>("Videos", videoSchema);

export { VideoModel, VideoDocument };