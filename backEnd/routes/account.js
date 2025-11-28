const express = require('express');
const accountRouter = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware')
const { Account } = require('../config/db');
const { default: mongoose } = require('mongoose');
const { transferValid } = require('../validators/transferValid');

accountRouter.get('/balance', authMiddleware , async (req ,res) => {
    const account = await Account.findOne({userId:req.userId})
    res.json({
        balance : account.balance
    })
});

accountRouter.post('/transfer', authMiddleware, transferValid, async (req,res)=>{
    // transaction are a crucial step ,if the data base goes down we should be able to revert the changes this is why we are using Transaction 

    const session = await mongoose.startSession();

    // starting a transaction
    session.startTransaction();

    const { amount , to } = req.body;

    const fromAccount = await Account.findOne({userId:req.userId}).session(session);

    if(!fromAccount || fromAccount.balance<amount){ // checking  account balance
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    };

    const toAccount = await Account.findOne({userId:to}).session(session);

    if(!toAccount){ // checking if account exist
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        });
    };

    await Account.updateOne( { userId:req.userId } , { $inc: { balance:-amount} } ).session(session); // debit
    await Account.updateOne( { userId:to } , { $inc: { balance:amount} } ).session(session); // credit

    // commiting transaction
    await session.commitTransaction();
    res.status(200).json({
        message: "Transferred successfully"
    });

});

module.exports = accountRouter;