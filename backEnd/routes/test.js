const express = require("express");
const testRouter = express.Router();
const limiter = require('../middlewares/rateLimit')

testRouter.post('/', limiter(2,3), (req,res)=>{
    return res.json({
        message : "everything is up and running well"
    })
})

module.exports = testRouter;
