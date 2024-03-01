import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Required Name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Required Email'],
        validate: {
            validator: validator.isEmail,
            message: 'Enter Valid Email'
        },
    },
    password: {
        type: String,
        required: [true, 'Required password'],
        minlength: 6,
        select: false //when you search in using findone it will not show password with the output 
    },
});

//a pre hook that updates password before saving the document
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

UserSchema.methods.comparePassword = async function (inputedPassword) {
    const isMatch = await bcrypt.compare(inputedPassword, this.password);
    return isMatch;
}

const User = new mongoose.model('user',UserSchema);
export default User;