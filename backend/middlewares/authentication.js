
import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import CustomError from "../errors/custom-error.js";

const isAuthenticatedUser = expressAsyncHandler(async (req, res, next) => {
    const { token } = req?.cookies;

    if (!token) {
        return next(new CustomError.UnauthenticatedError("Please login to use this resource"));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id);
    next();
})

export default isAuthenticatedUser;