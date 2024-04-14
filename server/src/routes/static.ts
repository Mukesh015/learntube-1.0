import express from 'express';
import {register} from '../controllers/user';

const UserRouter = express.Router();

UserRouter.post('/register', register);


export default UserRouter;