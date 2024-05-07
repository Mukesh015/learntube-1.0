"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const video_1 = require("../controllers/video");
const VideoRouter = express_1.default.Router();
VideoRouter.post('/uploadvideo', video_1.uploadVideo);
VideoRouter.post('/getvideodetails', video_1.getVideoDetails);
VideoRouter.get('/redirect/:videoID/:email', video_1.redirect);
VideoRouter.post('/addcomment', video_1.addComment);
exports.default = VideoRouter;
