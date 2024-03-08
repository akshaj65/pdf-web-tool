
import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";
import CustomError from "../errors/custom-error.js";
import { handleErrors } from './error-handler.js';

const  isAuthenticatedUser = handleErrors(async (req, res, next) => {
    const { token } = req?.cookies;

    if (!token) {
        return next(new CustomError.UnauthenticatedError("Please login to use this resource"));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id);
    if (!req.user) {
        return next(new CustomError.UnauthenticatedError("User Not Found"));

    }
    next();
});

export default isAuthenticatedUser;