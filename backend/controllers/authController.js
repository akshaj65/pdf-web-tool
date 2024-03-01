
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/custom-error.js";
import User from "../models/userModel.js";
import { attachCookiesToResponse } from "../utils/jwtToken.js";

export const register = expressAsyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
        return next(new CustomError.BadRequestError("Please Enter Email & Password"));
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        return next(new CustomError.BadRequestError("Email Already Exists!"));
    }

    const user = await User.create({
        name: name || 'user',
        email,
        password
    });


    attachCookiesToResponse(user, res);

    res.status(StatusCodes.CREATED).json({
        success: true,
        user: {
            _id: user?._id,
            name: user?.name,
            email: user?.email
        },
    });
});

export const login = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //checking if user has given password and email both
    if (!email || !password) {
        return next(new CustomError.BadRequestError("Please Enter Email & Password"));
    }
    //as we know we had made select false for password so we should externally select that password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new CustomError.UnauthenticatedError("Invalid Email or Password"));
    }
    const isPasswordMatched = await user.comparePassword(password);
    // console.log(isPasswordMatched)
    if (!isPasswordMatched) {
        return next(new CustomError.UnauthenticatedError("Invalid Email or Password"));
    }

    attachCookiesToResponse(user, res);

    res.status(StatusCodes.OK).json({
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
    });
});

export const logout = expressAsyncHandler( async ( req,res,next)=>{
    const options = {
        expires:new Date(Date.now()),
        httpOnly:true
    };

    res.cookie('token',null,options).json({
        success:true,
        message:"Logged Out"
    })
});

export const loadMe = expressAsyncHandler(async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'User not found'
            });
            return;
        }
    
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'User Found',
            user,
        });
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:error.message || "Server error",
        });
    }
  
});
