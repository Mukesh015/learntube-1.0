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
exports.resolvers = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
const video_1 = require("../../models/video");
const user_1 = require("../../models/user");
const queries = {
    getIsCreator: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email }) {
        try {
            const response = yield axios_1.default.post(`${process.env.server_domain}/api/getuserdetails`);
            const userDetails = response.data.find((detail) => detail.email === email);
            if (!userDetails) {
                return ("User not found");
            }
            return [{ isCreator: userDetails.isCreator }];
        }
        catch (error) {
            console.error('Error fetching isCreator:', error);
            throw new Error('Error fetching isCreator');
        }
    }),
    getChannelLogo: (undefined, p0) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(`${process.env.server_domain}/api/getuserdetails`);
            const userDetails = response.data;
            const creators = userDetails.filter(user => user.isCreator);
            return creators.map(creator => ({
                channelLogo: creator.channelLogo, email: creator.email, channelName: creator.channelName,
                channelId: creator.channelId
            }));
        }
        catch (error) {
            console.error('Error fetching channellogo:', error);
            throw new Error('Error fetching channellogo');
        }
    }),
    getCourseName: (_2, _b) => __awaiter(void 0, [_2, _b], void 0, function* (_, { email }) {
        try {
            const response = yield axios_1.default.post(`${process.env.server_domain}/video/getvideodetails`);
            const userDetails = response.data.videoDetails.find((detail) => detail.email === email);
            if (!userDetails) {
                return ('User details not found');
            }
            const courseNames = userDetails.courses.map((course) => course.courseName);
            return courseNames.map(courseName => ({ courseNames: courseName }));
        }
        catch (error) {
            console.error('Error fetching course names:', error);
            throw new Error('Error fetching course names');
        }
    }),
    getAllVideoUrl: () => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        try {
            const videoDetailsResponse = yield axios_1.default.post(`${process.env.server_domain}/video/getvideodetails`);
            const allVideoThumbUrls = [];
            for (const video of videoDetailsResponse.data.videoDetails) {
                for (const course of video.courses) {
                    for (const Video of course.videos) {
                        const channelLogoResponse = yield queries.getChannelLogo(undefined, { email: video.email });
                        const channelLogo = (_c = channelLogoResponse.find((logo) => logo.email === video.email)) === null || _c === void 0 ? void 0 : _c.channelLogo;
                        const channelName = (_d = channelLogoResponse.find((logo) => logo.email === video.email)) === null || _d === void 0 ? void 0 : _d.channelName;
                        const courseFees = course.courseFess.price === null ? null : course.courseFess.price;
                        const courseId = course.courseId;
                        allVideoThumbUrls.push({
                            email: video.email,
                            videoUrl: Video.videoUrl,
                            thumbnail: Video.videoThumbnail,
                            videoTitle: Video.videoTitle,
                            uploadAt: Video.videoPublishedAt,
                            videoId: Video.videoID,
                            videoViews: Video.videoViewCount,
                            channelLogo: channelLogo,
                            channelName: channelName,
                            courseFees: courseFees,
                            courseId: courseId
                        });
                    }
                }
            }
            return allVideoThumbUrls.map(videothumb => ({
                allVideoUrls: videothumb.videoUrl,
                allThumbnailUrls: videothumb.thumbnail,
                allVideoTitles: videothumb.videoTitle,
                allEmail: videothumb.email,
                uploadAt: videothumb.uploadAt,
                videoId: videothumb.videoId,
                views: videothumb.videoViews,
                channelLogo: videothumb.channelLogo,
                channelName: videothumb.channelName,
                courseFees: videothumb.courseFees,
                courseId: videothumb.courseId
            }));
        }
        catch (error) {
            console.error('Error fetching video URLs:', error);
            throw new Error('Error fetching video URLs');
        }
    }),
    getVideoUrl: (_3, _e) => __awaiter(void 0, [_3, _e], void 0, function* (_, { email, videoID }) {
        var _f, _g, _h, _j;
        try {
            const entry = yield video_1.VideoModel.findOneAndUpdate({ "courses.videos.videoID": videoID }, {
                $push: {
                    "courses.$[course].videos.$[video].videoViews": {
                        user: email,
                        timestamp: Date.now(),
                    }
                },
            }, {
                arrayFilters: [{ "course.videos.videoID": videoID }, { "video.videoID": videoID }],
                new: true,
            });
            if (!entry) {
                throw new Error("URL not found");
            }
            const video = entry.courses.flatMap(course => course.videos).find(video => video.videoID === videoID);
            const channelLogoResponse = yield queries.getChannelLogo(undefined, { email: entry.email });
            const channelLogo = (_f = channelLogoResponse.find((logo) => logo.email === entry.email)) === null || _f === void 0 ? void 0 : _f.channelLogo;
            const channelName = (_g = channelLogoResponse.find((name) => name.email === entry.email)) === null || _g === void 0 ? void 0 : _g.channelName;
            const creatorEmail = (_h = channelLogoResponse.find((name) => name.email === entry.email)) === null || _h === void 0 ? void 0 : _h.email;
            const channelId = (_j = channelLogoResponse.find((name) => name.email === entry.email)) === null || _j === void 0 ? void 0 : _j.channelId;
            if (!video) {
                throw new Error("videoID not found");
            }
            if (!video.videoUrl) {
                throw new Error("videoUrl not found");
            }
            return [{
                    videoURl: video.videoUrl, videoDescription: video.videoDescription, videoTitle: video.videoTitle,
                    videoViews: video.videoViews.length, videoPublishedAt: video.videoPublishedAt, videoTags: video.videoTags,
                    channelLogo: channelLogo, channelName: channelName, creatorEmail: creatorEmail, channelId: channelId,
                }];
        }
        catch (error) {
            console.error("Error redirecting:", error);
            throw new Error("Internal Server Error");
        }
    }),
    getSearchBarDetails: (_4, _k) => __awaiter(void 0, [_4, _k], void 0, function* (_, { email }) {
        try {
            const response = yield axios_1.default.post(`${process.env.server_domain}/video/getvideodetails`);
            const videos = response.data.videoDetails;
            const courses = videos.flatMap((video) => video.courses);
            const videoDetails = courses.flatMap((course) => course.videos).map((video) => ({
                videoTitle: video.videoTitle,
                videoDescription: video.videoDescription,
                videoTags: video.videoTags
            }));
            const users = yield user_1.UserModel.find({ email });
            if (users) {
                const searchHistory = users.map(user => { var _a; return (_a = user.features) === null || _a === void 0 ? void 0 : _a.searchHistory; }).filter(history => history);
                const flattenedSearchHistory = searchHistory.flat();
                return videoDetails.map((videoDetail) => (Object.assign(Object.assign({}, videoDetail), { searchHistory: flattenedSearchHistory })));
            }
            return videoDetails.map((videoDetail) => (Object.assign(Object.assign({}, videoDetail), { searchHistory: [] })));
        }
        catch (error) {
            console.error('Error fetching search bar details:', error);
            throw new Error('Error fetching search bar details');
        }
    }),
    getSearchQueryDetails: (_5, _l) => __awaiter(void 0, [_5, _l], void 0, function* (_, { query }) {
        try {
            const videos = yield video_1.VideoModel.find({
                $or: [
                    { 'courses.videos.videoTitle': { $regex: new RegExp(query, 'i') } },
                    { 'courses.videos.videoDescription': { $regex: new RegExp(query, 'i') } },
                    { 'courses.videos.videoTags': { $in: [query] } }
                ]
            });
            const channelLogoResponse = yield queries.getChannelLogo(undefined, { email: videos.map(item => item.email) });
            const searchResults = videos.flatMap(Video => Video.courses.flatMap(course => course.videos.map(video => {
                var _a, _b;
                return ({
                    courseID: course.courseId,
                    courseFees: course.courseFees.price,
                    videoUrl: video.videoUrl,
                    videoID: video.videoID,
                    videoDescription: video.videoDescription,
                    videoTags: video.videoTags,
                    videoTitle: video.videoTitle,
                    channelName: (_a = channelLogoResponse.find((name) => name.email === Video.email)) === null || _a === void 0 ? void 0 : _a.channelName,
                    channelLogo: (_b = channelLogoResponse.find((name) => name.email === Video.email)) === null || _b === void 0 ? void 0 : _b.channelLogo,
                    email: Video.email,
                    videoPublishedAt: video.videoPublishedAt,
                    videoThumbnail: video.videoThumbnail,
                    videoViews: video.videoViews.length,
                });
            })));
            const sortedResults = searchResults.sort((a, b) => {
                if (a.videoTitle.toLowerCase().includes(query.toLowerCase()))
                    return -1;
                if (b.videoTitle.toLowerCase().includes(query.toLowerCase()))
                    return 1;
                if (a.videoTags.includes(query))
                    return -1;
                if (b.videoTags.includes(query))
                    return 1;
                return 0;
            });
            return sortedResults;
        }
        catch (error) {
            console.error('Error fetching search query details:', error);
            throw new Error('Error fetching search query details');
        }
    })
};
exports.resolvers = { queries };
