const express = require('express')
const userRouter = express.Router()
const { userSchemaValid } = require('../validators/userSchemaValid');


userRouter.post('/signup',userSchemaValid, (req,res) => {
    
    const {email, password, lastName, firsrName} = req.body;
    res.json({
        message : 'thing are  good'
    })
    
});


module.exports = userRouter;