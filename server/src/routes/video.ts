import express from 'express';
import { uploadVideo} from '../controllers/video';
import multer from 'multer';
const VideoRouter = express.Router();

const storage = multer.diskStorage({
    destination: './build/uploads/',
});

const upload = multer({ storage });


VideoRouter.post('/uploadvideo', upload.array('video',3), uploadVideo);



export default VideoRouter;