const express = require("express");
const testRouter = express.Router();
const limiter = require('../middlewares/rateLimit')

testRouter.post('/', limiter(2,3), (req,res)=>{
    return res.json({
        message : "testing route"
    })
})

module.exports = testRouter;