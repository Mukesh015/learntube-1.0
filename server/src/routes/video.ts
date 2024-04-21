import express from 'express';
import { uploadVideo, getVideoDetails,redirect } from '../controllers/video';
const VideoRouter = express.Router();

VideoRouter.post('/uploadvideo', uploadVideo);

VideoRouter.post('/getvideodetails', getVideoDetails);
VideoRouter.post('/redirect/:videoID', redirect);


export default VideoRouter;