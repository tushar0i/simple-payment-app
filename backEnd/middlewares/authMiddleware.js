const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const jwtPass = env.parsed.JWT_USER_PASSWORD;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // console.log("")
        return res.json({
            message: "unauthorized"
        })

    }
    const token = authHeader.split(' ')[1];
    try {
        const decode = jwt.verify(token, jwtPass);
        console.log(decode)
        if (decode.id) {
            req.id = decode.id;
            next();
        } else {
            return res.json({
                message: "user not found"
            })
        }

    } catch (err) {
        console.error(err)
        return res.json({
            message: "wrong token/key"
        })
    }
};

module.exports = {
    authMiddleware
};
