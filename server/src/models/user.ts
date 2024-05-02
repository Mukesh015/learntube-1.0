import mongoose, { Document, Model } from "mongoose";

interface UserDocument extends Document {
    courses: any;
    email: string;
    username: string;
    password: string;
    avatar?: string;
    isCreator: boolean;
    channelName?: string;
    channelCreatedAt?: number;
    channelLogo?: string;
    coverPhoto?: string;
    gender?: string;
    firstname?: string;
    recoveryEmail?: string;
    occupation?: string;
    channelId?: string;
    subscribers?: { count: number, users: any[] };
    subscribedChnannels?: { count: number, channelId: any[] };
    channelDescription?: string;
    website: { any: string, Facebook: string, Instagram: string, Twitter: string, Github: string, LinkedIn: string, Discord: string }
    address: { country: string; state: string; city: string; pincode: number; addressLine: string; phone: number };
    features?: {
        subscriptions: any[], playlists: any[], history: { videoId: string, timeStamp: number }[], myVideos: any[], watchLater: any[], likedVideos: any[],
        disLikedVideo: any[], comments: any[], searchHistory: any[],
    };
    EnrolledCourses?: string[];
    WatchTime?: number;

    notification: { isRead: boolean; message: string,user: string ,timeStamp:number,notificationId:string}[];
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
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
        website:
        {
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
        address:
        {
            country: { type: String, },
            state: { type: String, },
            city: { type: String, },
            pincode: { type: Number, },
            addressLine: { type: String, },
            phone: { type: Number, },
        },
        features: {
            subscriptions: [{ type: mongoose.Schema.Types.Mixed, required: false }],
            playlists: [{ type: mongoose.Schema.Types.Mixed, required: false }],
            history: [{ type: mongoose.Schema.Types.Mixed, required: false }],
            myVideos: [{ type: mongoose.Schema.Types.Mixed, required: false }],
            watchLater: [{ type: mongoose.Schema.Types.Mixed, required: false }],
            likedVideos: [{ type: mongoose.Schema.Types.Mixed, required: false }],
            disLikedVideo: [{ type: mongoose.Schema.Types.Mixed, required: false }],
            comments: [{ type: mongoose.Schema.Types.Mixed, required: false }],
            searchHistory: [{ type: mongoose.Schema.Types.Mixed, timeStamp: mongoose.Schema.Types.Mixed, required: false },]
        },
        subscribers: {
            count: { type: Number, default: 0 },
            users: [{ type: mongoose.Schema.Types.Mixed, required: false }]
        },
        subscribedChnannels: {
            count: { type: Number, default: 0 },
            channelId: [{ type: mongoose.Schema.Types.Mixed, required: false }]
        },
        notification: [
            {
                isRead: { type: Boolean,default: false },
                message: { type: String,  required: false},
                user: { type: String, required: false },
                timeStamp: { type: Date,},
                notificationId: { type: String, required: false },
            }
        ],
        EnrolledCourses:[{type:String,}],
        WatchTime: { 
            type: Number,
            required: false
        },
    }
);

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("Users", userSchema);

export { UserModel, UserDocument };