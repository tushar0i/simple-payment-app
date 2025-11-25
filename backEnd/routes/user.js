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
const { userChanges } = require('../validators/userChanges')
const { authMiddleware } = require('../middlewares/authMiddleware')


userRouter.post('/signup', userSchemaValid, async (req, res) => {

    const { email, password, lastName, firstName } = req.body;
    // checking if user already exist or not 
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
        res.status(409).json({//while searching for the correct status code to return I found 418 I am a teapot
            message: "User already exist's try to sign in"
        });
    } else {

        try {

            const hashedPassword = await bcrypt.hash(password, saltRound);
            const user = new userModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            });
            user.save();
            const token = jwt.sign({
                id: user._id
            }, jwtPass)
            res.status(200).json({
                message: "User created successfully",
                userId: token
            });

        } catch (error) {
            res.status(500).json({
                message: "Error occured while hashing password"
            });
        }

    }
});

userRouter.post('/signin', mailValid, passwordValid, async (req, res) => {

    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email: email })
    if (userExist) {
        bcrypt.compare(password, userExist.password, function (err, result) {
            if (result) {
                const token = jwt.sign({
                    id: userExist._id
                }, jwtPass)
                res.status(200).json({
                    message: "Successfully Logged In ",
                    userId: token
                });
            }
            else {
                res.json({
                    message: "Incorrect password"
                })
            }
        })
    }
    else {
        res.json({
            message: "User doesn't exist"
        })
    }


});

userRouter.put('/changePassword', authMiddleware, userChanges, async (req, res) => {

    const updateData = {}
    if (req.body.firstName) updateData.firstName = req.body.firstName;
    if (req.body.lastName) updateData.lastName = req.body.lastName;
    if (req.body.password) {
        try{
            const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
            updateData.password = hashedPassword
        }
        catch(error){
            res.status(500).json({
                message: "Error occured while hashing password"
            });
        }
    }
    await userModel.findByIdAndUpdate(
        req.userId,
        { $set: updateData },
        { new: true }
    );
    res.json({
        message: 'Changes made successfully'
    })
})
module.exports = userRouter;