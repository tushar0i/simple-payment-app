const express = require('express');
const accountRouter = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware')
const { Account } = require('../config/db')

accountRouter.get('/balance', authMiddleware , async (req ,res) => {
    const account = await Account.findOne({userId:req.userId})
    res.json({
        balance : account.balance
    })
});

module.exports = accountRouter;