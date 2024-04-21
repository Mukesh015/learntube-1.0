import express from 'express';
import { uploadVideo, getVideoDetails } from '../controllers/video';
const VideoRouter = express.Router();

VideoRouter.post('/uploadvideo', uploadVideo);

VideoRouter.post('/getvideodetails', getVideoDetails);


export default VideoRouter;