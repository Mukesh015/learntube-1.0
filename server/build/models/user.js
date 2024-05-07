"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    isCreator: {
        type: Boolean,
        default: false
    },
    channelName: {
        type: String,
        required: false
    },
    channelCreatedAt: {
        type: Date,
        required: false
    },
    channelId: {
        type: String,
        required: false
    },
    channelDescription: {
        type: String,
        required: false
    },
    website: {
        any: { type: String },
        Facebook: { type: String },
        Instagram: { type: String },
        Twitter: { type: String },
        Github: { type: String },
        LinkedIn: { type: String },
        Discord: { type: String }
    },
    channelLogo: {
        type: String,
        required: false
    },
    coverPhoto: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    firstname: {
        type: String,
        required: false
    },
    recoveryEmail: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    address: {
        country: { type: String, },
        state: { type: String, },
        city: { type: String, },
        pincode: { type: Number, },
        addressLine: { type: String, },
        phone: { type: Number, },
    },
    features: {
        subscriptions: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }],
        playlists: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }],
        history: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }],
        myVideos: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }],
        watchLater: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }],
        likedVideos: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }],
        disLikedVideo: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }],
        comments: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }],
        searchHistory: [{ type: mongoose_1.default.Schema.Types.Mixed, timeStamp: mongoose_1.default.Schema.Types.Mixed, required: false },]
    },
    subscribers: {
        count: { type: Number, default: 0 },
        users: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }]
    },
    subscribedChnannels: {
        count: { type: Number, default: 0 },
        channelId: [{ type: mongoose_1.default.Schema.Types.Mixed, required: false }]
    },
    notification: [
        {
            isRead: { type: Boolean, default: false },
            message: { type: String, required: false },
            user: { type: String, required: false },
            timeStamp: { type: Date, },
            notificationId: { type: String, required: false },
            videoId: { type: String, required: false }
        }
    ],
    EnrolledCourses: [{ type: String, }],
    WatchTime: {
        type: Number,
        required: false
    },
});
const UserModel = mongoose_1.default.model("Users", userSchema);
exports.UserModel = UserModel;
