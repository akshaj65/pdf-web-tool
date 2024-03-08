import CustomError from "../errors/custom-error.js";
import { handleErrors } from "../middlewares/error-handler.js";
import User from "../models/userModel.js";

export const getUser = async (userId) => {
    const user = await User.findById(userId).populate();
    if (!user) {
        throw new CustomError.NotFoundError("User Not found");
    }
    return user;
};


export const checkUserHasPdfId = async (user, pdfId) => {
    const hasPdfId = await user?.pdfs?.some(pdf => pdf?.pdfId === pdfId);
    if (!user.pdfs || !hasPdfId) {
        throw new CustomError.UnauthenticatedError("You do not have access to this PDF");
    }
};

