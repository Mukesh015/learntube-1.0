import express from 'express';
import { register, createChannel, getUserDetails, generateOtp, userValidation, subscribe,courseEnrollment,isEnrolled } from '../controllers/user';
import multer from 'multer';
const UserRouter = express.Router();

const storage = multer.diskStorage({
    destination: './build/uploads/',
});

const upload = multer({ storage });

UserRouter.post('/register', upload.single("avatar"), register);
UserRouter.post('/createchannel', upload.array('image', 2), createChannel);
UserRouter.post('/getuserdetails', getUserDetails);
UserRouter.post("/generateotp", generateOtp)
UserRouter.post("/validation", userValidation)
UserRouter.post("/subscribe", subscribe)
UserRouter.post("/enroll", courseEnrollment)
UserRouter.post("/isenroll", isEnrolled)



export default UserRouter;