import express from "express";
import { loadMe, login, logout, register } from "../controllers/authController.js";
import isAuthenticatedUser from "../middlewares/authentication.js";

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/logout', logout);

//authenticated access
authRouter.get('/me', isAuthenticatedUser,loadMe);

export default authRouter;