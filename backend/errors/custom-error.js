import BadRequestError from "./bad-request.js"
import NotFoundError from "./not-found.js"
import UnauthenticatedError from "./unauthenticated.js"
import CustomAPIError from "./custom-api.js"
import InternalServerError from "./server-error.js";

class CustomError {
    static BadRequestError = BadRequestError;
    static NotFoundError = NotFoundError;
    static UnauthenticatedError = UnauthenticatedError;
    static CustomAPIError = CustomAPIError;
    static InternalServerError = InternalServerError;
}

export default CustomError;