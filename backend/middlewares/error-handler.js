import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        err.message = err.message || "Internal Server Error";

    // mongodb id error  (cast error)
    if (err.name === "CastError") {
        err.message = `Resource not found, Invalid ${err.path}`;
        err.statusCode = StatusCodes.NOT_FOUND;
    }

    //mongoose duplicate key error
    if (err.code === 11000) {
        err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        // console.log(Object.keys(err.keyValue)[0] );
        if (Object.keys(err.keyValue)[0] === 'email') {
            err.message = 'Email Already Exists';
        }
        err.statusCode = StatusCodes.BAD_REQUEST;
    }

    //wrong JWT error
    if (err.name === "JsonWebTokenError") {
        err.message = `Json Web Token Invalid ,try again`;
        err.statusCode = StatusCodes.BAD_REQUEST;
    }

    //JWT Expire Error
    if (err.name === "JsonExpiredError") {
        err.message = `Json Web Token is Expired ,try again`;
        err.statusCode = StatusCodes.BAD_REQUEST;
    }
    console.log(err);

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        // error: err.stack

    })
}

export default errorHandlerMiddleware;