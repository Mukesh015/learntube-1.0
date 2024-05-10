"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const multer_1 = __importDefault(require("multer"));
const UserRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: './build/uploads/',
});
const upload = (0, multer_1.default)({ storage });
UserRouter.post('/register', upload.single("avatar"), user_1.register);
UserRouter.post('/createchannel', upload.array('image', 2), user_1.createChannel);
UserRouter.post('/getuserdetails', user_1.getUserDetails);
UserRouter.post("/generateotp", user_1.generateOtp);
UserRouter.post("/validation", user_1.userValidation);
UserRouter.post("/subscribe", user_1.subscribe);
UserRouter.post("/enroll", user_1.courseEnrollment);
UserRouter.post("/isenroll", user_1.isEnrolled);
exports.default = UserRouter;
