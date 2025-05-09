import { getDetailsFromEmail, getDetailsFromToken, UpdateProfile, updateUser } from "../controller/UserController.js";
import express from 'express';
const userRouter = express.Router();

userRouter.get('/get-user',getDetailsFromToken);
userRouter.get('/get-user-from-email',getDetailsFromEmail);
userRouter.put('/update-user', updateUser);

export default userRouter;