"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEnrolled = exports.courseEnrollment = exports.subscribe = exports.generateOtp = exports.userValidation = exports.getUserDetails = exports.createChannel = exports.register = void 0;
const user_1 = require("../models/user");
const user_2 = require("../middlewares/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary = __importStar(require("cloudinary"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password } = req.body;
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            let avatar = null;
            if (req.file && req.file.path) {
                const result = yield cloudinary.v2.uploader.upload(req.file.path);
                avatar = result.url;
            }
            const newUser = new user_1.UserModel({
                username: username,
                email: email,
                password: hashedPassword,
                avatar: avatar,
            });
            yield newUser.save();
            res.status(201).json({ message: "User registered successfully", user: newUser });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error", error: error });
        }
    });
}
exports.register = register;
function cloudinaryImageUploadMethod(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload(file, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ res: res.url });
                }
            });
        });
    });
}
function createChannel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, channelName, firstName, gender, contactNumber, city, state, country, pinCode, recoveryEmail, channelAdminName, ChannelDescription, any, Facebook, Instagram, Twitter, Github, LinkedIn, Discord, addressLine } = req.body;
        console.log(email, channelName, firstName, gender, contactNumber, city, state, country, pinCode, recoveryEmail, channelAdminName, ChannelDescription, addressLine);
        const contactnumber = parseInt(contactNumber);
        const pincode = parseInt(pinCode);
        const channelId = `@${channelName}`;
        console.log("email", email);
        let channelLogo = null;
        let coverPhoto = null;
        try {
            const user = yield user_1.UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (user.isCreator == true) {
                return res.status(400).json({ message: 'User already has a channel' });
            }
            const urls = [];
            const files = req.files;
            for (const file of files) {
                const { path } = file;
                try {
                    const newPath = yield cloudinaryImageUploadMethod(path);
                    urls.push(newPath.res);
                }
                catch (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error uploading image' });
                }
            }
            channelLogo = urls[0];
            coverPhoto = urls[1];
            user.isCreator = true;
            user.channelName = channelName;
            user.channelLogo = channelLogo;
            user.channelCreatedAt = Date.now();
            user.coverPhoto = coverPhoto;
            user.firstname = firstName;
            user.gender = gender;
            user.recoveryEmail = recoveryEmail;
            user.channelId = channelId;
            user.channelDescription = ChannelDescription;
            user.website = { any, Facebook, Twitter, Instagram, Github, LinkedIn, Discord };
            user.address = { country, state, city, pincode: pincode, addressLine, phone: contactnumber };
            yield user.save();
            res.status(200).json({ message: 'Channel created successfully' });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: err });
        }
    });
}
exports.createChannel = createChannel;
function getUserByUsername(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.UserModel.findOne({ email });
            return user;
        }
        catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    });
}
function getUserDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_1.UserModel.find();
            if (users && users.length > 0) {
                const userDetailsArray = users.map(user => ({
                    email: user.email,
                    username: user.username,
                    password: user.password,
                    avatar: user.avatar,
                    isCreator: user.isCreator,
                    channelName: user.channelName,
                    channelLogo: user.channelLogo,
                    channelId: user.channelId,
                    watchTime: user.WatchTime
                }));
                res.status(200).json(userDetailsArray);
            }
            else {
                res.status(404).json({ message: 'Users not found' });
            }
        }
        catch (error) {
            console.error('Error fetching user details:', error);
            res.status(500).json({ message: 'Server error' });
        }
    });
}
exports.getUserDetails = getUserDetails;
function userValidation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, avatar } = req.body;
        if (email) {
            try {
                const existingUser = yield user_1.UserModel.findOne({ email });
                if (existingUser) {
                    res.status(200).send({ message: "User already exists" });
                }
                else {
                    const newUser = new user_1.UserModel({ email: email, username: username, avatar: avatar, password: `${username}@${Date.now()}` });
                    yield newUser.save();
                    res.status(201).send({ message: "User registered successfully", user: newUser });
                }
            }
            catch (error) {
                console.error("Error:", error);
                res.status(500).send({ message: "Internal Server Error" });
            }
        }
    });
}
exports.userValidation = userValidation;
function generateOtp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body;
        let newotp = "";
        for (let i = 0; i <= 3; i++) {
            newotp += Math.floor(Math.random() * 10).toString();
        }
        try {
            const mailOptions = {
                from: "bikikutta25@gmail.com",
                to: email.email,
                subject: "OTP-Verification",
                text: `Please use the code below to confirm your email address. This code will expire in 2 hours. If you don't think you should be receiving this email, you can safely ignore it. 
        ${newotp}`,
            };
            user_2.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).send("Error sending email");
                }
                else {
                    console.log("Email sent: " + info.response);
                }
            });
            res.status(200).send({ message: "OTP sent successfully", otp: newotp });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ message: "OTP generation failed" });
        }
    });
}
exports.generateOtp = generateOtp;
function subscribe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, channelId, creatorEmail } = req.body;
        console.log(email, channelId, creatorEmail);
        try {
            // Check if both email and creatorEmail exist
            if (!email || !creatorEmail) {
                return res.status(400).json({ error: "Email and creatorEmail are required" });
            }
            // Find the user by email
            const user = yield user_1.UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            // Check if the channel is already subscribed
            if (user.subscribedChnannels && user.subscribedChnannels.channelId.includes(channelId)) {
                // Remove the channelId from subscribedChannels and decrement the count
                const index = user.subscribedChnannels.channelId.indexOf(channelId);
                user.subscribedChnannels.channelId.splice(index, 1);
                user.subscribedChnannels.count--;
                yield user.save();
                const creatorUser = yield user_1.UserModel.findOne({ email: creatorEmail });
                if (!creatorUser) {
                    return res.status(404).json({ error: "Creator user not found" });
                }
                // Remove the email from the creatorUser's subscribers users array and decrement the count
                // @ts-ignore
                const subscriberIndex = creatorUser.subscribers.users.indexOf(email);
                if (creatorUser.subscribers) {
                    creatorUser.subscribers.users.splice(subscriberIndex, 1);
                    creatorUser.subscribers.count--;
                }
                // Save the updated creatorUser document
                yield creatorUser.save();
                return res.status(200).json({ message: "Unsubscribed successfully" });
            }
            // Add the channelId to the subscribedChannels channelId array and increment the count
            if (!user.subscribedChnannels) {
                user.subscribedChnannels = { count: 0, channelId: [] };
            }
            user.subscribedChnannels.channelId.push(channelId);
            user.subscribedChnannels.count++;
            // Save the updated user document
            yield user.save();
            // Find the creator user by creatorEmail
            const creatorUser = yield user_1.UserModel.findOne({ email: creatorEmail });
            if (!creatorUser) {
                return res.status(404).json({ error: "Creator user not found" });
            }
            // Add the email to the creatorUser's subscribers users array and increment the count
            if (!creatorUser.subscribers) {
                creatorUser.subscribers = { count: 0, users: [] };
            }
            creatorUser.subscribers.users.push(email);
            creatorUser.subscribers.count++;
            // Save the updated creatorUser document
            yield creatorUser.save();
            return res.status(200).json({ message: "Subscription added successfully" });
        }
        catch (error) {
            console.error("Error adding subscription:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.subscribe = subscribe;
function courseEnrollment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { email, courseId } = req.body;
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            (_a = user.EnrolledCourses) === null || _a === void 0 ? void 0 : _a.push(courseId);
            yield user.save();
            return res.status(200).json({ message: "course Enrolled sucessfully" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.courseEnrollment = courseEnrollment;
function isEnrolled(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { email, courseId } = req.body;
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const isEnrolled = (_a = user.EnrolledCourses) === null || _a === void 0 ? void 0 : _a.includes(courseId);
            return res.status(200).json({ isEnrolled: isEnrolled });
        }
        catch (error) {
            console.error("Error checking enrollment:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
exports.isEnrolled = isEnrolled;
