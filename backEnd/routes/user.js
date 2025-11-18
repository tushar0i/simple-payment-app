const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const jwtPass = dotenv.parsed.JWT_USER_PASSWORD;
const saltRound = Number(dotenv.parsed.BCRYPT_SALT_ROUNDS);
const { mailValid } = require('../validators/mailValid');
const { passwordValid } = require('../validators/passwordValid');
const { userSchemaValid } = require('../validators/userSchemaValid');
const { userModel } = require('../config/db');


userRouter.post('/signup',userSchemaValid, async (req, res) => {

    const { email, password, lastName, firstName } = req.body;
    // checking if user already exist or not 
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
        res.status(409).json({//while searching for the correct status code to return I found 418 I am a teapot
            message: "User already exist's try to sign in"
        });
    } else {

    try{

        const hashedPassword = await bcrypt.hash(password,saltRound);
        const user = new userModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        });
        user.save();
        res.status(200).json({
            message:"User created successfully"
        });

    } catch(error) {
        res.status(500).json({
            message: "Error occured while hashing password"
        });
    }
        
    }
});

userRouter.post('/signin', (req, res) => {

    const { email, password } = req.body;
    res.json({
        message: 'thing are  good'
    })

});

userRouter.post('/changerPassword',(req, res) => {
    const { oldPassword, newPassword } = req.body;
    res.json({
        message: 'thing are  good'
    })
})
module.exports = userRouter;