import express from "express";
import { loadMe, login, logout, register } from "../controllers/authController.js";
import isAuthenticatedUser from "../middlewares/authentication.js";

const authRouter = express.Router();

/**
 * POST  /api/v1/auth/register - create user and sends a session cookie to authenticate the user.
 */
authRouter.post('/register', register);

/**
 * POST  /api/v1/auth/login - authenticate user by their credentials and sends a session cookie to authenticate the user.
 */
authRouter.post('/login', login);

/**
 * GET  /api/v1/auth/logout - Clear the session cookie to log out the user.
 */
authRouter.get('/logout', logout);


//authenticated access

/**
 * GET  /api/v1/auth/me -authenticate user by their user ID
 */
authRouter.get('/me', isAuthenticatedUser, loadMe);

export default authRouter;