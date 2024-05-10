"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const videoSchema = new mongoose_1.default.Schema({
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
                    videoTags: { type: (Array) },
                    videoViews: [{ user: String, timestamp: Number }],
                    videoLikeCount: { type: Number, default: 0 },
                    videoDislikeCount: { type: Number, default: 0 },
                    videoComments: {
                        count: {
                            type: Number,
                            default: 0,
                        },
                        comments: {
                            user: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }],
                            logo: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }],
                            comment: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }],
                            timestamp: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }]
                        }
                    },
                }
            ]
        }
    ],
});
const VideoModel = mongoose_1.default.model("Videos", videoSchema);
exports.VideoModel = VideoModel;
