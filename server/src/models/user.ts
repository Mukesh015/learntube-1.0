import mongoose, { Document, Model } from "mongoose";

interface UserDocument extends Document {
    email: string;
    username: string;
    password: string;
    avatar?: string;
    isCreator: boolean;
    channelName?: string;
    channelLogo?: string;
    history: any[]; 
    analytics: { date: Date; watchTime: number }[];
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
        channelName:{
            type: String,
            required: false
        },
        channelLogo:{
            type: String,
            required: false
        },
        history: [mongoose.Schema.Types.Mixed],
        analytics: [
            {
                date: { type: Date, },
                watchTime: { type: Number, }
            }
        ]
    }
);

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("Users", userSchema);

export { UserModel, UserDocument };