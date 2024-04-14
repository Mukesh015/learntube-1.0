import express from 'express';
import Register  from '../controllers/user';
const UserRouter = express.Router();
UserRouter.post('/register', Register);
export default UserRouter;