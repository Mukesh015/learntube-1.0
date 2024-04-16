import express from 'express';
import { register ,createChannel,getUserDetails} from '../controllers/user';
import multer from 'multer';
const UserRouter = express.Router();

const storage = multer.diskStorage({
    destination: './build/uploads/',
});

const upload = multer({ storage });

UserRouter.post('/register', upload.single("avatar"), register);
UserRouter.post('/createchannel', upload.array('image',2), createChannel);
UserRouter.post('/getuserdetails',  getUserDetails);


export default UserRouter;