const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const jwtPass = env.parsed.JWT_USER_PASSWORD;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decode = jwt.verify(token, jwtPass);
        if (decode.id) {
            req.userId = decode.id;
            next();
        } else {
            return res.status(404).json({
                message: "user not found"
            })
        }
    } catch (err) {
        // console.error(err)
        return res.status(401).json({
            message: "wrong token/key"
        })
    }
};

module.exports = {
    authMiddleware
};
