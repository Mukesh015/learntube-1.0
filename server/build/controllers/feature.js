"use strict";
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
exports.makepayment = exports.dynamicChanges = exports.clearAllNotifiacation = exports.clearNotification = exports.markAsRead = exports.calculateWatchTime = exports.addToDislikedVideo = exports.addSubscription = exports.addToMyVideos = exports.addToWatchLater = exports.addToLikedVideo = exports.removeSearchHistory = exports.addSearchHistory = exports.addToHistory = exports.addToPlaylist = void 0;
const user_1 = require("../models/user");
const video_1 = require("../models/video");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const stripe = require('stripe')(process.env.stripe_secret);
function addToPlaylist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const { email, videoId } = req.body;
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const videoIdString = String(videoId);
            const index = (_a = user.features) === null || _a === void 0 ? void 0 : _a.playlists.indexOf(videoIdString);
            if (index !== -1 && ((_b = user.features) === null || _b === void 0 ? void 0 : _b.playlists)) {
                yield user_1.UserModel.updateOne({ email: email }, { $pull: { 'features.playlists': videoIdString } });
                res.status(200).json({ message: 'Video removed from playlists' });
            }
            else if ((_c = user.features) === null || _c === void 0 ? void 0 : _c.playlists) {
                user.features.playlists.push(videoIdString);
                yield user.save();
                res.status(200).json({ message: 'Video added to playlists' });
            }
            else {
                console.error('User features or playlists are undefined');
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        catch (error) {
            console.error('Error adding/removing video to/from playlist:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
exports.addToPlaylist = addToPlaylist;
function addToHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const { email, videoId } = req.body;
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            else {
                if ((_a = user.features) === null || _a === void 0 ? void 0 : _a.history.includes(videoId)) {
                    return res.status(200).json({ message: 'Video already exists in history' });
                }
                const entry = {
                    videoId,
                    timeStamp: Date.now()
                };
                (_b = user.features) === null || _b === void 0 ? void 0 : _b.history.push(entry);
                yield user.save();
                return res.status(200).json({ message: 'Video added to history' });
            }
        }
        catch (error) {
            console.error('Error adding video to history:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
exports.addToHistory = addToHistory;
function addSearchHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { email, searchString } = req.body;
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            else {
                (_a = user.features) === null || _a === void 0 ? void 0 : _a.searchHistory.push(searchString);
                yield user.save();
                return res.status(200).json({ message: 'searchString added to searchHistory' });
            }
        }
        catch (error) {
            console.error('Error adding video to history:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
exports.addSearchHistory = addSearchHistory;
function removeSearchHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const { email, searchString } = req.body;
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            else {
                const SearchString = String(searchString);
                const index = (_a = user.features) === null || _a === void 0 ? void 0 : _a.searchHistory.indexOf(SearchString);
                if (index !== -1 && ((_b = user.features) === null || _b === void 0 ? void 0 : _b.searchHistory)) {
                    yield user_1.UserModel.updateOne({ email: email }, { $pull: { 'features.searchHistory': searchString } });
                    return res.status(200).json({ message: 'searchString removed from searchHistory' });
                }
            }
        }
        catch (error) {
            console.error('Error adding video to history:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
exports.removeSearchHistory = removeSearchHistory;
function addToLikedVideo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const { email, videoId } = req.body;
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const videoIdString = String(videoId);
            const index1 = (_a = user.features) === null || _a === void 0 ? void 0 : _a.disLikedVideo.indexOf(videoIdString);
            if (index1 !== -1 && ((_b = user.features) === null || _b === void 0 ? void 0 : _b.disLikedVideo)) {
                yield user_1.UserModel.updateOne({ email }, { $pull: { 'features.disLikedVideo': videoIdString } });
            }
            const index = (_c = user.features) === null || _c === void 0 ? void 0 : _c.likedVideos.indexOf(videoIdString);
            if (index !== -1 && ((_d = user.features) === null || _d === void 0 ? void 0 : _d.likedVideos)) {
                yield user_1.UserModel.updateOne({ email: email }, { $pull: { 'features.likedVideos': videoIdString } });
                res.status(200).json({ message: 'Video removed from likedvideos' });
            }
            else if ((_e = user.features) === null || _e === void 0 ? void 0 : _e.likedVideos) {
                yield user_1.UserModel.updateOne({ email: email }, { $push: { 'features.likedVideos': videoIdString } });
                yield video_1.VideoModel.updateOne({ "courses.videos.videoID": videoIdString }, { $inc: { "courses.$[].videos.$[video].videoLikeCount": 1 } }, { arrayFilters: [{ "video.videoID": videoIdString }] });
                res.status(200).json({ message: 'Video added to likedvideos' });
            }
            else {
                console.error('User features or likedvideos are undefined');
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        catch (error) {
            console.error('Error adding/removing video to/from likedvideos:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
exports.addToLikedVideo = addToLikedVideo;
function addToWatchLater(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const { email, videoId } = req.body;
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const videoIdString = String(videoId);
            const index = (_a = user.features) === null || _a === void 0 ? void 0 : _a.watchLater.indexOf(videoIdString);
            if (index !== -1 && ((_b = user.features) === null || _b === void 0 ? void 0 : _b.watchLater)) {
                yield user_1.UserModel.updateOne({ email: email }, { $pull: { 'features.watchLater': videoIdString } });
                res.status(200).json({ message: 'Video removed from watchlater' });
            }
            else if ((_c = user.features) === null || _c === void 0 ? void 0 : _c.watchLater) {
                user.features.watchLater.push(videoIdString);
                yield user.save();
                res.status(200).json({ message: 'Video added to watchlater' });
            }
            else {
                console.error('User features or watchlater are undefined');
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        catch (error) {
            console.error('Error adding/removing video to/from watchlater:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
exports.addToWatchLater = addToWatchLater;
function addToMyVideos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const { email, videoId } = req.body;
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const videoIdString = String(videoId);
            const index = (_a = user.features) === null || _a === void 0 ? void 0 : _a.myVideos.indexOf(videoIdString);
            if (index !== -1 && ((_b = user.features) === null || _b === void 0 ? void 0 : _b.myVideos)) {
                yield user_1.UserModel.updateOne({ email: email }, { $pull: { 'features.myVideos': videoIdString } });
                res.status(200).json({ message: 'Video removed from myvideos' });
            }
            else if ((_c = user.features) === null || _c === void 0 ? void 0 : _c.myVideos) {
                user.features.myVideos.push(videoIdString);
                yield user.save();
                res.status(200).json({ message: 'Video added to myvideos' });
            }
            else {
                console.error('User features or myvideos are undefined');
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        catch (error) {
            console.error('Error adding/removing video to/from myvideos:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
exports.addToMyVideos = addToMyVideos;
function addSubscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const { email, videoId } = req.body;
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const videoIdString = String(videoId);
            const index = (_a = user.features) === null || _a === void 0 ? void 0 : _a.subscriptions.indexOf(videoIdString);
            if (index !== -1 && ((_b = user.features) === null || _b === void 0 ? void 0 : _b.subscriptions)) {
                yield user_1.UserModel.updateOne({ email: email }, { $pull: { 'features.subscriptions': videoIdString } });
                res.status(200).json({ message: 'Video removed from subscriptions' });
            }
            else if ((_c = user.features) === null || _c === void 0 ? void 0 : _c.subscriptions) {
                user.features.subscriptions.push(videoIdString);
                yield user.save();
                res.status(200).json({ message: 'Video added to subscriptions' });
            }
            else {
                console.error('User features or subscriptions are undefined');
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        catch (error) {
            console.error('Error adding/removing video to/from subscriptions:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
exports.addSubscription = addSubscription;
function addToDislikedVideo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, videoId } = req.body;
        try {
            // Check if the user exists
            const user = yield user_1.UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            // Check if features is defined in the user object
            if (!user.features) {
                user.features = {
                    subscriptions: [],
                    playlists: [],
                    history: [],
                    myVideos: [],
                    watchLater: [],
                    likedVideos: [],
                    disLikedVideo: [],
                    comments: [],
                    searchHistory: []
                };
            }
            // Check if the videoId exists in the likedVideos array
            const likedVideoIndex = user.features.likedVideos.indexOf(videoId);
            // If the videoId exists in likedVideos array, decrease the count of likedVideos
            // before adding it to disLikedVideo
            if (likedVideoIndex !== -1) {
                user.features.likedVideos.splice(likedVideoIndex, 1);
                // Decrease the videoLikeCount by 1 in the video document
                yield video_1.VideoModel.updateOne({ "courses.videos.videoID": videoId }, { $inc: { "courses.$[].videos.$[video].videoLikeCount": -1 } }, { arrayFilters: [{ "video.videoID": videoId }] });
            }
            // Add the videoId to disLikedVideo array
            user.features.disLikedVideo.push(videoId);
            // Save the updated user document
            yield user.save();
            // Increase the videoDislikeCount by 1 in the video document
            yield video_1.VideoModel.updateOne({ "courses.videos.videoID": videoId }, { $inc: { "courses.$[].videos.$[video].videoDislikeCount": 1 } }, { arrayFilters: [{ "video.videoID": videoId }] });
            return res.status(200).json({ message: "Video disliked successfully" });
        }
        catch (error) {
            console.error("Error adding disliked video:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.addToDislikedVideo = addToDislikedVideo;
function calculateWatchTime(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, watchTime } = req.body;
        try {
            const parsedWatchTime = parseFloat(watchTime);
            if (isNaN(parsedWatchTime)) {
                return res.status(400).json({ error: 'Invalid watch time value' });
            }
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.WatchTime = (user.WatchTime || 0) + parsedWatchTime;
            yield user.save();
            res.status(200).json({ message: 'Watch time updated successfully' });
        }
        catch (error) {
            console.error("Error calculating watch time:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.calculateWatchTime = calculateWatchTime;
function markAsRead(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, notificationId } = req.body;
        console.log(notificationId, email);
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const notificationIndex = user.notification.findIndex((notification) => notification.notificationId === notificationId);
            if (notificationIndex === -1) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            user.notification[notificationIndex].isRead = true;
            yield user.save();
            return res.status(200).json({ message: 'Notification marked as read' });
        }
        catch (error) {
            console.error("Error marking notification as read:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.markAsRead = markAsRead;
function clearNotification(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, notificationId } = req.body;
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.notification = user.notification.filter(notification => notification.notificationId !== notificationId);
            yield user.save();
            return res.status(200).json({ message: 'Notification cleared successfully' });
        }
        catch (error) {
            console.error("Error clearing notification:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.clearNotification = clearNotification;
function clearAllNotifiacation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.notification = [];
            yield user.save();
            return res.status(200).json({ message: 'Notification cleared successfully' });
        }
        catch (error) {
            console.error("Error clearing notification:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.clearAllNotifiacation = clearAllNotifiacation;
function dynamicChanges(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, channelName, RecoveryEmail, channelDescription, any, Facebook, Instagram, Twitter, Github, LinkedIn, Discord } = req.body;
        const modify = req.params.modify;
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (modify === 'channelName') {
                user.channelName = channelName;
            }
            else if (modify === 'RecoveryEmail') {
                user.recoveryEmail = RecoveryEmail;
            }
            else if (modify === 'channelDescription') {
                user.channelDescription = channelDescription;
            }
            else if (modify === "Facebook") {
                user.website.Facebook = Facebook;
            }
            else if (modify === "LinkedIn") {
                user.website.LinkedIn = LinkedIn;
            }
            else if (modify === "Github") {
                user.website.Github = Github;
            }
            else if (modify === "any") {
                user.website.any = any;
            }
            else if (modify === "Discord") {
                user.website.Discord = Discord;
            }
            else if (modify === "Instagram") {
                user.website.Instagram = Instagram;
            }
            else if (modify === "Twitter") {
                user.website.Twitter = Twitter;
            }
            yield user.save();
            return res.status(200).json({ message: 'Changed sucessfully' });
        }
        catch (error) {
            console.error("Error modify :", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.dynamicChanges = dynamicChanges;
function makepayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { course, customerDetails } = req.body;
        try {
            // Define line items for the Checkout session
            const lineItems = {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: 'Student'
                    },
                    unit_amount: 1000000, // Amount in smallest currency unit (here 10000 INR)
                },
                quantity: 1,
            };
            // Create the Checkout session with payment method types, line items, and other parameters
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [lineItems],
                mode: "payment",
                success_url: "http://localhost:3000/success",
                cancel_url: "http://localhost:3000/cancel",
            });
            res.send({ id: session.id });
            console.log(session.id);
        }
        catch (error) {
            console.error('Error creating Checkout session:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}
exports.makepayment = makepayment;
