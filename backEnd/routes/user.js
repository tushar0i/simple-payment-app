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
const { User, Account } = require('../config/db');
const { userChanges } = require('../validators/userChanges')
const { authMiddleware } = require('../middlewares/authMiddleware');


userRouter.post('/signup', userSchemaValid, async (req, res) => {

    const { email, password, lastName, firstName } = req.body;
    // checking if user already exist or not 
    const userExist = await User.findOne({ email: email });
    if (userExist) {
        res.status(409).json({//while searching for the correct status code to return I found 418 I am a teapot
            message: "User already exist's try to sign in"
        });
    } else {

        try {

            const hashedPassword = await bcrypt.hash(password, saltRound);
            const user = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            });

            const userId = user._id;
            
            await Account.create({
                userId:userId,
                balance: 1000 + Math.floor(Math.random()*20000)
            })

            const token = jwt.sign({
                id: user._id
            }, jwtPass)
            res.status(200).json({
                message: "User created successfully",
                token: token
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
    const userExist = await User.findOne({ email: email })
    if (userExist) {
        bcrypt.compare(password, userExist.password, function (err, result) {
            if (result) {
                const token = jwt.sign({
                    id: userExist._id
                }, jwtPass)
                res.status(200).json({
                    message: "Successfully Logged In ",
                    token: token
                });
            }
            else {
                res.status(409).json({
                    message: "Incorrect password"
                })
            }
        })
    }
    else {
        res.status(409).json({
            message: "User doesn't exist"
        })
    }


});

userRouter.put('/changePassword', authMiddleware, userChanges, async (req, res) => {

    const updateData = {}
    if (req.body.firstName) updateData.firstName = req.body.firstName;
    if (req.body.lastName) updateData.lastName = req.body.lastName;
    if (req.body.password) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
            updateData.password = hashedPassword
        }
        catch (error) {
            res.status(500).json({
                message: "Error occured while hashing password"
            });
        }
    }
    await User.findByIdAndUpdate(
        req.userId,
        { $set: updateData },
        { new: true }
    );
    res.json({
        message: 'Changes made successfully'
    })
})

userRouter.get('/bulk', async (req, res) => {
    const search = req.query.filter || "".trim();
    // if (!search) {
    //     res.json({
    //         message: "query parameter filter is required"
    //     })
    // }

    const users = await User.find(
        {
            $or: [{
                firstName: {
                    $regex: search, $options: "i"
                }
            }, {
                lastName: {
                    $regex: search, $options: "i"
                }
            }]
        }
    )
    res.json({
        user: users.map(user => ({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})

module.exports = userRouter;