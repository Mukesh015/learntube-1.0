import mongoose, { Document, Model } from "mongoose";

interface UserDocument extends Document {
    email: string;
    username: string;
    password: string;
    avatar?: string;
    history: any[]; // Adjust type according to your requirements
    analytics: { date: Date; watchTime: number }[]; // Assuming analytics store datewise watchtime
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
        history: [mongoose.Schema.Types.Mixed], // Adjust type according to your requirements
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