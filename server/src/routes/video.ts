import express from 'express';
import { uploadVideo, getVideoDetails,redirect,addComment } from '../controllers/video';
const VideoRouter = express.Router();

VideoRouter.post('/uploadvideo', uploadVideo);

VideoRouter.post('/getvideodetails', getVideoDetails);
VideoRouter.get('/redirect/:videoID/:email', redirect);
VideoRouter.post('/addcomment', addComment);


export default VideoRouter;